# Architecture

Monolithe modulaire Express/TypeScript, une seule base PostgreSQL, un schéma par module.

Modules : `auth`, `sync`, `billing`, `duo`, `notifications` (dans `src/modules`).

Par module :

- `*.routes.ts` : HTTP, validation (zod), appelle le service
- `*.service.ts` : logique métier, API publique du module
- `*.repository.ts` : seul fichier contenant du SQL
- `*.schemas.ts` : schémas zod

Règle : un module n'interroge jamais les tables d'un autre, il appelle son service.

## Démarrage

```bash
cp .env.example .env
npm install
npm run migrate:dev
npm run dev
```
