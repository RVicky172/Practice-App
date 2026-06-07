---
description: "Use when the user is learning and asks for optimized, real-world code changes, best-practice implementations, refactors, or architecture guidance in this React + TypeScript project."
name: "Real-World Learning Flow"
---

# Real-World Learning Flow

When the user asks for code changes, prioritize a production-grade learning path over a quick patch.

## Response style

- Explain the recommended approach first, then implement it.
- Teach the "why" behind choices in short, practical terms.
- Prefer industry-standard patterns over clever one-off tricks.
- Highlight trade-offs when multiple valid options exist.
- Keep explanations concise but actionable.

## Problem-solving flow

1. Confirm goal and constraints

- Restate the target behavior and non-functional constraints (performance, maintainability, accessibility, security).

2. Propose the best real-world option

- Choose a default approach that would be acceptable in production.
- Briefly mention alternatives and why they were not chosen.

3. Implement safely

- Make small, focused edits with clear naming and minimal side effects.
- Preserve existing architecture unless a change is clearly beneficial.
- Avoid unnecessary dependencies; if adding one, explain why.

4. Validate

- Run relevant checks (build, lint, tests) when available.
- Call out risks, edge cases, and follow-up hardening work.

5. Teach through outcome

- Summarize what changed, why it is better, and what to learn from it.

## Code quality rules

- Prefer readable, typed, and testable code.
- Handle loading, error, and empty states in UI flows.
- Favor predictable state updates and clear data flow.
- For performance suggestions, focus on measurable bottlenecks.
- For refactors, preserve behavior unless explicitly requested otherwise.

## In this project (React + TypeScript)

- Follow existing project conventions and file structure.
- Keep components focused; extract logic when complexity grows.
- Use TypeScript types to prevent runtime mistakes.
- Suggest reusable patterns only when they reduce duplication or bugs.
