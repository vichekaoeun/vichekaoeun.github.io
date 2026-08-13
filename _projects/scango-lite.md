---
title: scango-lite
order: 1
stack: Go · AST · Security
description: A lightweight static analyzer for detecting common security problems in Go programs.
repository: https://github.com/vichekaoeun/scango-lite
---

## Overview

scango-lite scans Go source code for a focused set of security vulnerabilities. It analyzes the syntax tree rather than matching source text with regular expressions, producing findings with precise file, line, and column information.

## Detected issues

- Hardcoded credentials and secrets
- SQL queries built from untrusted values
- Insecure HTTP usage
- Command injection risks

## Design

Each detection rule lives in its own file and operates on Go AST nodes. That keeps rules independent and makes the analyzer easy to extend without changing the traversal and reporting machinery.

The CLI supports readable terminal output and structured JSON. It exits with a non-zero status when findings exist, allowing it to become a small CI check without additional integration code.

## What I learned

Working with the AST provides context that text matching cannot. It also forces every rule to define exactly which code shapes are suspicious, which makes false-positive tradeoffs easier to reason about.
