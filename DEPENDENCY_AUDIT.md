# Dependency Security Audit Report

Generated: 2025-12-06

## Critical Issues Found

### 1. Version Mismatch Between package.json and pnpm-lock.yaml

**CRITICAL**: The lock file is out of sync with package.json:

| Package   | package.json | pnpm-lock.yaml | Status      |
| --------- | ------------ | -------------- | ----------- |
| next      | ^16.0.7      | 15.5.5         | ⚠️ MISMATCH |
| react     | ^19.2.1      | 19.1.0         | ⚠️ MISMATCH |
| react-dom | ^19.2.1      | 19.1.0         | ⚠️ MISMATCH |

**Impact**:

- The installed versions are older than specified
- May be missing security patches from newer versions
- Could lead to unexpected behavior or vulnerabilities

**Action Required**:

```bash
pnpm install
```

This will update the lock file to match package.json and install the correct versions.

## Package Analysis

### Direct Dependencies (package.json)

All direct dependencies appear legitimate:

- ✅ `next` - Official Next.js framework
- ✅ `react` - Official React library
- ✅ `react-dom` - Official React DOM library
- ✅ `@tailwindcss/postcss` - Official Tailwind CSS PostCSS plugin
- ✅ `tailwindcss` - Official Tailwind CSS
- ✅ `typescript` - Official TypeScript compiler
- ✅ `@types/*` - Official TypeScript type definitions

### Suspicious Packages Check

- ✅ No packages found with suspicious names
- ✅ No packages found containing malicious IPs (103.135.101.15, 194.69.203.32)
- ✅ No packages found with malicious script names (wocaosinm, colonna, react.sh, bins.sh)
- ✅ No packages found with code execution patterns in names

### Transitive Dependencies Analysis

All transitive dependencies appear to be legitimate:

- `sharp` - Image processing library (official)
- `@img/*` - Sharp platform-specific binaries (official)
- `@next/*` - Next.js internal packages (official)
- `@tailwindcss/*` - Tailwind CSS internal packages (official)
- `lightningcss` - CSS processing (official)
- Standard build tools and utilities

## Recommendations

### Immediate Actions

1. **Fix Version Mismatch**

   ```bash
   pnpm install
   ```

   This will sync pnpm-lock.yaml with package.json

2. **Run Security Audit**

   ```bash
   pnpm audit
   ```

   Check for known vulnerabilities in installed packages

3. **Update Lock File in Repository**
   After running `pnpm install`, commit the updated `pnpm-lock.yaml`

### Security Best Practices

1. **Regular Audits**: Run `pnpm audit` regularly (weekly/monthly)
2. **Keep Dependencies Updated**: Regularly update dependencies to latest secure versions
3. **Pin Critical Versions**: Consider pinning exact versions for critical packages
4. **Monitor for Compromised Packages**: Use tools like Snyk or GitHub Dependabot
5. **Review Lock File Changes**: Always review changes to pnpm-lock.yaml in PRs

### Post-Compromise Actions

Since the container was compromised, additional steps:

1. **Regenerate Lock File**: Delete `pnpm-lock.yaml` and run `pnpm install` fresh
2. **Verify Package Integrity**: Check package checksums match expected values
3. **Review Build Process**: Ensure build process hasn't been tampered with
4. **Check for Backdoors**: Review all code for any injected malicious code

## Conclusion

The dependency tree itself appears clean - no obviously malicious packages were found. However, the version mismatch is a critical issue that needs immediate attention. The malware found in the container was likely injected at runtime, not through a compromised package.

**Next Steps**:

1. Fix version mismatch with `pnpm install`
2. Run `pnpm audit` to check for vulnerabilities
3. Commit updated lock file
4. Rebuild and redeploy with hardened Dockerfile
