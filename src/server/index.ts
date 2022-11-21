import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import config from "shared/config";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";
import resolvers from "graphql/resolvers";
import { GraphQlContext } from "graphql/context";
import { logInfo } from "shared/logger";
const typeDefs = loadFilesSync(
  path.join(__dirname, "../graphql/schema/**/*.graphql"),
  {
    extensions: ["graphql"],
  }
);

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<GraphQlContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

export async function startServer(): Promise<void> {
  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        userToken: req.headers.authorization,
      }),
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: config.API_PORT }, resolve)
  );
  logInfo(
    `GraphQL Server Listening at http://localhost:${config.API_PORT}/graphql`
  );
}
