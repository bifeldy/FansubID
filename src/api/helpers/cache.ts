import cache from 'memory-cache';

export function cachePut(key: string, value: any, time: number): void {
  cache.put(key, value, time);
}

export function cacheGet(key: string): any {
  return cache.get(key);
}
