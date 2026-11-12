---
title: Home Firewall
description: This is a personal project I've been working on to a build a firewall.
date: 2026-11-12
---
# Architecture

![](</assets/images/Architecture Diagram Home Firewall.png>)

 It uses a network segmented gateway and I used nftables to isolate the different services from external / outside access.

## Services

The segmentation breaks down the different services into separate subnets.

- 10.10.10.10 is the outside / external requests and 10.10.10.2 is where our firewall can be accessed from.
- 10.10.20.10 is the DMZ or demilitarized zone is a special network where it is partially restricted in that external services can access it via NAT allowing HTTP/HTTPS requests to be sent on port 8080. SNAT was added as a workaround to by-pass Docker's internal networking. This network hosts our web server.
- 10.10.30.10 is the internal service network where all internal API's can be called or calls.
- 10.10.40.20 is our heavily restricted network where the database can be accessed.

## Packet Lifecycle

