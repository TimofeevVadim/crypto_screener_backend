import { getUrl } from "./urls";

export const onFilterCurrencyPairs = ({ tickers }) => {
    const filteredTickers = {}
    tickers.forEach(ticker => {
        if(ticker.symbol.includes('/USDT')) {
            const pattern = /:(USDT)$/;
            const symbol = ticker.symbol.includes(':USDT') ? ticker.symbol.replace(pattern, '') : ticker.symbol
            filteredTickers[symbol] = {
                ask: ticker.ask,
                bid: ticker.bid,
                percentage: ticker.percentage,
                average: ticker.average,
                quoteVolume: ticker.quoteVolume,
                bidVolume: ticker.bidVolume,
                askVolume: ticker.askVolume,
                bidVolumeUSDT: ticker.bidVolume * ticker.bid,
                askVolumeUSDT: ticker.askVolume * ticker.ask,
            }
        }
    });
    return filteredTickers
}

const getTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return {time: `${hours}:${minutes}:${seconds}`, minute: minutes};
}

const getFinalyObject = ({
    pair, 
    lExchange, 
    hExchange, 
    lPrice, 
    hPrice, 
    bidVolume,
    bidVolumeUSDT,
    askVolume,
    askVolumeUSDT,
    lAverage,
    lQuoteVolume,
    hAverage,
    hQuoteVolume,
    lPercentage,
    hPercentage
}) => {
    const int = ((hPrice - lPrice) / lPrice) * 100
    const persent = parseFloat(int.toFixed(2))
    const {time, minute} = getTime()
 
    return { 
        persent,
        time,
        minute,
        ref: `${lExchange}_${hExchange}_${pair}_${persent}_${time}`,
        pair,
        lover: { 
            url: getUrl(lExchange, pair),
            exchange: lExchange,
            price: lPrice,
            volume: askVolume,
            volumeUSDT: parseFloat(askVolumeUSDT.toFixed(0)) ,
            average: lAverage ? parseFloat(lAverage.toFixed(2)) : lAverage,
            quoteVolume: lQuoteVolume,
            percentage: lPercentage ? parseFloat(lPercentage.toFixed(2)) : lPercentage
         },
        high: { 
            url: getUrl(hExchange, pair),
            exchange: hExchange,
            price: hPrice,
            volume: bidVolume,
            volumeUSDT:  parseFloat(bidVolumeUSDT.toFixed(0)),
            average: hAverage ? parseFloat(hAverage.toFixed(2)) : hAverage,
            quoteVolume: hQuoteVolume,
            percentage: hPercentage ? parseFloat(hPercentage.toFixed(2)) : hPercentage
         }  
    }
}
const onPushFinalyObject = (result, {lTicker, hTicker, pair, lName, hName}) => {
    const { 
        ask: mAsk,
        askVolume: mAskVolume,
        askVolumeUSDT: mAskVolumeUSDT,
        average: mAverage,
        quoteVolume: mQuoteVolume,
        percentage: mPercentage
    } = lTicker
    // console.log(lTicker, 'lTicker')
    const { 
        bid: cBid,
        bidVolume: cBidVolume,
        bidVolumeUSDT: cBidVolumeUSDT,
        average: cAverage,
        quoteVolume: cQuoteVolume,
        percentage: cPercentage
     } = hTicker
     const finalyObject = getFinalyObject({
        pair,
        lExchange: lName,
        hExchange: hName,
        lPrice: mAsk,
        hPrice: cBid,
        bidVolume: cBidVolume,
        bidVolumeUSDT: cBidVolumeUSDT,
        askVolume: mAskVolume,
        askVolumeUSDT: mAskVolumeUSDT,
        lAverage: mAverage,
        lQuoteVolume: mQuoteVolume,
        hAverage: cAverage,
        hQuoteVolume: cQuoteVolume,
        lPercentage: mPercentage,
        hPercentage: cPercentage
    })
    
    if(
        finalyObject.persent > 1 &&
        finalyObject.persent < 100
        // finalyObject.persent > 2 &&
        // finalyObject.persent < 100 &&
        // finalyObject.lover.volumeUSDT > 5 &&
        // finalyObject.high.volumeUSDT > 5 
    ) {
        result.push(finalyObject) 
    }
}
const onComparePrices = (mainExchange, exchange) => {
    const keys = Object.keys(mainExchange.tickers)
    let result = []
    keys.forEach( key => {
        if(exchange.tickers[key]) {
            const { 
                ask: mAsk,
                bid: mBid,
            } = mainExchange.tickers[key]
            const { 
                ask: cAsk,
                bid: cBid,
             } = exchange.tickers[key]
            if(mAsk < cBid) {
                onPushFinalyObject(result, {
                    pair: key,
                    lTicker: mainExchange.tickers[key],
                    hTicker: exchange.tickers[key],
                    lName: mainExchange.name,
                    hName: exchange.name
                })
            } else if(cAsk < mBid) {
                onPushFinalyObject(result, {
                    pair: key,
                    hTicker: mainExchange.tickers[key],
                    lTicker: exchange.tickers[key],
                    hName: mainExchange.name,
                    lName: exchange.name
                })
            }

        }
    })
    return result
}

