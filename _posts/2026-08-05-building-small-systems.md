---
title: "The case for building small systems from scratch"
description: "What a tiny database can teach you that a production database politely hides."
category: Engineering
---

Modern software is wonderfully composable. Need durable storage, background jobs, or authentication? There is a mature service for each, and using it is usually the responsible choice.

But responsibility and learning are different objectives.

Building a small version of a familiar system forces its abstractions to become concrete. “Durability” turns into a particular ordering of writes and flushes. “Concurrency” becomes two requests arriving between the same pair of instructions. “Recovery” becomes a process opening files left behind by its previous, abruptly terminated self.

You do not need to recreate PostgreSQL to learn from databases. A key-value store with three commands is enough to confront the interesting questions.

> The value is not in producing a smaller substitute. It is in replacing vocabulary with experience.

The trick is to keep the scope small enough that you reach the difficult parts. A project with a broad feature list can spend all its time on plumbing. A narrow system—one protocol, one data structure, one persistence model—has nowhere for the fundamental problems to hide.

