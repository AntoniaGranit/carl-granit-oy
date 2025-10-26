# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated deployment, monitoring, and maintenance of your Carl Granit Oy application.

## Workflows Overview

### 🚀 `deploy.yml` - Main Deployment Workflow

**Triggers:** Push to main branch, Pull requests, Manual dispatch

**Features:**

-   Runs tests and builds before deployment
-   Creates automatic backups before deploying
-   Deploys to production server via SSH
-   Performs health checks after deployment
-   Sends notifications on success/failure

**Usage:**

-   Automatic on push to main branch
-   Manual trigger via GitHub Actions tab

### 🔒 `ssl-renewal.yml` - SSL Certificate Management

**Triggers:** Weekly schedule (Mondays at 2 AM UTC), Manual dispatch

**Features:**

-   Checks certificate expiry (renews if < 30 days)
-   Automatically renews Let's Encrypt certificates
-   Reloads nginx with new certificates
-   Tests site accessibility after renewal

**Usage:**

-   Automatic weekly checks
-   Manual trigger for immediate renewal

### 🔄 `rollback.yml` - Emergency Rollback

**Triggers:** Manual dispatch only

**Features:**

-   Lists available backups
-   Allows rollback to any previous backup
-   Creates backup of current state before rollback
-   Performs health checks after rollback

**Usage:**

-   Go to Actions → Rollback Deployment
-   Enter backup name (e.g., `backup-20241201-143022`)
-   Click "Run workflow"

### 📊 `monitor.yml` - Server Monitoring

**Triggers:** Every 15 minutes, Manual dispatch

**Features:**

-   Monitors server health (CPU, memory, disk)
-   Checks service status (app, nginx)
-   Performs application health checks
-   Auto-restarts services on failure
-   Alerts on critical issues

**Usage:**

-   Automatic monitoring every 15 minutes
-   Manual trigger for immediate check

## Setup Instructions

### 1. Repository Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

```
SERVER_SSH_KEY
```

Your private SSH key for server access (the same key you use to SSH into the server)

### 2. Update Configuration

Before using the workflows, update these values in the workflow files:

**In `deploy.yml`:**

-   `SERVER_IP`: Your server IP (currently: `188.245.240.43`)
-   `APP_NAME`: Your application name (currently: `carl-granit-oy`)

**In `ssl-renewal.yml`:**

-   `SERVER_IP`: Your server IP
-   `DOMAIN`: Your actual domain name

**In `rollback.yml` and `monitor.yml`:**

-   `SERVER_IP`: Your server IP
-   `APP_NAME`: Your application name

### 3. Server Preparation

Ensure your server has the necessary setup:

```bash
# SSH into your server
ssh root@188.245.240.43

# Run the server setup script
./server-setup.sh

# Deploy your application
./deploy.sh
```

## Workflow Details

### Deployment Process

1. **Test Phase:**

    - Checkout code
    - Setup Node.js
    - Install dependencies
    - Run linting and tests
    - Build application

2. **Deploy Phase:**
    - Create deployment package
    - Create backup of current state
    - Stop application service
    - Upload new code
    - Install dependencies
    - Set permissions
    - Start application
    - Perform health checks

### Monitoring Checks

-   **System Health:** CPU, memory, disk usage
-   **Service Status:** Application and nginx services
-   **Application Health:** HTTP health endpoint
-   **SSL Status:** Certificate expiry
-   **Error Logs:** Recent system errors

### Rollback Process

1. List available backups
2. Verify backup exists
3. Create backup of current state
4. Stop application
5. Restore from selected backup
6. Start application
7. Perform health checks

## Troubleshooting

### Deployment Failures

1. Check the Actions tab for detailed logs
2. SSH into server and check service status:
    ```bash
    systemctl status carl-granit-oy
    journalctl -u carl-granit-oy -f
    ```

### SSL Issues

1. Check certificate status:
    ```bash
    certbot certificates
    ```
2. Test renewal manually:
    ```bash
    certbot renew --dry-run
    ```

### Monitoring Alerts

1. Check server resources:
    ```bash
    df -h
    free -h
    systemctl status carl-granit-oy
    ```
2. Check application logs:
    ```bash
    journalctl -u carl-granit-oy -f
    ```

## Security Notes

-   SSH keys are stored as encrypted secrets
-   All workflows run in isolated environments
-   Server access is limited to necessary operations
-   Sensitive data is not logged in workflow outputs

## Customization

### Adding Tests

Add test scripts to your `package.json`:

```json
{
	"scripts": {
		"test": "jest",
		"lint": "eslint .",
		"type-check": "tsc --noEmit"
	}
}
```

### Custom Health Checks

Add a health endpoint to your Next.js app:

```javascript
// pages/api/health.js
export default function handler(req, res) {
	res.status(200).json({
		status: "healthy",
		timestamp: new Date().toISOString(),
	})
}
```

### Notification Integration

Add notification services (Slack, Discord, etc.) to workflow steps:

```yaml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
      status: ${{ job.status }}
      webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## Maintenance

### Regular Tasks

-   Monitor workflow execution in Actions tab
-   Check server resources weekly
-   Review and rotate SSH keys periodically
-   Update workflow configurations as needed

### Backup Management

-   Backups are created automatically before each deployment
-   Old backups are cleaned up by the server setup script
-   Manual backups can be created using the server scripts

## Support

For issues with the workflows:

1. Check the Actions tab for detailed logs
2. Verify server connectivity and SSH key
3. Check server logs and service status
4. Review workflow configuration and secrets
