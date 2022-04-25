import {dbApi} from "../../nodes";
import {roundNum} from "../../roundNum";

const pricePositive = {
    key: 'price',
    translateTag: 'price',
    params: 'align-right clr--positive'
};

const priceNegative = {
    key: 'price',
    translateTag: 'price',
    params: 'align-right clr--negative'
};

const setOrders = arr => {
    let quoteSumm = 0;
    return arr
        .reduce((acc, element) => {
            const doubleIndex = acc.findIndex(e => roundNum(e.price) === roundNum(element.price));

            if(doubleIndex === -1){
                acc.push(element);
            } else {
                const {quote, base, price} = acc[doubleIndex];
                acc[doubleIndex] = {
                    quote: Number(quote) + Number(element.quote),
                    base: Number(base) + Number(element.base),
                    price
                }
            }

            quoteSumm += Number(element.quote);

            return acc;
        }, [])
        .sort((prev, next) => next.price - prev.price)
        .map(el => {
            return {
                quote: roundNum(el.quote),
                base: roundNum(el.base),
                price: roundNum(el.price),
                encashed: roundNum(el.quote / quoteSumm * 100)
            }
        });
}

export const getOrderBook = async (pair, stats) => {

    const {quote, base} = pair;

    const tableHead = [
        {
            key: 'quote',
            translateTag: 'param',
            translateParams: {
                param: quote.symbol
            },
        },
        {
            key: 'base',
            translateTag: 'param',
            translateParams: {
                param: base.symbol
            },
        }
    ];

    const {asks, bids} = await dbApi('get_order_book', [base.symbol, quote.symbol, 50]);

    const spread = {
        lastPrice: stats.price.val,
        difference: asks[0] && bids[0] ? roundNum(asks[0].price - bids[0].price) : 0
    };

    const sellHeader = [...tableHead, priceNegative];
    const sellRows = setOrders(asks);

    const buyHeader = [...tableHead, pricePositive];
    const buyRows = setOrders(bids);

    return {buy: {buyHeader, buyRows}, sell: {sellHeader, sellRows}, spread};
};