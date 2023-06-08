import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    "X-RapidAPI-Key": "b3bb8b0878mshfb1da5fc6b47919p104652jsnefec26a22369",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com/";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),

    // Note: Change the coin price history endpoint from this - `coin/${coinId}/history/${timeperiod} to this - `coin/${coinId}/history?timeperiod=${timeperiod}`
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
    }),

    // Note: To access this endpoint you need premium plan
    getExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetExchangesQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;