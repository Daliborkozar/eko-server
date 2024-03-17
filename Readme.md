## EXTENSIONS

Install VS code extensions: eslint & prettier. Set pretter as code formatter in settings.

## Roles

1. SuperAdmin
2. Admin - organization owner
3. User - worker
4. Patient

## Tasks:

- Add Patient with user ID

- Users table with search

`super admin, admin, user(radnik), patient`

super admin sees every one admin sees everyone in his organization ( users, patients ) doctor sees
patients he admitted

- add delete/edit on table

//TODO separate by domains( folders ), add relations 0. patient schema

1. izmeniti login da cuva sve info o useru u token
2. namestiti token expiry itd
3. namestiti middleware za verify tokena > cuvanje korisnika na req > hasRights na osnovu role iz
   baze ( moze i hardkod)

## Run dockerized

1. install docker desktop or just docker/docker compose

With docker desktop on: `docker compose up` add -d to run detached in background

If you want to manually build and run images:

`docker build -t eko-vel-api .`

`docker run -p 5001:5001 --env-file .env --restart unless-stopped --name  eko-vel-api  eko-vel-api`
add -d to run detached in background
