import { getUrl } from "./urls";

export const onFilterCurrencyPairs = ({ tickers }) => {
    const filteredTickers = {}
    tickers.forEach(ticker => {
        if(ticker.symbol.includes('/USDT')) {
            // console.log(ticker, 'ticker')
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
            volumeUSDT: parseFloat(askVolumeUSDT.toFixed(0)),
            average: lAverage ? parseFloat(lAverage.toFixed(2)) : lAverage,
            quoteVolume: lQuoteVolume,
            percentage: lPercentage ? parseFloat(lPercentage.toFixed(2)) : lPercentage
         },
        high: { 
            url: getUrl(hExchange, pair),
            exchange: hExchange,
            price: hPrice,
            volume: bidVolume,
            volumeUSDT: parseFloat(bidVolumeUSDT.toFixed(0)),
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
    if(finalyObject.persent > 1 && finalyObject.persent < 30 && finalyObject.lover.volumeUSDT > 50 && finalyObject.high.volumeUSDT > 100) {
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



export default { onFilterCurrencyPairs, onFindPriceDifference }