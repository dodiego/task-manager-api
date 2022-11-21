import Ajv, { JSONSchemaType } from "ajv";
import envSchema from "env-schema";
const configDefaults = {
  API_SECRET: "",
  API_PORT: 3000,
};
const schema: JSONSchemaType<typeof configDefaults> = {
  type: "object",
  properties: {
    API_PORT: {
      type: "integer",
      default: configDefaults.API_PORT,
    },
    API_SECRET: {
      type: "string",
      minLength: 10,
      maxLength: 512,
    },
  },
  required: ["API_SECRET"],
};
const config = envSchema({
  dotenv: true,
  schema,
  ajv: new Ajv({
    allErrors: true,
    removeAdditional: true,
    useDefaults: true,
  }),
});

export default config;
