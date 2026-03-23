# Carl Granit Oy - Server Configuration

This directory contains all the configuration files needed to deploy and manage your Next.js application on the Hetzner Cloud server.

## Server Details

-   **Server IP**: 188.245.240.43
-   **Server Type**: cx23 (2 vCPUs, 4GB RAM, 40GB SSD)
-   **Location**: Nuremberg, Germany
-   **OS**: Ubuntu 22.04 LTS

## Files Overview

### Core Configuration Files

-   `main.tf` - Terraform configuration for server provisioning
-   `variables.tf` - Variable definitions
-   `outputs.tf` - Output definitions
-   `terraform.tfvars` - Variable values (contains sensitive data)

### Application Configuration

-   `nginx-config.conf` - Nginx reverse proxy configuration
-   `carl-granit-oy.service` - Systemd service configuration
-   `deploy.sh` - Deployment script for updates
-   `setup-ssl.sh` - SSL certificate setup with Let's Encrypt
-   `server-setup.sh` - Complete server environment setup

## Quick Start

### 1. Initial Server Setup

```bash
# SSH into your server
ssh root@188.245.240.43

# Upload all configuration files to the server
scp *.conf *.service *.sh root@188.245.240.43:/root/

# Run the complete setup
chmod +x server-setup.sh
./server-setup.sh
```

### 2. Deploy Your Application

```bash
# Clone your repository (replace with your actual repo)
git clone https://github.com/yourusername/carl-granit-oy.git /var/www/carl-granit-oy

# Run deployment
./deploy.sh
```

### 3. Set Up SSL (Optional)

```bash
# Edit the domain in setup-ssl.sh first
nano setup-ssl.sh

# Run SSL setup
./setup-ssl.sh
```

## Configuration Details

### Nginx Configuration

-   Reverse proxy to Next.js app on port 3000
-   SSL termination with Let's Encrypt
-   Security headers
-   Gzip compression
-   Static file caching
-   Health check endpoint

### Systemd Service

-   Runs as www-data user
-   Auto-restart on failure
-   Security hardening
-   Logging to syslog

### Deployment Script

-   Creates backups before deployment
-   Pulls latest code from git
-   Installs dependencies
-   Builds the application
-   Restarts the service
-   Health checks

### Monitoring

-   Service health monitoring every 5 minutes
-   Disk space monitoring
-   Automatic service restart on failure
-   Daily backups with 7-day retention

## Useful Commands

### Service Management

```bash
# Check service status
systemctl status carl-granit-oy

# View logs
journalctl -u carl-granit-oy -f

# Restart service
systemctl restart carl-granit-oy

# Stop service
systemctl stop carl-granit-oy
```

### Nginx Management

```bash
# Test configuration
nginx -t

# Reload configuration
systemctl reload nginx

# Check nginx status
systemctl status nginx
```

### Application Management

```bash
# Deploy updates
./deploy.sh

# Check application health
curl http://localhost:3000/health

# View application logs
tail -f /var/log/carl-granit-oy/deploy.log
```

### Monitoring

```bash
# Check monitoring logs
tail -f /var/log/carl-granit-oy/monitor.log

# Check backup status
ls -la /var/backups/carl-granit-oy/

# View cron jobs
crontab -l
```

## Security Features

-   Firewall configured (SSH, HTTP, HTTPS)
-   SSL/TLS encryption
-   Security headers
-   Service runs as non-root user
-   Systemd security hardening
-   Regular security updates

## Backup Strategy

-   Daily automated backups at 2 AM
-   7-day retention policy
-   Backups stored in `/var/backups/carl-granit-oy/`
-   Manual backup: `/usr/local/bin/backup-carl-granit-oy.sh`

## Troubleshooting

### Service Won't Start

1. Check logs: `journalctl -u carl-granit-oy -f`
2. Verify Node.js installation: `node --version`
3. Check application directory permissions
4. Verify port 3000 is available

### Nginx Issues

1. Test configuration: `nginx -t`
2. Check nginx logs: `tail -f /var/log/nginx/error.log`
3. Verify site configuration is enabled
4. Check if port 80/443 are available

### SSL Issues

1. Check certificate status: `certbot certificates`
2. Test renewal: `certbot renew --dry-run`
3. Verify domain DNS is pointing to server
4. Check nginx SSL configuration

## Maintenance

### Regular Tasks

-   Monitor disk space: `df -h`
-   Check service status: `systemctl status carl-granit-oy`
-   Review logs: `journalctl -u carl-granit-oy --since "1 day ago"`
-   Update system: `apt update && apt upgrade`

### Updates

-   Deploy application updates: `./deploy.sh`
-   Update server packages: `apt update && apt upgrade`
-   Renew SSL certificates: `certbot renew`

## Support

For issues with this configuration, check:

1. Service logs: `journalctl -u carl-granit-oy -f`
2. Nginx logs: `tail -f /var/log/nginx/error.log`
3. Application logs: `tail -f /var/log/carl-granit-oy/deploy.log`
4. Monitoring logs: `tail -f /var/log/carl-granit-oy/monitor.log`
