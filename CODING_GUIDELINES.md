# Coding Guidelines

These conventions keep the project consistent and easy to maintain.

## Language
- Write all source code, inline comments, documentation comments, commit messages, and new markdown content in **English**.
- If user-facing UI copy must be in another language, keep the surrounding comments and code identifiers in English.

## Reviews & Automation
- Reject any pull request or change that introduces non-English comments or identifiers unless there is a hard external requirement.
- Run a quick search (e.g., `rg "[^\\x00-\\x7F]"`) before merging to detect accidental non-English text.
- Consider adding a pre-commit hook or CI check that fails when non-English characters are added outside dedicated localization files.

## Documentation For Codex/AI Assistants
- Share this file with anyone collaborating via Codex so the assistant keeps the language consistent.
- When starting a Codex session, remind the assistant: *"All comments and docs must be in English."*
- Keep the guidelines updated as the codebase evolves.

Following these rules helps ensure the project stays ready for international teams and tooling.
