import fs from "fs";
import path from "path";
import { pool } from "./pool";

async function main() {
    const dir = path.resolve(__dirname, "../../migrations");
    await pool.query(`CREATE TABLE IF NOT EXISTS public.schema_migrations (
    name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`);
    const done = new Set(
        (await pool.query("SELECT name FROM public.schema_migrations")).rows.map((r) => r.name),
    );
    for (const file of fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".sql"))
        .sort()) {
        if (done.has(file)) continue;
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            await client.query(fs.readFileSync(path.join(dir, file), "utf8"));
            await client.query("INSERT INTO public.schema_migrations(name) VALUES ($1)", [file]);
            await client.query("COMMIT");
            console.log(`migration appliquée : ${file}`);
        } catch (e) {
            await client.query("ROLLBACK");
            throw e;
        } finally {
            client.release();
        }
    }
    await pool.end();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
