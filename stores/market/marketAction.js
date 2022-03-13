import axios from "axios";

export const GET_HOLDINGS_BEGIN = "GET_HOLDINGS_BEGIN";
export const GET_HOLDINGS_SUCCESS = "GET_HOLDINGS_SUCCESS";
export const GET_HOLDINGS_FAILURE = "GET_HOLDINGS_FAILURE";

export const GET_COIN_MARKET_BEGIN = "GET_COIN_MARKET_BEGIN";
export const GET_COIN_MARKET_SUCCESS = "GET_COIN_MARKET_SUCCESS";
export const GET_COIN_MARKET_FAILURE = "GET_COIN_MARKET_FAILURE";

//holding / my holdings

export const getHoldingBegin = () => ({
  type: GET_HOLDINGS_BEGIN,
});
export const getHoldingSuccess = (myHoldings) => ({
  type: GET_HOLDINGS_SUCCESS,
  payload: { myHoldings },
});
export const getHoldingFailure = (error) => ({
  type: GET_HOLDINGS_FAILURE,
  payload: error,
});

export const getHoldings = (
  holdings = [],
  currency = "usd",
  orderBy = "market_cap_desc",
  sparkline = true,
  priceChangePerc = "7d",
  perPage = 10,
  page = 1
) => {
  return (dispatch) => {
    dispatch(getHoldingBegin());
    const ids = holdings.map((e) => e.id).join(",");
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${ids}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;
    return axios({
      url,
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status == "200") {
          //Retrieve our current holdings -> current quantity
          const myHoldings = response.data.map((item) => {
            const coin = holdings.find((a) => a.id == item.id);
            //price from 7d ago
            const price7d =
              item.current_price /
              (1 + item.price_change_percentage_7d_in_currency * 0.01);
            return {
              id: item.id,
              symbol: item.symbol,
              name: item.name,
              image: item.image,
              currentPrice: item.current_price,
              quantity: item.qty,
              total: coin.qty * item.current_price,
              priceChangePercentage7d:
                item.price_change_percentage_7d_in_currency,
              holdingValueChange7d: (item.current_price - price7d) * coin.qty,
              sparkLineIn7d: {
                value: item.sparkline_in_7d.price.map(
                  (price) => price * coin.qty
                ),
              },
            };
          });
          dispatch(getHoldingSuccess(myHoldings));
        } else {
          dispatch(getHoldingFailure(error));
        }
      })
      .catch((error) => {
        dispatch(getHoldingFailure(error));
      });
  };
};
// Coin Market

export const getCoinMarketBegin = () => ({
  type: GET_COIN_MARKET_BEGIN,
});

export const getCoinMarketSuccess = (coins) => ({
  type: GET_COIN_MARKET_SUCCESS,
  payload: { coins },
});
export const getCoinMarketFailure = (error) => ({
  type: GET_COIN_MARKET_FAILURE,
  payload: { error },
});

export const getCoinMarket = (
  currency = "usd",
  orderBy = "market_cap_desc",
  sparkline = true,
  priceChangePerc = "7d",
  perPage = 10,
  page = 1
) => {
  return async (dispatch) => {
    dispatch(getCoinMarketBegin());
    let apiURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&
    order=${orderBy}&
    per_page=${perPage}&
    page=${page}&
    sparkline=${sparkline}&
    price_change_percentage=${priceChangePerc}`;
    try {
      // console.log("get coin market");
      const getCoinMarketAPI = await axios.get(apiURL);
      // console.log(getCoinMarketAPI.status);
      if (getCoinMarketAPI.state == 200) {
        dispatch(getCoinMarketSuccess(getCoinMarketAPI.data));
      } else {
        dispatch(getCoinMarketFailure(getCoinMarketAPI.data));
      }
    } catch (error) {
      dispatch(getCoinMarketFailure(error));
    }
  };
};
