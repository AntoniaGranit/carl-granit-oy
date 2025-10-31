# Domain Setup TODO

This checklist covers the steps needed when you're ready to switch from IP-based access to a custom domain with SSL/HTTPS.

## Prerequisites

- [ ] Domain name purchased and DNS access available
- [ ] Server IP address (`${{ secrets.SERVER_IP }}`)
- [ ] SSH access to the server configured

---

## Step 1: DNS Configuration

- [ ] Create an A record pointing your domain to the server IP:
  ```
  Type: A
  Name: @ (or blank for root domain)
  Value: <your-server-ip>
  TTL: 300 (or default)
  ```
- [ ] Create an A record for www subdomain (optional but recommended):
  ```
  Type: A
  Name: www
  Value: <your-server-ip>
  TTL: 300 (or default)
  ```
- [ ] Wait for DNS propagation (can take up to 48 hours, usually < 1 hour)
  - Verify with: `dig your-domain.com` or `nslookup your-domain.com`
  - Verify with: `curl -I http://your-domain.com` (should show your server)

---

## Step 2: Verify Certbot Installation

Certbot should already be installed via Terraform, but verify:

```bash
# SSH into your server
ssh <user>@<server-ip>

# Verify Certbot is installed
certbot --version

# If not installed (shouldn't be needed), run:
# sudo apt-get update
# sudo apt-get install -y certbot python3-certbot-nginx
```

---

## Step 3: Update Nginx Configuration

1. [ ] SSH into your server:
   ```bash
   ssh <user>@<server-ip>
   ```

2. [ ] Edit the nginx configuration:
   ```bash
   sudo nano /etc/nginx/sites-available/carl-granit-oy
   ```

3. [ ] Update `server_name` from `_` to your actual domain:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;  # Replace with actual domain
       ...
   }
   ```

4. [ ] Uncomment the HTTPS redirect (around line 8):
   ```nginx
   # Change from:
   # return 301 https://$server_name$request_uri;
   
   # To:
   return 301 https://$server_name$request_uri;
   ```

5. [ ] Test nginx configuration:
   ```bash
   sudo nginx -t
   ```

6. [ ] If test passes, reload nginx:
   ```bash
   sudo systemctl reload nginx
   ```

---

## Step 4: Obtain SSL Certificates

Run Certbot to automatically obtain and configure SSL certificates:

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Follow the prompts:
- [ ] Enter your email address (for renewal reminders)
- [ ] Agree to Terms of Service
- [ ] Choose whether to redirect HTTP to HTTPS (recommended: Yes)

Certbot will:
- Automatically obtain SSL certificates from Let's Encrypt
- Update your nginx configuration with SSL settings
- Set up automatic renewal

---

## Step 5: Enable HTTPS Block in Nginx Config

1. [ ] Edit the nginx configuration file:
   ```bash
   sudo nano /etc/nginx/sites-available/carl-granit-oy
   ```

2. [ ] Uncomment the HTTPS server block (starts around line 59)
   - Remove all the `#` comments from the HTTPS server block
   - Update `server_name` with your actual domain
   - Verify SSL certificate paths:
     ```
     ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
     ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
     ```

3. [ ] Test nginx configuration:
   ```bash
   sudo nginx -t
   ```

4. [ ] Reload nginx:
   ```bash
   sudo systemctl reload nginx
   ```

---

## Step 6: Verify SSL Setup

- [ ] Test HTTP redirect (should redirect to HTTPS):
  ```bash
  curl -I http://your-domain.com
  ```

- [ ] Test HTTPS access:
  ```bash
  curl -I https://your-domain.com
  ```

- [ ] Check SSL certificate:
  ```bash
  openssl s_client -connect your-domain.com:443 -servername your-domain.com
  ```

- [ ] Verify in browser:
  - Visit `https://your-domain.com`
  - Check for green padlock icon
  - Test both `your-domain.com` and `www.your-domain.com`

---

## Step 7: Update Deployment Configuration (Optional)

If you want to update the nginx config template in your repo:

1. [ ] Update `terraform/nginx-config.conf`:
   - Change `server_name _;` to your actual domain
   - Uncomment the HTTPS redirect
   - Uncomment and configure the HTTPS server block

2. [ ] Commit and push changes (for future deployments)

---

## Step 8: Set Up Automatic Certificate Renewal

Certbot automatically sets up renewal, but verify it:

- [ ] Check renewal configuration:
  ```bash
  sudo certbot renew --dry-run
  ```

- [ ] Verify systemd timer (should be enabled by default):
  ```bash
  systemctl status certbot.timer
  ```

Certificates auto-renew every 60 days (Let's Encrypt certificates are valid for 90 days).

---

## Step 9: Update Firewall (if needed)

Ensure ports 80 and 443 are open:

```bash
# Check firewall status
sudo ufw status

# If needed, allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

---

## Troubleshooting

### DNS Issues
- Use `dig` or `nslookup` to verify DNS propagation
- Wait longer if DNS changes are recent (< 1 hour)
- Check DNS records in your domain registrar's control panel

### SSL Certificate Issues
- Ensure DNS is fully propagated before running Certbot
- Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`
- Verify Let's Encrypt rate limits (max 5 certificates per week per domain)

### Nginx Issues
- Test configuration: `sudo nginx -t`
- Check nginx status: `sudo systemctl status nginx`
- View nginx logs: `sudo journalctl -u nginx`

### Certificate Renewal
- Manual renewal: `sudo certbot renew`
- Check renewal logs: `sudo journalctl -u certbot.timer`

---

## Useful Commands Reference

```bash
# Test nginx configuration
sudo nginx -t

# Reload nginx (no downtime)
sudo systemctl reload nginx

# Restart nginx
sudo systemctl restart nginx

# Check nginx status
sudo systemctl status nginx

# View nginx access logs
sudo tail -f /var/log/nginx/access.log

# View nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check SSL certificate expiry
sudo certbot certificates

# Manually renew certificates
sudo certbot renew

# Test certificate renewal (dry run)
sudo certbot renew --dry-run

# View Certbot logs
sudo tail -f /var/log/letsencrypt/letsencrypt.log
```

---

## Security Checklist

After setting up SSL:

- [ ] Verify HTTPS redirect is working
- [ ] Test that HTTP automatically redirects to HTTPS
- [ ] Verify security headers are present (check with browser dev tools)
- [ ] Ensure HSTS header is working (for security headers)
- [ ] Test SSL rating at [SSL Labs](https://www.ssllabs.com/ssltest/) (optional but recommended)

---

## Notes

- **Domain verification**: Certbot will verify domain ownership via DNS/HTTP challenge
- **Auto-renewal**: Certbot automatically sets up renewal, certificates renew every 60 days
- **Backup**: Certificates are stored in `/etc/letsencrypt/` - consider backing up this directory
- **Testing**: Always test on a non-production domain first if possible

---

**Ready to switch?** Start with Step 1 (DNS Configuration) and work through the checklist sequentially.
