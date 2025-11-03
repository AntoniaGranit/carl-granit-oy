# Domain Setup TODO

## 1. DNS Configuration

-   [ ] Create A record: `@` → `<server-ip>`
-   [ ] Create A record: `www` → `<server-ip>`
-   [ ] Wait for propagation: `dig your-domain.com`
-   [ ] Verify: `curl -I http://your-domain.com`

## 2. Update Nginx Config

```bash
ssh user@server-ip
sudo nano /etc/nginx/sites-available/carl-granit-oy
```

Change:

```nginx
server_name your-domain.com www.your-domain.com;
```

Then:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 3. Get SSL Certificate

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Follow prompts (agree to redirect HTTP→HTTPS).

## 4. Verify

-   [ ] `curl -I https://your-domain.com` returns 200
-   [ ] Browser shows padlock icon
-   [ ] HTTP redirects to HTTPS

---

**Firewall**: Already configured via Terraform (ports 80, 443)  
**Auto-renewal**: Certbot handles this automatically
