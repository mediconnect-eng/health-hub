# Dependency Audit Report - Health Hub
**Date:** 2026-01-14
**Project:** health-hub v0.0.0

## Executive Summary

- **🚨 Critical Security Issues:** 10 HIGH severity vulnerabilities detected
- **📦 Outdated Packages:** 12 packages can be updated
- **💾 Dependency Count:** 718 total (156 production, 563 development)
- **✅ Bloat Assessment:** Minimal - all direct dependencies are actively used

---

## 1. Security Vulnerabilities (CRITICAL - Immediate Action Required)

### 🚨 HIGH Severity - XSS Vulnerability in Angular (CVE: GHSA-jrmj-c5cx-3cw6)

**Affected Packages:**
- `@angular/compiler` (21.0.0 → **21.0.7+** required)
- `@angular/core` (21.0.0 → **21.0.7+** required)
- `@angular/common` (21.0.0 → **21.0.7+** required)
- `@angular/forms` (21.0.0 → **21.0.7+** required)
- `@angular/platform-browser` (21.0.0 → **21.0.7+** required)
- `@angular/platform-server` (21.0.0 → **21.0.7+** required)
- `@angular/router` (21.0.0 → **21.0.7+** required)
- `@angular/compiler-cli` (21.0.0 → **21.0.7+** required)

**Description:** XSS Vulnerability via Unsanitized SVG Script Attributes
**CWE:** CWE-79 (Cross-site Scripting)
**Risk:** Attackers could inject malicious scripts through SVG attributes

### 🚨 HIGH Severity - ReDoS in @modelcontextprotocol/sdk (CVE: GHSA-8r9q-7v3j-jr4g)

**Affected Package:**
- `@modelcontextprotocol/sdk` (< 1.25.2) - indirect dependency via `@angular/cli`

**Description:** Regular Expression Denial of Service vulnerability
**CWE:** CWE-1333 (Inefficient Regular Expression Complexity)
**Risk:** Application could become unresponsive due to regex processing

**Fix:** Update `@angular/cli` to version that includes patched MCP SDK (≥1.25.2)

---

## 2. Outdated Packages

### Production Dependencies

| Package | Current | Latest | Update Type |
|---------|---------|--------|-------------|
| `@angular/common` | 21.0.0 | **21.0.8** | Patch (Security) |
| `@angular/compiler` | 21.0.0 | **21.0.8** | Patch (Security) |
| `@angular/core` | 21.0.0 | **21.0.8** | Patch (Security) |
| `@angular/forms` | 21.0.0 | **21.0.8** | Patch (Security) |
| `@angular/platform-browser` | 21.0.0 | **21.0.8** | Patch (Security) |
| `@angular/platform-server` | 21.0.0 | **21.0.8** | Patch (Security) |
| `@angular/router` | 21.0.0 | **21.0.8** | Patch (Security) |
| `@angular/ssr` | 21.0.4 | **21.0.5** | Patch |
| `@aws-sdk/client-cognito-identity-provider` | 3.962.0 | **3.968.0** | Patch |
| `express` | 5.1.0 | **5.2.1** | Minor |
| `rxjs` | 7.8.0 | **7.8.2** | Patch |
| `tslib` | 2.3.0 | **2.8.1** | Minor |

### Development Dependencies

| Package | Current | Latest | Update Type |
|---------|---------|--------|-------------|
| `@angular/build` | 21.0.4 | **21.0.5** | Patch |
| `@angular/cli` | 21.0.4 | **21.0.5** | Patch (Security) |
| `@angular/compiler-cli` | 21.0.0 | **21.0.8** | Patch (Security) |

---

## 3. Bloat Analysis

### Direct Dependencies Assessment ✅

**Production (12 packages):**
- ✅ All Angular packages actively used
- ✅ `@aws-sdk/client-cognito-identity-provider` - Used in auth service (src/app/features/auth/services/auth.service.ts)
- ✅ `express` - Used in SSR server (src/server.ts)
- ✅ `rxjs` - Used in interceptors and services
- ✅ `tslib` - Required TypeScript runtime

**Development (8 packages):**
- ✅ Angular tooling required for build/development
- ✅ TypeScript tooling
- ✅ Vitest for testing
- ✅ Type definitions

