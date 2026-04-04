#!/bin/bash
# Security hardening script for Hetzner server
# Run this script on your server to implement security measures

set -e

echo "=== Security Hardening Script ==="

# 1. Update system packages
echo "Updating system packages..."
apt-get update
apt-get upgrade -y

# 2. Configure firewall
echo "Configuring firewall..."
ufw --force enable
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw allow 3000/tcp
# Explicitly deny DNS ports externally
ufw deny 53/udp
ufw deny 53/tcp
ufw status verbose

# 3. Configure DNS resolver with rate limiting
echo "Configuring DNS resolver..."
cat > /etc/systemd/resolved.conf << EOF
[Resolve]
DNS=8.8.8.8 8.8.4.4
FallbackDNS=1.1.1.1 1.0.0.1
Cache=yes
DNSStubListener=yes
DNSSEC=allow-downgrade
ReadEtcHosts=yes
EOF

systemctl restart systemd-resolved

# 4. Install and configure fail2ban
echo "Installing fail2ban..."
apt-get install -y fail2ban

cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5
destemail = root@localhost
sendername = Fail2Ban
action = %(action_)s

[sshd]
enabled = true
port = ssh
logpath = %(sshd_log)s
backend = %(sshd_backend)s
maxretry = 3
bantime = 7200
EOF

systemctl enable fail2ban
systemctl restart fail2ban

# 5. Harden SSH configuration
echo "Hardening SSH configuration..."
if ! grep -q "PasswordAuthentication no" /etc/ssh/sshd_config; then
    sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
    sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
fi

if ! grep -q "PermitRootLogin prohibit-password" /etc/ssh/sshd_config && ! grep -q "PermitRootLogin no" /etc/ssh/sshd_config; then
    sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
fi

systemctl restart sshd

# 6. Install security tools
echo "Installing security tools..."
apt-get install -y rkhunter chkrootkit unattended-upgrades

# Configure automatic security updates
cat > /etc/apt/apt.conf.d/50unattended-upgrades << EOF
Unattended-Upgrade::Allowed-Origins {
    "\${distro_id}:\${distro_codename}-security";
    "\${distro_id}ESMApps:\${distro_codename}-apps-security";
    "\${distro_id}ESM:\${distro_codename}-infra-security";
};
Unattended-Upgrade::AutoFixInterruptedDpkg "true";
Unattended-Upgrade::MinimalSteps "true";
Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "false";
EOF

# 7. Set up log monitoring for DNS queries
echo "Setting up DNS query monitoring..."
cat > /usr/local/bin/monitor-dns.sh << 'EOF'
#!/bin/bash
# Monitor DNS queries and alert on suspicious activity
LOG_FILE="/var/log/dns-monitor.log"
THRESHOLD=100  # queries per minute

while true; do
    COUNT=$(tcpdump -i any -c 1000 port 53 2>/dev/null | wc -l)
    if [ "$COUNT" -gt "$THRESHOLD" ]; then
        echo "$(date): WARNING - High DNS query rate detected: $COUNT queries" >> "$LOG_FILE"
        # You can add email notification here
    fi
    sleep 60
done
EOF

chmod +x /usr/local/bin/monitor-dns.sh

# 8. Create systemd service for DNS monitoring (optional)
cat > /etc/systemd/system/dns-monitor.service << EOF
[Unit]
Description=DNS Query Monitor
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/monitor-dns.sh
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# 9. Review Docker security
echo "Reviewing Docker configuration..."
if command -v docker &> /dev/null; then
    # Ensure Docker daemon is configured securely
    if [ ! -f /etc/docker/daemon.json ]; then
        mkdir -p /etc/docker
        cat > /etc/docker/daemon.json << 'DOCKEREOF'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "dns": ["8.8.8.8", "8.8.4.4"],
  "dns-opts": ["timeout:2", "attempts:2"]
}
DOCKEREOF
        systemctl restart docker
    fi
fi

# 10. Set up log rotation
echo "Configuring log rotation..."
cat > /etc/logrotate.d/dns-monitor << EOF
/var/log/dns-monitor.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
}
EOF

echo "=== Security Hardening Complete ==="
echo "Please review the changes and restart services if needed."
echo "Run 'sudo rkhunter --check' and 'sudo chkrootkit' to scan for malware."


