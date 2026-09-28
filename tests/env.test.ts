import { describe, expect, it } from 'vitest';
import { envBadge, parseAppEnv } from '../src/lib/env';

describe('parseAppEnv', () => {
  it('acepta los entornos conocidos', () => {
    expect(parseAppEnv('develop')).toBe('develop');
    expect(parseAppEnv('preproduccion')).toBe('preproduccion');
    expect(parseAppEnv('produccion')).toBe('produccion');
  });

  it('trata cualquier otro valor como local', () => {
    expect(parseAppEnv(undefined)).toBe('local');
    expect(parseAppEnv('production')).toBe('local');
  });
});

describe('envBadge', () => {
  it('no muestra etiqueta en producción', () => {
    expect(envBadge('produccion')).toBeNull();
    expect(envBadge('develop')).toBe('develop');
  });
});
