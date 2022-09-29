#### Devpulse backend

ATLP Devpulse backend

[![CI](https://github.com/atlp-rwanda/atlp-pulse-bn/actions/workflows/ci-pipeline.yml/badge.svg)](https://github.com/atlp-rwanda/atlp-pulse-bn/actions/workflows/ci-pipeline.yml)

## Introduction

This is backend system for the devpulse project. A project that is built to help players in the edu-tech sector manage students/trainees at ease. \
This project is built using modern technologies that make it more scalable. Check the tech stack section.

## How to get started

To start contributing to this project, follow the following steps to have the project up and running.
Make sure you have the following boxes checked

- [ ] A code editor installed (Visual Studio Code recommended and used mostly)
- [ ] Git installed and configured on your system
- [ ] MongoDB installed on your system (Optional)
- [ ] Docker installed on your system (Highly recommended)

If all the above are checked, use the following code snippet to get a copy of the repository

```git
git clone https://github.com/atlp-rwanda/atlp-pulse-bn.git
cd atlp-pulse-bn
npm install
cp .env.example .env
npm run dev

// open the link printed at the end of the command
```

If you already have the project. Open a terminal from the project directory and be sure to update your local copy before proceeding using this command

```git
git pull
npm install
npm run dev
```

### Getting started using docker

Docker still remain our recommended to test our application. It is fast and ensures that all user have the same environment to test which guarantes the reliability of our application in the production environment. We have two ways to start with docker

#### Using docker compose

This all in one solution ensures that everything is setup in one go.

> Just make sure `docker` and `docker compose` can run on your system

```
// after cloning and updating the project
docker compose up --build
// after the testing has completed
docker compose down
```

#### Building and running from image

Recommended if you are comfortable using docker. The container will run in detached mode and you have to make sure the database and environment are set up

```
// change into project directory
docker build . -t devpulse_bn
docker run -p 4000:4000 -d devpulse_bn
// check the url that will be printed after the completion of the commad
```

### Tech Stack

- Database: MongoDB with **Mongoose** as our ORM
- Graphql: With Apollo Server
- Typescript: The language of choice
- Mocha: Our testing library
- DigitalOcean: Our cloud porvider/hosting
- Heroku: Staging Platform

### Contributors

- [Fabrice Hafashimana](https://github.com/feyton)
- Jules Himbazwa
- Kevin Kubwimana
- [Prophete ISINGIZWE](https://github.com/procech20)
- [Tuyizere Shema Alain](https://github.com/tsa2341)
- Samuel Shyaka Dushimirimana
- Samuel Nishimwe
