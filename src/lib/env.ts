export const APP_ENVS = ['local', 'develop', 'preproduccion', 'produccion'] as const;
export type AppEnv = (typeof APP_ENVS)[number];

/** Normaliza el entorno; cualquier valor desconocido se trata como local. */
export function parseAppEnv(value: string | undefined): AppEnv {
  return (APP_ENVS as readonly string[]).includes(value ?? '') ? (value as AppEnv) : 'local';
}

export const appEnv: AppEnv = parseAppEnv(import.meta.env.PUBLIC_APP_ENV);

/** Etiqueta visible fuera de producción, para no confundir entornos. */
export function envBadge(env: AppEnv): string | null {
  return env === 'produccion' ? null : env;
}
