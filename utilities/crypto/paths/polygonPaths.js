import currencies, {
  currenciesArbitrum,
  currenciesAvax,
  currenciesBase,
  currenciesBSC,
  currenciesEthereum,
  currenciesOP,
} from "@/tokenPayLib/utilities/crypto/currencies";


export const oldPolygonPaths = {
  USDC: {
    EUROE: [      ["address", "uint24", "address"],
      [
        currencies["USDC"].contractAddress,
        500, // Pool fee
        currencies["EUROE"].contractAddress,
      ]],
    WBTC: [      ["address", "uint24", "address", "uint24", "address"],
      [
        currencies["USDC"].contractAddress,
        500, // Pool fee
        currencies["WETH"].contractAddress,
        500, // Pool fee
        currencies["WBTC"].contractAddress,
      ]],
    WETH: [      ["address", "uint24", "address"],
      [
        currencies["USDC"].contractAddress,
        500, // Pool fee
        currencies["WETH"].contractAddress,
      ]],
  },
  WBTC: {
    USDC: [      ["address", "uint24", "address", "uint24", "address"],
      [
        currencies["WBTC"].contractAddress,
        500, // Pool fee
        currencies["WETH"].contractAddress,
        500, // Pool fee
        currencies["USDC"].contractAddress,
      ]],
  },
  WETH: {
    USDC: [      ["address", "uint24", "address"],
      [
        currencies["WETH"].contractAddress,
        500, // Pool fee
        currencies["USDC"].contractAddress,
      ]],
  },
  "USDC.E": {
    EUROE: [      ["address", "uint24", "address", "uint24", "address"],
      [
        currencies["USDC.E"].contractAddress,
        100, // Pool fee
        currencies["USDC"].contractAddress,
        500, // Pool fee
        currencies["EUROE"].contractAddress,
      ]],
    USDC: [      ["address", "uint24", "address"],
      [
        currencies["USDC.E"].contractAddress,
        100, // Pool fee
        currencies["USDC"].contractAddress,
      ]],
  },
  USDT: {
    EUROE: [      ["address", "uint24", "address", "uint24", "address"],
      [
        currencies["USDT"].contractAddress,
        100, // Pool fee
        currencies["USDC"].contractAddress,
        500, // Pool fee
        currencies["EUROE"].contractAddress,
      ]],
    USDC: [      ["address", "uint24", "address"],
      [
        currencies["USDT"].contractAddress,
        100, // Pool fee
        currencies["USDC"].contractAddress,
      ]],
  },
  EURS: {
    EUROE: [      ["address", "uint24", "address", "uint24", "address"],
      [
        currencies["EURS"].contractAddress,
        3000, // Pool fee
        currencies["USDC"].contractAddress,
        500, // Pool fee
        currencies["EUROE"].contractAddress,
      ]],
    USDC: [      ["address", "uint24", "address"],
      [
        currencies["EURS"].contractAddress,
        3000, // Pool fee
        currencies["USDC"].contractAddress,
      ]],
  },
  EUROE: {
    USDC: [      ["address", "uint24", "address"],
      [
        currencies["EUROE"].contractAddress,
        500, // Pool fee
        currencies["USDC"].contractAddress,
      ]]
  }
}

