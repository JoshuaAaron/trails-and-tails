# Code Review Chatmode - Quick Start Guide

## Overview

The **🔍 Code Reviewer** chatmode transforms GitHub Copilot into your experienced Senior Code Review Manager. It uses the GitHub MCP Server to directly interact with your PRs on GitHub.

---

## Prerequisites

### 1. GitHub Personal Access Token (PAT)

You'll need to create a PAT with appropriate permissions:

1. Go to: https://github.com/settings/personal-access-tokens/new
2. **Token name:** `MCP Server - Code Reviews`
3. **Expiration:** Your choice (90 days recommended)
4. **Repository access:** Select your repositories
5. **Permissions needed:**
   - **Repository permissions:**
     - Contents: Read and write
     - Pull requests: Read and write
     - Issues: Read and write (if using issues)
     - Metadata: Read-only
     - Workflows: Read-only (for CI/CD status)

6. Click **Generate token**
7. **SAVE IT SOMEWHERE SAFE** - you can't see it again!

### 2. Docker

The GitHub MCP Server runs in Docker:
- **macOS:** [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Make sure Docker is **running** before using the chatmode

### 3. MCP Server Configuration

✅ **Already configured in your workspace!**

Your `.vscode/mcp.json` now includes:
```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "github_token",
      "description": "GitHub Personal Access Token",
      "password": true
    }
  ],
  "servers": {
    "github": {
      "type": "stdio",
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN", "ghcr.io/github/github-mcp-server"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${input:github_token}"
      }
    }
  }
}
```

---

## How to Use

### Step 1: Activate the Chatmode

1. Open GitHub Copilot Chat in VS Code
2. Enable **Agent Mode** (toggle near the chat input)
3. Select the **🔍 Code Reviewer** chatmode

### Step 2: Review a Pull Request

**Simple command:**
```
Review PR #[number]
```

**Examples:**
```
Review PR #42
Review my latest PR
Review pull request #15 for security issues
```

The chatmode will:
1. ✅ Fetch PR details from GitHub
2. ✅ Read all changed files
3. ✅ Analyze code quality, tests, accessibility, security
4. ✅ Flag internal development references
5. ✅ Provide structured feedback with severity levels
6. ✅ Offer to make approved changes

### Step 3: Review Feedback

You'll get a comprehensive review with:

- **📊 Summary:** Quick overview of findings
- **🚨 Critical Issues:** Must fix before merge
- **⚠️ Important Issues:** Should fix
- **💡 Suggestions:** Nice to have improvements
- **✅ Positive Feedback:** What's done well
- **🎯 Recommendation:** APPROVE / REQUEST CHANGES / COMMENT

### Step 4: Apply Fixes (Optional)

If the reviewer suggests changes:

**Give permission:**
```
Yes, please fix those internal references
Go ahead and update the comments
Make those security fixes
```

The chatmode will:
1. Update files one by one
2. Explain each change
3. Run tests to verify
4. Commit changes (with your approval)

---

## What the Reviewer Checks

### 🚨 Critical (Must Fix)
- Security vulnerabilities
- Breaking changes
- Data loss risks
- Hard-coded secrets
- Missing error handling
- **Internal development references** (like "Main QA Chatmode")

### ⚠️ Important (Should Fix)
- Code quality issues
- Missing tests
- Accessibility violations (WCAG AA)
- Performance bottlenecks
- Inconsistent patterns

### 💡 Suggestions (Nice to Have)
- Refactoring opportunities
- Better naming
- Additional test cases
- Performance optimizations

### ✅ Praise
- Well-structured code
- Excellent tests
- Good documentation
- Accessibility wins

---

## Special Features

### Internal Reference Detection

The reviewer automatically flags and offers to fix:
```typescript
// ❌ BAD (internal reference)
// Per Main QA Chatmode: Use seed tests to establish ready-to-use page context

// ✅ GOOD (production-ready)
// Establishes initial page state before running test scenarios
```

### GitHub Integration

The GitHub MCP Server allows the reviewer to:
- Read PR details, diffs, and comments
- Check CI/CD status
- Post review comments
- Update PR status
- See file history

### Production Readiness Focus

Always checks for:
- No `console.log()` in production
- Environment variables properly used
- User-friendly error messages
- No commented-out code
- No TODO without tickets
- Secrets in `.env`, not code

---

## Example Workflow

### 1. You create a PR on GitHub
```bash
git push origin feature/new-booking-flow
# Create PR on GitHub
```

### 2. Activate Code Reviewer chatmode
```
Review PR #45
```

### 3. Receive comprehensive feedback
```markdown
# Code Review: Add booking flow validation

🚨 Critical Issues: 1
⚠️ Important Issues: 3
💡 Suggestions: 2
✅ Positive Feedback: 5

## 🚨 Critical Issues

### Hard-coded API URL
**Location:** `src/api/bookings.ts:23`
**Issue:** Production API URL is hard-coded...
```

### 4. Approve fixes
```
Yes, please fix the hard-coded URL and remove those internal references
```

### 5. Reviewer makes changes
```
✅ Updated src/api/bookings.ts - Moved URL to environment variable
✅ Updated tests/e2e/booking/aria-attributes.spec.ts - Removed chatmode reference
✅ All tests passing
```

---

## Tips for Best Results

### Be Specific
```
❌ "Review this"
✅ "Review PR #42 for accessibility and security issues"
```

### Use for Every PR
Make code review part of your workflow:
1. Create PR on GitHub
2. Review with chatmode
3. Fix critical issues
4. Merge with confidence

### Trust the Expertise
The reviewer knows:
- WCAG 2.2 AA standards
- OWASP security best practices
- React/Next.js patterns
- Testing best practices
- Production readiness criteria

---

## Troubleshooting

### "GitHub token not found"
1. Make sure Docker is running
2. Reload VS Code window
3. You'll be prompted for your PAT on first use

### "PR not found"
- Check you have access to the repository
- Verify PR number is correct
- Ensure your PAT has correct permissions

### Docker issues
```bash
# Check Docker is running
docker ps

# Pull the GitHub MCP Server image manually
docker pull ghcr.io/github/github-mcp-server
```

---

## Security Notes

### Your PAT is Safe
- Stored securely by VS Code
- Never logged or exposed
- Only used for GitHub API calls
- You can revoke it anytime at: https://github.com/settings/tokens

### What the Reviewer Can Do
- ✅ Read your repositories
- ✅ Read and create PR comments
- ✅ Read file contents
- ✅ Check CI/CD status

### What It Cannot Do
- ❌ Merge PRs (you must approve)
- ❌ Delete branches
- ❌ Access other people's private repos
- ❌ Modify GitHub settings

---

## Next Steps

1. ✅ **Create your GitHub PAT** (save it somewhere safe!)
2. ✅ **Ensure Docker is running**
3. ✅ **Open your PR on GitHub** (if not already)
4. ✅ **Activate Agent Mode** in Copilot Chat
5. ✅ **Select 🔍 Code Reviewer** chatmode
6. ✅ **Type:** `Review PR #[your-pr-number]`

You now have a professional code reviewer that will help you ship production-ready code! 🚀

---

## Questions?

The chatmode is designed to be conversational:
```
"What are the critical issues in PR #42?"
"Can you explain why that's a security risk?"
"Should I fix the suggestions or just the critical issues?"
"What's the best way to handle this validation?"
```

Happy reviewing! 🔍✨
