import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schema";

export default defineConfig({
  name: "default",
  title: "La Cava CMS",
  projectId: "2vb3njwv",
  dataset: "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});