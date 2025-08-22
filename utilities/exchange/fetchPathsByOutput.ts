import { api } from "@/context/UserContext";
import { SimpleToken } from "@/tokenPayLib/types/token.types";
import { Chain } from "thirdweb/chains";
import { Pool } from "@/tokenPayLib/types/payload-types";
import QueryString from "qs";

/**
  * Fetch available swap/exchange pools for a given origin token and chain.
  *
  * This function queries the backend `/api/pool` endpoint using a structured query
  * and returns the list of matching `Pool` objects.
  *
  * @param originToken Token to use as the input token when searching pools
  * @param activeChain Chain on which to search pools
  * @param options Optional controls
  *  - `limit` Max number of pools to fetch (default 200)
  *  - `signal` Optional AbortSignal to cancel the request
  *  - `cacheTtlMs` Cache TTL in milliseconds (default 15000)
  * @returns Promise that resolves to an array of `Pool` entries (empty on error)
  */

type FetchPathsOptions = {
  limit?: number;
  signal?: AbortSignal;
  cacheTtlMs?: number;
};

type CacheEntry = { expiresAt: number; data: Pool[] };

const pathsCache = new Map<string, CacheEntry>();

function buildCacheKey(originToken: SimpleToken, activeChain: Chain, limit: number): string {
  const tokenId = originToken?.id?.toString().toUpperCase() ?? "";
  const chainId = activeChain?.id?.toString() ?? "";
  return `${chainId}:${tokenId}:${limit}`;
}

export async function fetchPathsByOutput(
  targetToken: SimpleToken,
  activeChain: Chain,
  options: FetchPathsOptions = {}
): Promise<Pool[]> {
  try {
    if (!targetToken?.id || !activeChain?.id) {
      console.warn("fetchPaths: missing targetToken.id or activeChain.id");
      return [];
    }

    const limit = options.limit ?? 200;
    const cacheTtlMs = options.cacheTtlMs ?? 15000;
    const cacheKey = buildCacheKey(targetToken, activeChain, limit);

    const cached = pathsCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }

    const query = {
      where: {
        and: [
          {
            outputToken: {
              equals: targetToken.id.toUpperCase(),
            },
          },
          {
            chain: {
              equals: activeChain.id.toString(),
            },
          },
        ],
      },
      limit,
    };

    const stringifiedQuery = QueryString.stringify(query, {
      addQueryPrefix: true,
    });

    const pathsRes = await api.get(`/api/pool/${stringifiedQuery}` as const, {
      signal: options.signal,
    });

    const newPools: Pool[] = Array.isArray(pathsRes?.data?.docs)
      ? (pathsRes.data.docs as Pool[])
      : [];

    pathsCache.set(cacheKey, {
      data: newPools,
      expiresAt: Date.now() + cacheTtlMs,
    });

    return newPools;
  } catch (e: any) {
    // Gracefully handle cancellation and unexpected errors
    const isCanceled = e?.code === "ERR_CANCELED" || e?.name === "CanceledError";
    if (!isCanceled) {
      console.error("fetchPaths: error while fetching pools", e?.message || e, e);
    }
    return [];
  }
}
