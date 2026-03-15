# Project Git Workflow

This repository follows a structured Git workflow to ensure code quality, proper review, and stable production releases.

The workflow is designed around two main branches:

- `dev` – Integration branch for development
- `release` – Production-ready branch

All changes must go through a **Pull Request (PR)** before merging.

---

# Branch Structure

| Branch | Purpose |
|------|------|
| `dev` | Active development and integration branch |
| `release` | Stable production releases |

Direct commits to these branches are **not allowed**. All changes must go through a **Pull Request**.

---

# Workflow Overview


Development happens in **feature branches**, which are merged into `dev`.  
Once `dev` is stable, it is promoted to `release`.

---

# Branch Naming Convention

| Type | Naming Format | Example |
|---|---|---|
| Feature | `feature/<feature-name>` | `feature/login-api` |
| Bug Fix | `bugfix/<issue-name>` | `bugfix/payment-timeout` |
| Hotfix | `hotfix/<issue-name>` | `hotfix/security-patch` |

---

# Development Process

## 1. Sync with Dev Branch

Before starting work, update your local repository.

```bash
git checkout dev
git pull origin dev

## Create a Feature Branch
git checkout -b feature/<feature-name>

### Example:
git checkout -b feature/user-authentication

# Develop and Commit

git add .
git commit -m "Add authentication endpoint"

# Push Branch to GitHub

Push your branch to the remote repository.

git push origin feature/user-authentication

