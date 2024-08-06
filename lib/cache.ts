// simple in-memory cache
export class Cache<T> {
  private store: Map<string, { value: T; expiry: number }>;
  private defaultTTL: number;

  constructor(ttl: number = 60000) {
    // default TTL: 1 minute
    this.store = new Map();
    this.defaultTTL = ttl;
  }

  set(key: string, value: T, ttl: number = this.defaultTTL): void {
    const expiry = Date.now() + ttl;
    this.store.set(key, { value, expiry });
  }

  get(key: string): T | undefined {
    const item = this.store.get(key);
    if (item && item.expiry > Date.now()) {
      return item.value;
    }
    this.store.delete(key);
    return undefined;
  }

  delete(key: string): void {
    this.store.delete(key);
  }
}

export const postCache = new Cache<any>(5 * 60 * 1000); // 5 minutes TTL
