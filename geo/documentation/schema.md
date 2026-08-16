# Schema

## Table of Content
- [Overview](#overview)
- [User](#user)
- [Profile](#profile)
- [Email](#email)
- [Reference](#reference)

## Overview

## User

The `user` entity stores information about a person who uses the system.

Each `user` can optionally have a `profile`, though it is not required. But a `profile` must have a `user`. When the `user` is deleted, the `profile` should also be deleted. The `profile` is created alongside the `user` during registration (`/register`). But the `user` and `profile` can be created individually using the <abbr title="Application Programming Interface">API</abbr>.

## Profile

The `profile` entity stores a collection of settings and information associated with a `user`.



## Email

## Reference
