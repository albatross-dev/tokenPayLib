import { SimpleToken } from "@/tokenPayLib/types/token.types";
import { TokensByChainId, chainTypesIds } from "../crypto/currencies";
import { polygon, Chain } from "thirdweb/chains";
import { fetchPathsByOutput } from "./fetchPathsByOutput";

/**
 * Processes target tokens for a given origin token by:
 * 1. Fetching available swap paths from the backend
 * 2. Converting paths into a map of output tokens
 * 3. Updating the UI state with available target tokens
 */
export async function processTargetTokens(
  token: SimpleToken,
  chain?: Chain
): Promise<{
  tokens: Record<string, SimpleToken>;
  paths: any[];
}> {
  if (!token?.id) return { tokens: {}, paths: [] };

  const activeChain: Chain = chain || polygon;

  const paths = await fetchPathsByOutput(token, activeChain);

  const chainId = activeChain.id as unknown as chainTypesIds;

  console.log("paths",paths);

  const entries: Array<[string, SimpleToken]> = [];
  for (const path of paths) {
    const symbol = path?.inputToken;
    if (!symbol) continue;
    const tokenMeta: SimpleToken | undefined =
      TokensByChainId[chainId]?.[symbol];
    if (tokenMeta) {
      entries.push([symbol, tokenMeta]);
    }
  }

  return {
    tokens: Object.fromEntries(entries),
    paths: paths,
  };
}
