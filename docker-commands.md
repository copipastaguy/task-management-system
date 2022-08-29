commands:
dockerfile
`docker build -t tms-backend .` build image
`docker run -p 4000:4000 --rm --name backend-container tms-backend` run and name container with image

`docker-compose up --build` check for image changes and run build again

docker-compose
|command | description |
|---------------------- |------------|
|`docker-compose up -d` | run and build services in docker-compose|
|`docker exec -it mysql-container mysql -p`| exec interactive mysql terminal|
|`use nodelogin` `show tables`| use database and show tables of db|
|`docker exec mysql-container /usr/bin/mysqldump -u root --password= nodelogin > file.sql` | dump mysql schema into a file|

If Invoke-WebRequest error:
`Remove-Item alias:curl`

Create non root user for Docker container

`RUN addgroup -S nonroot && adduser -S default -G nonroot`
START DOCKER AS THIS USER

`USER default`

Why?

- Prevents security vulnerabilities
- Different permissions compared to root user
- addgroup && adduser

mySQL container
`docker exec -it mysql-container mysql -u default -p`

Why?

- create new user in mysql db
- GRANT permissions: INSERT FILE SELECT
- start mysql as non root

non root user:
default
default123

check user
docker exec -it <container name> sh
whoami

TRANSFER FILE VIA AIRGAP SITUATION
MD5 checksum
`docker save -o backend.tar tms-backed:latest` save image as tar file
`Get-FileHash backend.tar -Algorithm MD5 | Format-List` get hash of tar file

Load tar file in docker image
`docker load -i tms-backend`

INCLUDE ENV VARIABLES IN DOCKER RUN CMD
`docker run -p 4000:4000 --rm --env-file ../.env --name backend-container tms-backend`
