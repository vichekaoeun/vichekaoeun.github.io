---
title: Building Powerscale
description: Powerscale is a platform that lets you easily create rankings to
  powerscale whatever topic you like. Think Tierlistmaker but powerscaling.
date: 2026-11-17
---
# Introduction

I want to make this post more about the technical aspect of Powerscale rather than the product itself (it's still in-development). The goal of this post is just me learning to build out a distributed microservices application.

# Architecture

![](/assets/images/powerscale-architecture-1.png)

(local at the moment)

# The Lifecycle of a vote

## User request -> Frontend

![](/assets/images/vote_lifecycle_step1_browser_to_frontend.png)

When a request is sent from the User, our frontend served by nginx does not use any account creation at the moment so we let the frontend generates a random ID for each browser (our way of identifying different users). The ID is then attached to every vote request `X-User-Id` as a request header. After which a POST request is then sent along with the request header as a payload to the API Gateway.

As I continue to scale Powerscale, in the future we would need to secure against stuffing from random curls and also impersonation of user ID to manipulate votes. But we also need to consider to make the process of powerscaling fun without needing users to always have an account to vote. One feature could be to give the option to enable secure voting for some scales or creating private scales.

## API Gateway

A dedicated service running that acts as an entry-point for the rest of the other microservices. It does 3 things:

1. **Routing** - it looks at the request path and forward it to the necessary microservice
2. **Load balancing** - if a microservice has multiple instances the request load is split across them. (working locally so doesn't properly scale yet but idea is there).
3. **Circuit breaking and fallback** - if a microservice is constantly failing the gateway stops calling it and returns a quick fallback response to the User. This lets user much faster response if something is failing rather than waiting for a timeout.

I use the Resilience4j library to setup the fault tolerance which is set to a threshold of 20-call window, 15s open state.

![](/assets/images/gateway_resilience4j_circuit_breaker.png)

## Voting Service

### Problem:

When creating a vote, the votes need to saved to Vote Service's database, then Ranking Service has to find out and update the rating / leaderboard.

Since both our services has independent databases' no single transaction can cover both. This is a problem called **Dual-Write**. We publish events to Kafka so other services can read them, but we also need to update the database. Many failure scenario like

- Publish first, but if save fails, ranking service is counting a vote that doesn't exist
- Vote is saved, but event failed so we have a vote that is never counted for

### Solution:

Using Transactional Outbox Pattern, the Voting Service writes the vote and an event row to an `outbox` table in the same local database transaction. Then a job reads any unpublished row every 500ms and sends them to Kafka, waits for acknowledgement and finally marks them as published.

![](/assets/images/maxresdefault.jpg)

there's a great [video](https://www.youtube.com/watch?v=5YLpjPmsPCA&t=27s) by Confluent on Youtube that explains this exact approach and scenario.

## Ranking Service



&nbsp;