### Transitive Dependencies
- **Total:** 718 dependencies (156 prod, 563 dev)
- **Assessment:** Normal for Angular SSR application with build tooling
- **Notable indirect dependencies:**
  - Algolia packages (from @angular/cli - documentation search)
  - Vite ecosystem (from build tools)

### Recommendations
- ✅ **No bloat detected** - dependency tree is reasonable for the tech stack
- Consider using `npm dedupe` to optimize the dependency tree
- All direct dependencies are actively used in the codebase

---

## 4. Recommendations & Action Items

### Immediate (Security Fixes - Do This First!)

1. **Update all Angular packages to 21.0.8+**
   ```bash
   npm install @angular/common@^21.0.8 @angular/compiler@^21.0.8 @angular/core@^21.0.8 @angular/forms@^21.0.8 @angular/platform-browser@^21.0.8 @angular/platform-server@^21.0.8 @angular/router@^21.0.8 @angular/compiler-cli@^21.0.8
   ```

2. **Update Angular tooling**
   ```bash
   npm install --save-dev @angular/build@^21.0.5 @angular/cli@^21.0.5
   ```

3. **Verify security fixes**
   ```bash
   npm audit
   ```

### Short-term (General Updates)

4. **Update remaining dependencies**
   ```bash
   npm update
   ```

5. **Update package manager** (optional but recommended)
   ```bash
   npm install -g npm@11.7.0
   ```

### Long-term (Maintenance)

6. **Establish dependency update policy**
   - Run `npm audit` weekly
   - Update patch versions monthly
   - Review minor/major updates quarterly

7. **Add dependency scanning to CI/CD**
   - Automated security scanning
   - Block deployments with HIGH+ vulnerabilities

8. **Consider dependency optimization**
   ```bash
   npm dedupe
   ```

---

## 5. Updated package.json

The following updates are recommended for `package.json`:

```json
{
  "name": "health-hub",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "serve:ssr:health-hub": "node dist/health-hub/server/server.mjs",
    "audit": "npm audit",
    "audit:fix": "npm audit fix"
  },
  "prettier": {
    "printWidth": 100,
    "singleQuote": true,
    "overrides": [
      {
        "files": "*.html",
        "options": {
          "parser": "angular"
        }
      }
    ]
  },
  "private": true,
  "packageManager": "npm@10.9.4",
  "dependencies": {
    "@angular/common": "^21.0.8",
    "@angular/compiler": "^21.0.8",
    "@angular/core": "^21.0.8",
    "@angular/forms": "^21.0.8",
    "@angular/platform-browser": "^21.0.8",
    "@angular/platform-server": "^21.0.8",
    "@angular/router": "^21.0.8",
    "@angular/ssr": "^21.0.5",
    "@aws-sdk/client-cognito-identity-provider": "^3.968.0",
    "express": "^5.2.1",
    "rxjs": "~7.8.2",
    "tslib": "^2.8.1"
  },
  "devDependencies": {
    "@angular/build": "^21.0.5",
    "@angular/cli": "^21.0.5",
    "@angular/compiler-cli": "^21.0.8",
    "@types/express": "^5.0.1",
    "@types/node": "^20.17.19",
    "jsdom": "^27.1.0",
    "typescript": "~5.9.2",
    "vitest": "^4.0.8"
  }
}
```

---

## 6. Testing Plan After Updates

After applying updates, run the following tests:

```bash
# 1. Clean install
rm -rf node_modules package-lock.json
npm install

# 2. Verify no vulnerabilities
npm audit

# 3. Run tests
npm test

# 4. Build the application
npm run build

# 5. Test SSR functionality
npm run serve:ssr:health-hub
```

---

## Appendix: Commands Used

```bash
npm audit --json          # Security vulnerability scan
npm outdated --json       # Check for outdated packages
npm ls --depth=0          # List direct dependencies
```

## References

- [Angular Security Advisory - GHSA-jrmj-c5cx-3cw6](https://github.com/advisories/GHSA-jrmj-c5cx-3cw6)
- [MCP SDK ReDoS Vulnerability - GHSA-8r9q-7v3j-jr4g](https://github.com/advisories/GHSA-8r9q-7v3j-jr4g)
- [npm Audit Documentation](https://docs.npmjs.com/cli/v10/commands/npm-audit)
