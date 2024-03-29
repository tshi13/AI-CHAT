## Install dependencies
**make sure your have pnpm installed**
```
pnpm install
```

## Test
```
pnpm dev
```

## To start Python server
Go to server directory and run python3 app.py


## Database set up (in case you are curious)
1. Create an .env file to store important environment variables.
2. Create a docker-compose.yml file to configure the database.
3. Create schema.prisma and configure the database schema. 
4. Run `pnpm dlx prisma migrate dev` to create the SQL script in the api/migrations folder, and execute the script. To avoid execution, use `pnpm dlx prisma migrate dev --create-only`.
>:warning: If you ever encounter problem **"the provided database credentials for ... are not valid"**, you probably have to empty the api/data file and rerun `pnpm docker:up`.

## Database
Data is stored in a postgreSQL databse, created by docker-compose.yml. The container mounts the api/data folder serving as a persistent volume which also includes the credential. 

## ORM
I use Prisma ORM to connect to the database. Prisma is a popular lightweight typesafe ORM and it is relatively straightforward and fast compared to other options like TypeORM and Sequelize.

## Backend
Project will be using NestJS due to compatibility with Prisma. NestJS is one of the most popular backend framework. It works very well with pnpm and it supports TypeScript, effectively avoiding problems. The only problem is that it takes some effort to set up.