#!/bin/bash
set -euo pipefail

DOMAIN="${1:-carlgranitoy.com}"
EMAIL="${2:-}"

if [ -z "$EMAIL" ]; then
  echo "Usage: ./setup-ssl.sh <domain> <email>"
  echo "  e.g. ./setup-ssl.sh carlgranitoy.com admin@carlgranitoy.com"
  exit 1
fi

echo "Setting up SSL for $DOMAIN (and www.$DOMAIN)..."

# Ensure nginx is running with the HTTP config
nginx -t && systemctl reload nginx

# Obtain certificate
certbot --nginx \
  -d "$DOMAIN" \
  -d "www.$DOMAIN" \
  --non-interactive \
  --agree-tos \
  --email "$EMAIL" \
  --redirect

# Verify
if curl -fsSo /dev/null "https://$DOMAIN"; then
  echo "SSL setup complete — https://$DOMAIN is live."
else
  echo "Certificate installed but site not reachable yet. Check DNS and that the app is running."
fi
