import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/graphql/schema/**/*.graphql",
  generates: {
    "src/graphql/generated/graphql-types.ts": {
      config: {
        contextType: "graphql/context#GraphQlContext",
      },
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-document-nodes",
      ],
    },
  },
};

export default config;