const polygonPaths = {"WMATIC": {
"1INCH": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"SUSHI": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"LINK": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDC.E": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"FET": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"MaticX": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"WETH": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"STG": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"BAL": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"DIMO": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"ANKR": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GNS": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"APE": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"USDT": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"BONSAI": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"UNI": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"MKR": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"AAVE": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"AVAX": [ ["address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"RAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
},
"USDT": {
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"USDC": [ ["address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"USDC.E": [ ["address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"DAI": [ ["address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"WBTC": [ ["address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"LINK": [ ["address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"EURe": [ ["address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"PAXG": [ ["address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"UNI": [ ["address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"USDT": [ ["address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
"XSGD": [ ["address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"MANA": [ ["address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"LDO": [ ["address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SOL": [ ["address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"EUROE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
},
"USDC.E": {
"RAI": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"jEUR": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"AGIX": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"miMATIC": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"XSGD": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"LINK": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDT": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"DAI": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"JPYC": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"COMP": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"PolyDoge": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"GNS": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"agEUR": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"UNI": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"EURS": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"AAVE": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"SAND": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"PAXG": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"USDC": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"CRV": [ ["address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"SUSHI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
},
"WETH": {
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x151bc927da94a5193a1d90c2e8115274f02455a8",
500,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"SUSHI": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"PAXG": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"ELON": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"COMP": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"AAVE": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MANA": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"UNI": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"CRV": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"LINK": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"CRO": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"RAI": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"WBTC": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"BAL": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"SNX": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"GHST": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"wstETH": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"GRT": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"LDO": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"FET": [ ["address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"EUROE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
},
"USDC": {
"LINK": [ ["address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"USDT": [ ["address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"EUROE": [ ["address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
]
],
"XSGD": [ ["address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"PAXG": [ ["address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"WBTC": [ ["address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"UNI": [ ["address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"GNS": [ ["address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"SAND": [ ["address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"SOL": [ ["address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"AAVE": [ ["address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"USDC.E": [ ["address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"LDO": [ ["address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"DAI": [ ["address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SUSHI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"RAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x57f5e098cad7a3d1eed53991d4d66c45c9af7812",
500,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
},
"DAI": {
"USDT": [ ["address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"USDC.E": [ ["address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"miMATIC": [ ["address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"USDC": [ ["address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"WMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"EUROE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
]
],
},
"WBTC": {
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0000000000000000000000000000000000001010",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x1236ea13c7339287cd00ab196aaa8217006b04dc",
500,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"UNI": [ ["address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"miMATIC": [ ["address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"USDC": [ ["address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"USDT": [ ["address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"WETH": [ ["address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"agEUR": [ ["address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"RAI": [ ["address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x151bc927da94a5193a1d90c2e8115274f02455a8",
500,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"PAXG": [ ["address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"XSGD": [ ["address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SUSHI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
},
"UNI": {
"LINK": [ ["address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"WBTC": [ ["address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"WETH": [ ["address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"USDC": [ ["address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"USDC.E": [ ["address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"USDT": [ ["address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"AAVE": [ ["address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"EUROE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
},
"LINK": {
"USDC": [ ["address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"UNI": [ ["address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"USDC.E": [ ["address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"USDT": [ ["address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"WETH": [ ["address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"GRT": [ ["address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"EUROE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
"SUSHI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"RAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
},
"MATIC": {
},
"SHIB": {
"WMATIC": [ ["address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"SUSHI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"RAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
10000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
10000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
},
"AAVE": {
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
500,
"0x1236ea13c7339287cd00ab196aaa8217006b04dc",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"WETH": [ ["address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"USDC.E": [ ["address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"UNI": [ ["address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"USDC": [ ["address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"EUROE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
]
],
},
"CRV": {
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"WETH": [ ["address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"USDC.E": [ ["address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
10000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SUSHI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"RAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x172370d5cd63279efa6d502dab29171933a610af",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
},
"1INCH": {
"WMATIC": [ ["address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
},
"SUSHI": {
"WETH": [ ["address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"RAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
},
"BONSAI": {
"WMATIC": [ ["address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
10000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
10000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
},
"RNDR": {
"WMATIC": [ ["address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
"SUSHI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"RAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
"EUROE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x61299774020da444af134c82fa83e3810b309991",
10000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
]
],
},
"SOL": {
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
500,
"0x151bc927da94a5193a1d90c2e8115274f02455a8",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDC": [ ["address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
500,
"0x151bc927da94a5193a1d90c2e8115274f02455a8",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"USDT": [ ["address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x8a16d4bf8a0a716017e8d2262c4ac32927797a2f",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x8a16d4bf8a0a716017e8d2262c4ac32927797a2f",
3000,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"EUROE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
},
"LDO": {
"USDC.E": [ ["address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"USDC": [ ["address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"WETH": [ ["address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDT": [ ["address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"EUROE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
]
],
},
"SAND": {
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"USDC": [ ["address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"USDC.E": [ ["address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x8a16d4bf8a0a716017e8d2262c4ac32927797a2f",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"EUROE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
},
"stMATIC": {
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
10000,
"0x5dd175a4242afe19e5c1051d8cd13fc8979f2329",
10000,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
},
"wstETH": {
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"WETH": [ ["address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
10000,
"0x5dd175a4242afe19e5c1051d8cd13fc8979f2329",
10000,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"RAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
500,
"0x57f5e098cad7a3d1eed53991d4d66c45c9af7812",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"SUSHI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
},
"miMATIC": {
"USDC.E": [ ["address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WBTC": [ ["address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"DAI": [ ["address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"FRAX": [ ["address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
},
"MANA": {
"WETH": [ ["address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"USDT": [ ["address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x8a16d4bf8a0a716017e8d2262c4ac32927797a2f",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x8a16d4bf8a0a716017e8d2262c4ac32927797a2f",
3000,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
},
"PolyDoge": {
"USDC.E": [ ["address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
},
"ELON": {
"WETH": [ ["address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
},
"PAXG": {
"WETH": [ ["address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"USDC": [ ["address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"WMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"USDT": [ ["address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"USDC.E": [ ["address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WBTC": [ ["address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"SUSHI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"RAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"EUROE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
10000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x553d3d295e0f695b9228246232edf400ed3560b5",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
},
"MKR": {
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
3000,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"SUSHI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"RAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
},
"agEUR": {
"USDC.E": [ ["address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"EURe": [ ["address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"WBTC": [ ["address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
3000,
"0x8a16d4bf8a0a716017e8d2262c4ac32927797a2f",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
3000,
"0x8a16d4bf8a0a716017e8d2262c4ac32927797a2f",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
},
"GNS": {
"USDC.E": [ ["address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"USDC": [ ["address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"EUROE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe5417af564e4bfda1c483642db72007871397896",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
]
],
},
"EURS": {
"USDC.E": [ ["address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"EUROE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe111178a87a3bff0c8d18decba5798827539ae99",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
]
],
},
"FRAX": {
"USDC.E": [ ["address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"miMATIC": [ ["address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
500,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
},
"SNX": {
"WMATIC": [ ["address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WETH": [ ["address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"SUSHI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"RAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
},
"GRT": {
"WMATIC": [ ["address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"LINK": [ ["address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"WETH": [ ["address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
10000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
10000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
"SUSHI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"RAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
},
"JPYC": {
"USDC.E": [ ["address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"EUROE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
3000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
]
],
},
"USDT": {
"USDT": [ ["address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
10000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"WMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
10000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
10000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
10000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
10000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
},
"UST": {
},
"BUSD": {
"USDC.E": [ ["address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
},
"BAL": {
"WMATIC": [ ["address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"WETH": [ ["address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
},
"QUICK": {
},
"AGIX": {
"USDC.E": [ ["address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"FET": [ ["address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"RAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x190eb8a183d22a4bdf278c6791b152228857c033",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
},
"UST": {
},
"COMP": {
"WETH": [ ["address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"USDC.E": [ ["address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
},
"AMP": {
},
"EURe": {
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"USDT": [ ["address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
3000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"agEUR": [ ["address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"WMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
10000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
10000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
10000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
10000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"RAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
},
"GHST": {
"WETH": [ ["address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"SUSHI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"WMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"RAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
},
"RAI": {
"USDC.E": [ ["address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WETH": [ ["address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"WBTC": [ ["address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"WMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
100,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"SUSHI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
},
"APE": {
"WMATIC": [ ["address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
},
"CRO": {
"WETH": [ ["address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
},
"DIMO": {
"WMATIC": [ ["address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
10000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
10000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"EUROE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
10000,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xe261d618a959afffd53168cd07d12e37b26761db",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
},
"MaticX": {
"WMATIC": [ ["address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
500,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
},
"ANKR": {
"WMATIC": [ ["address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"SUSHI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"RAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
},
"FET": {
"WMATIC": [ ["address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"AGIX": [ ["address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"WETH": [ ["address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"SUSHI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a",
]
],
"RAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x00e5646f60ac6fb446f621d146b6e1886f002905",
]
],
"wstETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x7583feddbcefa813dc18259940f76a02710a8905",
10000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
100,
"0x03b54a6e9a984069379fae1a4fc4dbae93b3bccd",
]
],
},
"jEUR": {
"USDC.E": [ ["address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
3000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
},
"XSGD": {
"USDC.E": [ ["address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"USDC": [ ["address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"USDT": [ ["address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"WBTC": [ ["address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
3000,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
100,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"EUROE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
3000,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
},
"PYR": {
"USDC.E": [ ["address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"WMATIC": [ ["address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x430ef9263e76dae63c84292c3409d61c598e9682",
10000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
},
"STG": {
"WMATIC": [ ["address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"AVAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
"EURe": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
10000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
500,
"0x18ec0a6e18e5bc3784fdd3a3634b31245ab704f6",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
10000,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
100,
"0x9417669fbf23357d2774e9d421307bd5ea1006d2",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
},
"AVAX": {
"WMATIC": [ ["address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"jEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x4e3decbb3645551b8a19f0ea1678079fcb33fb4c",
]
],
"miMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa3fa99a148fa48d14ed51d610c367c61876997f1",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"stMATIC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"COMP": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c",
]
],
"PolyDoge": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
]
],
"PYR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x430ef9263e76dae63c84292c3409d61c598e9682",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"agEUR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
100,
"0xe0b52e49357fd4daf2c15e02058dce6bc0057db4",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
"SNX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x50b728d8d964fd00c2d0aad81718b71311fef68a",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"BUSD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
10000,
"0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"MKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f7c932e7684666c9fd1d44527765433e01ff61d",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"MaticX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0xfa68fb4628dff1028cfec22b4162fccd0d45efb6",
]
],
"FRAX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
500,
"0x45c32fa6df82ead1e2ef74d17b76547eddfaff89",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
10000,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"USDC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"MANA": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xa1c57f48f0deb89f569dfbe6e2b7f46d33606fd4",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"STG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590",
]
],
"1INCH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x9c2c5fd7b07e95ee044ddeba0e97a665f142394f",
]
],
"USDC.E": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
100,
"0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
]
],
"FET": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x7583feddbcefa813dc18259940f76a02710a8905",
]
],
"AGIX": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x190eb8a183d22a4bdf278c6791b152228857c033",
]
],
"BAL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
]
],
"GRT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x5fe2b58c013d7601147dcdd68c143a77499f5531",
]
],
"SHIB": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x6f8a06447ff6fcf75d803135a7de15ce88c1d4ec",
]
],
"ANKR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x101a023270368c0d50bffb62780f4afd4ea79c35",
]
],
"CRV": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x172370d5cd63279efa6d502dab29171933a610af",
]
],
"WBTC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
500,
"0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
]
],
"GHST": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7",
]
],
"APE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xb7b31a6bc18e48888545ce79e83e06003be70930",
]
],
"CRO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xada58df0f643d959c2a47c9d4d4c1a4defe3f11c",
]
],
"BONSAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
3000,
"0x3d2bd0e15829aa5c362a4144fdf4a1112fa29b5c",
]
],
"ELON": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b",
3000,
"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
10000,
"0xe0339c80ffde91f3e20494df88d4206d86024cdf",
]
],
},
"EUROE": {
"USDC": [ ["address", "uint24", "address"],
[
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
]
],
"LINK": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39",
]
],
"WETH": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
]
],
"USDT": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
]
],
"XSGD": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xdc3326e71d45186f113a2f448984ca0e8d201995",
]
],
"PAXG": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0x553d3d295e0f695b9228246232edf400ed3560b5",
]
],
"JPYC": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0x431d5dff03120afa4bdf332c61a6e1766ef37bdb",
]
],
"UNI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xb33eaad8d922b1083446dc23f610c2567fb5180f",
]
],
"GNS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
500,
"0xe5417af564e4bfda1c483642db72007871397896",
]
],
"SAND": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xbbba073c31bf03b8acf7c28ef0738decf3695683",
]
],
"SOL": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xd93f7e271cb87c23aaa73edc008a79646d1f9912",
]
],
"DIMO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
10000,
"0xe261d618a959afffd53168cd07d12e37b26761db",
]
],
"AAVE": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xd6df932a45c0f255f85145f286ea0b292b21c90b",
]
],
"LDO": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xc3c7d422809852031b44ab29eec9f1eff2a58756",
]
],
"EURS": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
3000,
"0xe111178a87a3bff0c8d18decba5798827539ae99",
]
],
"DAI": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
100,
"0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
]
],
"RNDR": [ ["address", "uint24", "address", "uint24", "address"],
[
"0x820802fa8a99901f52e39acd21177b0be6ee2974",
500,
"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
10000,
"0x61299774020da444af134c82fa83e3810b309991",
]
],
},

};

export default polygonPaths