export const onFindPriceDifference = (tickers) => {
    const keys = Object.keys(tickers)
    console.log(keys, 'keys')
    let result = []
    keys.forEach((key, index) => {
        if(index + 1 !== keys.length) {
            const mainExchange = tickers[key]
            for (let i = index + 1; i < keys.length; i++) {
                const exchange = tickers[keys[i]]
                const intermediateResult = onComparePrices(
                    {name: key, tickers: mainExchange},
                    {name: keys[i], tickers: exchange}
                )
                result.push(...intermediateResult)
            }
        }
    })
    return result
}

export const parseOrderBook = ({ asks, bids, ticker }) => {
    
    let loverPrice = 0
    let highPrice = 0
    let loverVolume = 0
    let highVolume = 0
    let persent = ticker.persent
    let index = 0
    let currentPersent = ticker.persent

    while (currentPersent > 1 && index < asks.length) {
       const ask = asks[index] 
       const bid = bids[index]
       if(ask && ask.length === 2 && bid && bid.length === 2) {
          currentPersent = ((bid[0] - ask[0]) / ask[0]) * 100
          if(currentPersent > 1) {
             persent = currentPersent
             loverVolume += ask[1] * ask[0]
             highVolume += bid[1] * bid[0]
             loverPrice = ask[0]
             highPrice = bid[0]
          }
       }

       index = index + 1
    }
    const minLoverVolume = asks[0][0] * asks[0][1]
    const minHighVolume = bids[0][0] * bids[0][1]
    const maxPersent = ((bids[0][0] - asks[0][0]) / asks[0][0]) * 100

    ticker.lover.allVolumeUSDT = parseFloat(loverVolume.toFixed(0))
    ticker.lover.volumeUSDT = parseFloat(minLoverVolume.toFixed(0))
    ticker.lover.maxPrice = loverPrice

    ticker.high.allVolumeUSDT = parseFloat(highVolume.toFixed(0))
    ticker.high.volumeUSDT = parseFloat(minHighVolume.toFixed(0))
    ticker.high.maxPrice = highPrice

    ticker.minPersent = parseFloat(persent.toFixed(2))
    ticker.persent = parseFloat(maxPersent.toFixed(2))

    return ticker
}
export const addInformationPossibilityTranslation = (ticker, currencies) => {
    const currency = ticker.pair.split("/")[0]

    const loverExchangeCurrencies = currencies[ticker.lover.exchange][currency]
    const highExchangeCurrencies  = currencies[ticker.high.exchange][currency]

    const loverChains = Object.values(loverExchangeCurrencies?.networks) || loverExchangeCurrencies?.info?.networkList
    const highChains = Object.values(highExchangeCurrencies?.networks) || highExchangeCurrencies?.info?.networkList

    if(Array.isArray(loverChains) && loverChains.length && Array.isArray(highChains) && highChains.length) {
        const getActiveChains = (chains) => {
            const keys = []
            chains.forEach(item => {
                if(item.active !== undefined && item.active) {
                    keys.push({chain: item.network, fee: item.fee})
                } else if(item.info && (item.info.withdrawable === 'true' || item.info.withdrawable === true) && (item.info.rechargeable === 'true' || item.info.rechargeable === true)) {
                    keys.push({chain: item.network, fee: item.fee})
                }
            })
            return keys
        }
        const lActiveChains = getActiveChains(loverChains)
        const hActiveChains = getActiveChains(highChains)
        // console.log(ticker.lover.exchange, 'l exchange')
        // if(ticker.lover.exchange === 'huobi' || ticker.lover.exchange === 'bitget') {
        //     console.log('---------------------------------------------------------------------------------------')
        //     console.log(currency, 'currency')
        //     console.log(ticker.lover.exchange, 'l exchange')
        //     console.log(loverChains, 'loverChains')
        //     // console.log(ticker.high.exchange, 'h exchange')
        //     // console.log(hChainsKeys, 'highChains')
        //     console.log('---------------------------------------------------------------------------------------')
        
        // }

        const result = lActiveChains.reduce((acc, item1) => {
            const item2 = hActiveChains.find(item => item.chain === item1.chain);
            if (item2) {
            acc.push({ lover: item1, high: item2 });
            }
            return acc;
        }, []);
        console.log('---------------------------------------------------------------------------------------')
        console.log(currency, 'currency')
        console.log(ticker.lover.exchange, 'l exchange')
        console.log(ticker.high.exchange, 'h exchange')
        console.log(result, 'result')
        console.log('---------------------------------------------------------------------------------------')
        ticker.lover.chains = result.map(item => item.lover)
        ticker.high.chains = result.map(item => item.high)

        const lFee = (ticker.lover.chains.length ? ticker.lover.chains[0].fee : 0) * ticker.lover.maxPrice
        const hFee = (ticker.high.chains.length ? ticker.high.chains[0].fee : 0) * ticker.high.maxPrice
        ticker.lover.fee = lFee ? parseFloat(lFee.toFixed(2)) : 0
        ticker.high.fee = hFee ? parseFloat(hFee.toFixed(2)) : 0

        ticker.hasChain = !!ticker.lover.chains.length && !!ticker.high.chains.length
    }

    return ticker
}
export default { onFilterCurrencyPairs, onFindPriceDifference, parseOrderBook, addInformationPossibilityTranslation }