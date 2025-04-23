import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_NYp8BS4hLtby@ep-late-dream-a1sm1t91-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  },
});
