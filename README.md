## Install Dependencies
**make sure your have pnpm installed**
```
pnpm install
```

## Create PostgreSQL Docker Container
```
pnpm docker:up
```

## Start Backend Server
```
pnpm start:dev
```

## Start Frontend Server
```
pnpm dev
```

## Shutdown PostgresDocker 
```
pnpm docker:down
```

## Database
Data is stored in a postgreSQL databse, created by docker-compose.yml. The container mounts the api/data folder serving as a persistent volume which also includes the credential. 

## ORM
Originally started with Prisma since it allows speedy development, but it doesn't seem scalable. So I decided to stick with the traditional TypeORM. In the future, depending on the growth of Drizzle, I might migrate to Drizzle instead.

## Backend
Project used NestJS since it works best with TypeORM. NestJS is one of the most popular backend framework. It works very well with pnpm and it supports TypeScript, effectively avoiding problems. The only issue is that it takes some effort to set up.

## Auth
Passport.js is by far the most popular and the best authentication library for small size application. It also integrates really well with NestJS. The project will be using passport-jwt strategy since it provides login session that is widely used in modern web apps.

## Client Side State Management
Originally used react-redux, but due to its complexity and persistent issue. I decided to migrate to Zustand.


# Learning Resources:

### NestJS
- https://docs.nestjs.com/
- https://docs.nestjs.com/security/cors

### Passport.js
- https://docs.nestjs.com/recipes/passport
- https://www.passportjs.org/concepts/oauth2/
- https://www.passportjs.org/packages/passport-jwt/


### PostgreSQL
- https://docs.nestjs.com/techniques/database#database

### TypeORM:
- https://orkhan.gitbook.io/typeorm/docs/entities#primary-columns
- https://orkhan.gitbook.io/typeorm/docs/entities#columns-with-generated-values
- https://docs.nestjs.com/techniques/database#typeorm-integration

### Vite:
- https://vitejs.dev/guide/
- https://vitejs.dev/guide/env-and-mode

### Docker: 
- https://docs.docker.com/compose/compose-application-model/

### Zustand: 
- https://docs.pmnd.rs/zustand/getting-started/introduction
