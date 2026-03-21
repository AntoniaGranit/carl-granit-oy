# Deployment

carlgranitoy.com runs on a Hetzner CX23 server in Helsinki (hel1), provisioned with Terraform and deployed via GitHub Actions.

## Architecture

```
Internet → Hetzner Firewall (22/80/443) → Nginx (reverse proxy) → Docker (Next.js on :3000)
```

## Server users

| User | Purpose | SSH keys | Sudo |
|------|---------|----------|------|
| `devops` | Manual SSH access | olle, antonia-gubbe (from Hetzner) | Full |
| `ci` | GitHub Actions deploys | Dedicated CI keypair | docker, nginx reload, certbot only |

Root login is disabled.

## Provisioning a new server

### Prerequisites

- Terraform >= 1.5
- Hetzner Cloud API token
- SSH keys `olle` and `antonia-gubbe` registered in Hetzner
- A CI keypair (generate with `ssh-keygen -t ed25519 -C "ci-deploy" -f ci_deploy_key -N ""`)

### Steps

1. Fill in `_stack/terraform.tfvars`:

   ```
   hcloud_token  = "<your-hetzner-api-token>"
   ci_public_key = "<contents of ci_deploy_key.pub>"
   ```

2. Provision the server:

   ```bash
   cd _stack
   terraform init
   terraform apply
   ```

3. Note the `server_ip` output.

4. Set DNS A records at your domain registrar:

   - `carlgranitoy.com` → server IP
   - `www.carlgranitoy.com` → server IP

5. Wait for DNS propagation (verify with `dig carlgranitoy.com`).

6. Set up SSL:

   ```bash
   scp setup-ssl.sh devops@<server-ip>:~
   ssh devops@<server-ip> 'sudo bash setup-ssl.sh carlgranitoy.com <your-email>'
   ```

7. Set GitHub repository secrets:

   | Secret | Value |
   |--------|-------|
   | `SERVER_IP` | Server IPv4 address from terraform output |
   | `CI_SSH_KEY` | Contents of `ci_deploy_key` (private key) |

8. Push to `main` — GitHub Actions will build and deploy automatically.

## What cloud-init installs

- Docker + Docker Compose plugin
- Nginx (reverse proxy to :3000)
- Certbot (Let's Encrypt SSL)
- UFW (firewall: 22, 80, 443 only)
- fail2ban (SSH brute-force protection)
- unattended-upgrades (automatic security patches)

## SSH hardening

- Password auth disabled
- Root login disabled
- Max 3 auth attempts
- Only `devops` and `ci` users allowed

## Ongoing deploys

Push to `main` triggers `.github/workflows/deploy.yml`:

1. Builds the Next.js app
2. Creates a deployment tarball
3. SSHs into the server as `ci`
4. Stops the running container
5. Uploads and extracts the new code to `/var/www/carl-granit-oy`
6. Runs `docker compose up -d --build`
7. Health checks `/api/health`
8. Auto-rollback on failure

## SSL renewal

Certbot auto-renews via its systemd timer. A GitHub Actions workflow (`.github/workflows/ssl-renewal.yml`) also checks weekly as a backup.

## Rollback

Trigger manually via `.github/workflows/rollback.yml` with the backup name (e.g. `backup-20260321-140000`). Backups are stored in `/var/backups/carl-granit-oy/`.

## Manual access

```bash
ssh devops@<server-ip>
```
