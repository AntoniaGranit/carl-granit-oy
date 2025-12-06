# Security Hardening - Runtime Injection Prevention

## Overview

This document explains the security measures implemented to prevent runtime injection attacks and other security threats.

## Security Measures Implemented

### 1. Dockerfile Hardening

#### Multi-Stage Build
- **Purpose**: Reduces attack surface by excluding build tools from final image
- **Implementation**: Separate stages for dependencies, building, and runtime
- **Benefit**: Final image only contains production dependencies, not build tools

#### Non-Root User
- **Purpose**: Prevents privilege escalation attacks
- **Implementation**: Container runs as `nextjs` user (UID 1001) instead of root
- **Benefit**: Even if code is compromised, attacker cannot gain root privileges

#### Minimal Base Image
- **Purpose**: Reduces attack surface
- **Implementation**: Uses `node:24-alpine` (minimal Alpine Linux)
- **Benefit**: Fewer packages = fewer potential vulnerabilities

#### Removed Unnecessary Tools
- **Purpose**: Prevents attackers from using system tools for malicious purposes
- **Implementation**: Removed `corepack` and cleaned up package cache after build
- **Benefit**: Tools like `wget`, `curl` (if present) cannot be used by attackers

### 2. Docker Compose Security Options

#### DNS Configuration
- **Purpose**: Prevents DNS-based attacks and ensures reliable DNS resolution
- **Implementation**: Uses public DNS servers (8.8.8.8, 1.1.1.1) instead of host resolver
- **Benefit**: Avoids DNS resolution issues that could trigger excessive queries

#### Security Options
```yaml
security_opt:
  - no-new-privileges:true
```
- **Purpose**: Prevents privilege escalation
- **Benefit**: Container cannot gain additional privileges even if compromised

#### Read-Only Root Filesystem
```yaml
read_only: true
tmpfs:
  - /tmp
  - /var/tmp
```
- **Purpose**: Prevents file system modifications
- **Implementation**: Root filesystem is read-only, only `/tmp` and `/var/tmp` are writable
- **Benefit**: Malware cannot write persistent files to disk

#### Capability Dropping
```yaml
cap_drop:
  - ALL
cap_add:
  - NET_BIND_SERVICE
```
- **Purpose**: Removes unnecessary Linux capabilities
- **Implementation**: Drops ALL capabilities, only adds `NET_BIND_SERVICE` (needed to bind to port < 1024)
- **Benefit**: Severely limits what the container can do even if compromised

#### Resource Limits
```yaml
mem_limit: 512m
cpus: 1.0
```
- **Purpose**: Prevents resource exhaustion attacks
- **Benefit**: Limits CPU and memory usage, preventing DoS attacks

#### Health Checks
- **Purpose**: Monitors container health
- **Implementation**: Checks HTTP endpoint every 30 seconds
- **Benefit**: Detects if container becomes unresponsive

## How These Measures Prevent Runtime Injection

### 1. **Non-Root User**
- Even if malicious code executes, it runs as unprivileged user
- Cannot install system packages
- Cannot modify system files
- Cannot escalate privileges

### 2. **Read-Only Filesystem**
- Malware cannot write persistent files
- Cannot install backdoors
- Cannot modify application code
- Only temporary files in `/tmp` (cleared on restart)

### 3. **Capability Dropping**
- Removes ability to:
  - Mount filesystems
  - Modify kernel parameters
  - Access raw network sockets
  - Perform system administration tasks

### 4. **No New Privileges**
- Prevents privilege escalation attacks
- Even if a vulnerability is found, cannot gain more privileges

### 5. **Resource Limits**
- Prevents resource exhaustion
- Limits impact of DoS attacks
- Prevents runaway processes

### 6. **Minimal Image**
- Fewer tools available for attackers to use
- Smaller attack surface
- Faster security updates

## Additional Recommendations

### Application-Level Security

1. **Input Validation**
   - Always validate and sanitize user input
   - Use parameterized queries for database access
   - Escape output to prevent XSS

2. **Dependency Management**
   - Regularly update dependencies
   - Run `pnpm audit` regularly
   - Pin critical dependency versions

3. **Environment Variables**
   - Never commit secrets to repository
   - Use Docker secrets or environment variables
   - Rotate secrets regularly

4. **Monitoring**
   - Monitor container logs for suspicious activity
   - Set up alerts for unusual resource usage
   - Monitor network traffic

5. **Regular Updates**
   - Keep base images updated
   - Update dependencies regularly
   - Apply security patches promptly

## Comparison: Before vs After

### Before
- ❌ Running as root
- ❌ Full filesystem access
- ❌ All Linux capabilities
- ❌ No resource limits
- ❌ DNS issues causing excessive queries
- ❌ Build tools in production image

### After
- ✅ Running as non-root user
- ✅ Read-only filesystem (except /tmp)
- ✅ Minimal capabilities (only NET_BIND_SERVICE)
- ✅ Resource limits (512MB RAM, 1 CPU)
- ✅ Reliable DNS configuration
- ✅ Multi-stage build (minimal production image)

## Testing Security

To verify security measures are working:

```bash
# Check container is running as non-root
docker exec carl-granit-oy id

# Try to write to root filesystem (should fail)
docker exec carl-granit-oy touch /test.txt

# Check capabilities
docker exec carl-granit-oy capsh --print

# Check resource limits
docker stats carl-granit-oy
```

## Conclusion

These security measures significantly reduce the risk of runtime injection attacks by:
1. Limiting what the container can do (capabilities, privileges)
2. Preventing persistent modifications (read-only filesystem)
3. Reducing attack surface (minimal image, no unnecessary tools)
4. Monitoring health (health checks)

However, security is an ongoing process. Continue to:
- Monitor for vulnerabilities
- Update dependencies regularly
- Review security logs
- Keep security measures up to date

