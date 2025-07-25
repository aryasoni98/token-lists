import { mapSupportedNetworks, SupportedChainId } from '@cowprotocol/cow-sdk'
import { fetchAndProcessCoingeckoTokens } from './coingecko'
import { fetchAndProcessUniswapTokens } from './uniswap'
import { getCoingeckoTokenIdsMap, OverridesPerChain, removeOldLogs } from './utils'

const OVERRIDES: OverridesPerChain = mapSupportedNetworks(() => ({}))
OVERRIDES[SupportedChainId.BASE]['0x18dd5b087bca9920562aff7a0199b96b9230438b'] = { decimals: 8 } // incorrect decimals set on CoinGecko's list
OVERRIDES[SupportedChainId.BASE]['0xe231db5f348d709239ef1741ea30961b3b635a61'] = { decimals: 18 } // incorrect decimals set on CoinGecko's list
OVERRIDES[SupportedChainId.GNOSIS_CHAIN]['0xe91d153e0b41518a2ce8dd3d7944fa863463a97d'] = {
  symbol: 'wxDAI',
  name: 'Wrapped xDAI',
} // incorrect symbol and name set on CoinGecko's list
OVERRIDES[SupportedChainId.POLYGON]['0x0000000000000000000000000000000000001010'] = null // POL native token address

async function main(): Promise<void> {
  const COINGECKO_IDS_MAP = await getCoingeckoTokenIdsMap()

  removeOldLogs('coingecko-tokens')
  removeOldLogs('uniswap-tokens')

  fetchAndProcessCoingeckoTokens(COINGECKO_IDS_MAP, OVERRIDES)
  fetchAndProcessUniswapTokens(COINGECKO_IDS_MAP, OVERRIDES)
}

main()
