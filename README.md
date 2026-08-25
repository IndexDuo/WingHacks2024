# BiasGuessr

# Overview

Guess K-pop and Western celebrities in a fast, mobile voice game. English pronunciations and typed answers are supported.

## Table of Contents

- [General Info](#general-info)
- [Technologies](#technologies)
- [Where to Play](#where-to-play)

# General Info

## Features

- Choose a game mode between K-POP or Western artists
- Play for as many rounds as you'd like (or for as many as we have in our database)
- Got it wrong? The game will tell you who it is!

## Team

<div>
  <img src="https://github.com/IndexDuo.png" width="80px;"/>
  &emsp;
  <img src="https://github.com/lindsey-nielsen.png" width="80px;"/>
  &emsp;
  <img src="https://github.com/ca764763.png" width="80px;"/>
  &emsp;
  <br />
  <sub><a href="https://github.com/IndexDuo">Jing Li</a></sub>
  &emsp;&emsp;
  <sub><a href="https://github.com/lindsey-nielsen">Lindsey Nielsen</a></sub>
  &emsp;
  <sub><a href="https://github.com/ca764763">Cassandra Alvarez</a></sub>
</div>

# Technologies

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

# Where to Play

[Play BiasGuessr](https://wing-hacks2024.vercel.app/)

## Local setup

1. Copy `.env.example` to `.env` and add a read-only MongoDB Atlas connection string.
2. Run `npm install`.
3. Run `npm run server` and `npm start` in separate terminals.

Vercel deployments require `MONGODB_URI`. `MONGODB_DB_NAME` is optional and defaults to `CelebrityPhotos`.
