# Relevo

Plataforma web donde los clientes de un estudio ven qué fechas están libres y acuerdan cambios de fecha entre ellos, de forma anónima. El estudio solo aprueba el resultado, y su Google Calendar se sincroniza en los dos sentidos.

## Stack

| Pieza | Tecnología |
| --- | --- |
| Web | Astro en modo servidor + islas React, TypeScript |
| Base de datos y login | Supabase (PostgreSQL con RLS, enlaces mágicos), región UE |
| Alojamiento | Vercel, funciones en `fra1` (Fráncfort) |
| Calendario | Google Calendar API (fase 3) |
| Emails | Resend (fase 5) |
| Tests | Vitest; pgTAP para RLS (fase 1) |

## Estructura

```
src/
  layouts/        Plantilla base (tipografías, tokens, etiqueta de entorno)
  lib/            Utilidades: entorno, cliente de Supabase
  pages/          Páginas y rutas API (src/pages/api/*)
  styles/         Tokens de diseño (colores del lienzo)
supabase/
  config.toml     Configuración de Supabase local
  migrations/     Esquema de la base de datos, en SQL
  seed.sql        Datos ficticios para desarrollo
  tests/          Tests de base de datos (pgTAP)
tests/            Tests de la app (Vitest)
docs/             Guías del proyecto
.github/workflows CI: comprobaciones, tests, build y migraciones
```

## Arrancar en local

Requisitos: Node 22 y, para la base de datos local, Docker Desktop.

```bash
npm install
cp .env.example .env        # en Windows: copy .env.example .env
npm run db:start            # arranca Supabase local y muestra las claves
npm run dev                 # http://localhost:4321
```

Comandos útiles:

| Comando | Qué hace |
| --- | --- |
| `npm run check` | Comprueba tipos de Astro y TypeScript |
| `npm test` | Ejecuta los tests |
| `npm run build` | Compila como en Vercel |
| `npm run db:reset` | Recrea la base local con migraciones y datos ficticios |
| `npm run db:types` | Genera los tipos TypeScript desde el esquema |

## Ramas y entornos

| Rama | Entorno | Base de datos |
| --- | --- | --- |
| `develop` | Desarrollo (preview de Vercel) | Supabase de pruebas |
| `preproduccion` | Preproducción (preview de Vercel) | Supabase de pruebas |
| `produccion` | Producción | Supabase de producción |

Flujo: se trabaja en `develop` → merge a `preproduccion` para probar → merge a `produccion` para publicar.

`/api/health` devuelve el entorno, la rama y el commit desplegados.

La puesta en marcha de GitHub, Vercel, Supabase y Google está en [docs/puesta-en-marcha.md](docs/puesta-en-marcha.md).
