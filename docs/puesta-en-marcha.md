# Puesta en marcha (fase 0)

Pasos que hay que hacer a mano, una sola vez, con tus cuentas. En orden.

## 1. Dependencias y entorno local

1. Instala Node 22 si no lo tienes (`node -v`).
2. En la carpeta del proyecto: `npm install`.
3. Copia `.env.example` como `.env`.
4. Instala [Docker Desktop](https://www.docker.com/products/docker-desktop/) y arráncalo. Supabase local corre dentro de Docker.
5. `npm run db:start`. Al terminar muestra `API URL` y `anon key` (también llamada *publishable key*): cópialas en `.env` como `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY`.
6. `npm run dev` y abre http://localhost:4321. Debe verse la portada de Relevo con la etiqueta «local».

## 2. GitHub

1. Crea un repositorio **vacío** llamado `relevo` en tu cuenta personal (no en una organización: el plan gratuito de Vercel no puede conectarse a repositorios de organizaciones). Privado.
2. En la carpeta del proyecto:
   ```bash
   git remote add origin https://github.com/<tu-usuario>/relevo.git
   git push -u origin develop preproduccion produccion
   ```
3. En GitHub → Settings → General → Default branch: `develop`.

## 3. Supabase en la nube

El plan gratuito permite 2 proyectos activos, así que `develop` y `preproduccion` comparten uno.

1. Crea dos proyectos en [supabase.com](https://supabase.com), región **Central EU (Frankfurt)**:
   - `relevo-pruebas` (para `develop` y `preproduccion`)
   - `relevo-produccion`
2. Guarda de cada uno: la contraseña de la base de datos, el *Project ref* (Settings → General), la URL y las claves (Settings → API).
3. En tu cuenta de Supabase → Access Tokens, crea un token para GitHub Actions.
4. En GitHub → Settings → Environments, crea dos entornos:
   - `staging`: variable `SUPABASE_PROJECT_REF` (ref de `relevo-pruebas`) y secreto `SUPABASE_DB_PASSWORD`.
   - `production`: lo mismo con los datos de `relevo-produccion`.
5. En GitHub → Settings → Secrets and variables → Actions:
   - Secreto de repositorio `SUPABASE_ACCESS_TOKEN`.
   - Variable de repositorio `SUPABASE_MIGRATIONS_ENABLED` = `true` (activa el paso de migraciones del CI).

A partir de aquí, cada push a `develop` aplica las migraciones en `relevo-pruebas` y cada push a `produccion` las aplica en `relevo-produccion`.

## 4. Vercel

1. Add New → Project → importa el repositorio `relevo`. Vercel detecta Astro solo.
2. Settings → Git → **Production Branch**: `produccion`.
3. Settings → Environment Variables (en el plan gratuito, `develop` y `preproduccion` son despliegues *Preview*; cada variable se puede limitar a una rama):

   | Variable | Production | Preview · rama `preproduccion` | Preview · rama `develop` |
   | --- | --- | --- | --- |
   | `PUBLIC_APP_ENV` | `produccion` | `preproduccion` | `develop` |
   | `PUBLIC_SITE_URL` | URL de producción | URL de preproducción | URL de develop |
   | `PUBLIC_SUPABASE_URL` | de `relevo-produccion` | de `relevo-pruebas` | de `relevo-pruebas` |
   | `PUBLIC_SUPABASE_ANON_KEY` | de `relevo-produccion` | de `relevo-pruebas` | de `relevo-pruebas` |
   | `SUPABASE_SERVICE_ROLE_KEY` | de `relevo-produccion` | de `relevo-pruebas` | de `relevo-pruebas` |

4. Opcional: Settings → Domains para dar a cada rama una dirección fija (por ejemplo un subdominio de un dominio tuyo, asignado a la rama `preproduccion`).
5. Comprueba cada entorno en `/api/health`: debe devolver su `env` y su rama.

## 5. Google Cloud (preparación para la fase 3)

1. En [console.cloud.google.com](https://console.cloud.google.com) crea un proyecto `Relevo`.
2. APIs & Services → Library → activa **Google Calendar API**.
3. OAuth consent screen: tipo *External*, nombre de la app «Relevo», tu email de soporte.
4. Los clientes OAuth (uno por entorno) se crean en la fase 3, cuando existan las URLs de retorno.

## 6. Dominio

`relevo.app` está ocupado. A 28/09/2026 estaban libres `relevo.studio`, `relevo.cloud` y `userelevo.com`. No hace falta comprarlo aún: los entornos funcionan con las URLs `.vercel.app`.
