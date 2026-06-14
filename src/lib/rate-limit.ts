export interface RateLimitConfig {
  interval: number;
  limit: number;
}

export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig,
): Promise<{ allowed: boolean; remaining: number }> {
  try {
    const { Redis } = await import("@upstash/redis");
    const { Ratelimit } = await import("@upstash/ratelimit");

    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_URL!,
      token: process.env.UPSTASH_REDIS_TOKEN!,
    });

    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(config.limit, `${config.interval} s`),
      analytics: true,
    });

    const result = await ratelimit.limit(identifier);
    return { allowed: result.success, remaining: result.remaining };
  } catch {
    // Fail open if Redis is down
    return { allowed: true, remaining: config.limit };
  }
}
