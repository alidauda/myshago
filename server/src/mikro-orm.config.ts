import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

export default{
    entities: [Post,User],
    dbName: 'myshago',
    type: 'postgresql',
    user:'postgres',
    password:'my_postgres_password',
    debug: process.env.NODE_ENV !== 'production',
    allowGlobalContext:true,
    migrations: {
       
        path:  path.join(__dirname, './migrations',) , // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
       
      },
  } as Parameters<typeof MikroORM.init>[0];