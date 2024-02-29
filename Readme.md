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

//TODO separate by domains( folders ), add relations

1. izmeniti login da cuva sve info o useru u token
2. namestiti token expiry itd
3. namestiti middleware za verify tokena > cuvanje korisnika na req > hasRights na osnovu role iz
   baze ( moze i hardkod)
