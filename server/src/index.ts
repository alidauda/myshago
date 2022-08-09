import "reflect-metadata";
import { MikroORM } from '@mikro-orm/core';

import microConfig from './mikro-orm.config';
import {ApolloServer} from 'apollo-server-express';
import express from "express"
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'; 
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";


const main = async () => {
  const orm = await MikroORM.init(microConfig);
  
  orm.getMigrator().up;
  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();
  const app = express();
  const redis = new Redis();
  let RedisStore = connectRedis(session);

  app.use(
    session({
      name: "asa",
      store: new RedisStore({ client: redis, disableTouch: true }),
      saveUninitialized: false,
      secret: "asfcdfcxd",
      resave: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure:process.env.NODE_ENV === "production" ,
      },
    })
  );
  const schema = await buildSchema({
    resolvers: [HelloResolver,UserResolver],
    validate:false
  });
  const server = new ApolloServer({
    schema,
    
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground()],
    context:({req, res})=>({em:orm.em,req:req,res:res})
  });
  await server.start();
  server.applyMiddleware({ app});
  app.listen(4000, () => {
    console.log("toh fh");
  });
};
  
main().catch((e) => console.error(e));
