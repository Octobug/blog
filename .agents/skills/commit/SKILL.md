---
name: commit
description: Use when the user wants to create a new git commit in the current repo — e.g. "commit", "commit 123", or "help me commit". Do not use for merely viewing git status, querying history, or pure review unless a new commit is actually needed.
---

# Git Commit

Create a new commit from the current working tree.

## Usage

```sh
codex commit
codex "commit 123"

copilot -i "/commit"
copilot -i "/commit 123"
```

## Trigger Rules

- `commit` or `commit <number>` are valid triggers. The trailing issue number is optional.
- If a number is provided it must match `^\d+$`. Valid → add `re #<number>` as a footer line. Invalid → stop immediately and tell the user to use the `commit 123` format.
- Never guess, extract, rewrite, or auto-complete an issue number.
- Every commit must include an AI co-author footer with the actual model name:
  - e.g. `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`
  - e.g. `Co-Authored-By: GPT-5.4 <noreply@openai.com>`
- Footer order: `re #<number>` (if any) → AI co-author (always last).

## Workflow

1. Inspect `git status`, staged/unstaged diffs, untracked files, and recent commit style.
2. Determine the exact scope — only changes relevant to the current task.
3. Stop if the staging area contains clearly unrelated changes; ask the user to clean up first.
4. Stop if there is nothing relevant to commit. Never create an empty commit.
5. Stage files explicitly by path. Never use `git add .` or `git add -A`.
6. Never include unrelated changes, secrets, credentials, `.env`, or other sensitive files.
7. Compose the commit message with footers (see format below).
8. Create the commit. Do not use `--amend`, `--no-verify`, or `--no-gpg-sign`, and do not modify git config.
9. If a pre-commit or commit-msg hook fails, fix the issue and retry.
10. Return the commit hash and full commit message.

## Commit Message Format

Use Conventional Commits:

```txt
<type>[(scope)]: <description>

[body]

[footer(s)]
```

- Valid types: `feat`, `fix`, `docs`, `refactor`, `test`, `build`, `ci`, `chore`, `perf`, `style`.
- Only add a scope when it is short and accurate; don't invent one just for formatting.
- Keep the description concise, no trailing period.
- Body is optional (1–3 lines max); explain motivation or impact, don't parrot the diff.
- Follow the language convention of recent commits for scope, description, and body.
- Footer must include the AI co-author line; prepend `re #<number>` if an issue number was given.
