interface RateLimitRecord {
  timestamps: number[];
}

const limiters = new Map<string, RateLimitRecord>();

/**
 * Checks if a key (e.g. IP + action) has exceeded the request limit in a window of time.
 * @param key Unique identifier (e.g., client IP + action name)
 * @param limit Maximum allowed requests in the window
 * @param windowMs Time window in milliseconds
 * @returns boolean True if the request is rate limited, false otherwise
 */
export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  if (!limiters.has(key)) {
    limiters.set(key, { timestamps: [now] });
    return false;
  }

  const record = limiters.get(key)!;
  // Clean up old timestamps outside the window
  record.timestamps = record.timestamps.filter(t => now - t < windowMs);

  if (record.timestamps.length >= limit) {
    return true;
  }

  record.timestamps.push(now);
  return false;
}
