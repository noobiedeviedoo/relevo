import type { APIRoute } from 'astro';
import { appEnv } from '@/lib/env';

/** Comprobación rápida de que cada entorno está desplegado y con qué versión. */
export const GET: APIRoute = () => {
  return Response.json(
    {
      status: 'ok',
      env: appEnv,
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'local',
      branch: process.env.VERCEL_GIT_COMMIT_REF ?? 'local',
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
};
