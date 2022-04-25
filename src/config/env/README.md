# Environment

## `.env` files

```ts
const envFile =
  process.env.NODE_ENV === 'development'
    ? './development.env'
    : './production.env';
```

## Nest JS

```env
PORT=
```

## TypeORM

```env
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=P@ssw0rd
DATABASE_DBNAME=nest_public
DATABASE_SYNC=false
```
