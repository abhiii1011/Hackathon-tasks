// Simple in-memory cache with TTL
class Cache {
  constructor() {
    this.store = new Map();
  }
  _now() { return Date.now(); }
  set(key, value, ttlMs) {
    this.store.set(key, { value, expires: this._now() + ttlMs });
  }
  get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (entry.expires < this._now()) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }
  makeKey(prefix, obj) {
    return prefix + ':' + Object.keys(obj).sort().map(k => `${k}=${obj[k]}`).join('&');
  }
}

module.exports = new Cache();
