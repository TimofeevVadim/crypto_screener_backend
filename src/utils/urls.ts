import { urls, exchanges } from "./enums"

const pairsGetters = {
    binance: (pair) => pair.replace('/', '_'),
    bybit: (pair) => pair,
    gate: (pair) => pair.replace('/', '_'),
    huobi: (pair) => pair.toLowerCase().replace('/', '_'),
    kukoin: (pair) => pair.replace('/', '-'),
    mexc: (pair) => pair.replace("/", "_") + '?_from=search',
    okx: (pair) => '#',
    bitget: (pair) => pair.replace("/", "_") + '_SPBL?type=spot',
}


export const getUrl = (exchange, pair) => {
    switch (exchange) {
        case exchanges.binance:
            return urls.binance + pairsGetters.binance(pair)

        case exchanges.bybit:
            return urls.bybit + pairsGetters.bybit(pair)

        case exchanges.gate:
            return urls.gate + pairsGetters.gate(pair)

        case exchanges.huobi:
            return urls.huobi + pairsGetters.huobi(pair)

        case exchanges.kukoin:
            return urls.kukoin + pairsGetters.kukoin(pair)

        case exchanges.mexc:
            return urls.mexc + pairsGetters.mexc(pair)

        case exchanges.okx:
            return urls.okx + pairsGetters.okx(pair)

        case exchanges.bitget:
            return urls.bitget + pairsGetters.bitget(pair)

        default:
            return '#'    
    }
}

export default { getUrl }