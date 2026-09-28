# Relevo · notas para Claude

- Producto: disponibilidad y negociación anónima de cambios de fecha entre clientes de un estudio. Todo el texto de la interfaz, en español.
- Stack: Astro (`output: 'server'`) + islas React + TypeScript, Supabase (PostgreSQL, RLS, Auth por enlace mágico), Vercel (`fra1`), Google Calendar API, Resend.
- La lógica de negocio vive en PostgreSQL (funciones SQL + políticas RLS). La web es una capa fina: nunca hacer `update` directo de estados de propuestas desde el cliente.
- Privacidad: los clientes nunca leen nombres, emails ni teléfonos; solo alias por reserva y circunstancias. Cada tabla lleva `studio_id`. Fechas en UTC.
- Esquema: solo mediante migraciones en `supabase/migrations`. Tras cambiar el esquema, `npm run db:types`.
- Antes de dar algo por terminado: `npm run check`, `npm test` y `npm run build`.
- Ramas: `develop` → `preproduccion` → `produccion`. Tras terminar cambios en `develop`, recordar al usuario que haga merge a `preproduccion` y `produccion` para llevarlos a esos entornos.
- Al usuario le gusta que se explique el significado de siglas y tecnicismos.
