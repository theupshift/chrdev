---
title: "Road to Elixir: Monitor Crypto assets"
date: 2020-04-28
layout: post.njk
tags:
  - post
  - featured
  - elixir
  - elixirlang
  - myelixirstatus
  - journey
updated: 2020-04-29
image: /assets/images/posts/elixir/elixir.png
---

Let's try to monitor crypto assets through the [Coinmarketcap API](https://coinmarketcap.com/), with Elixir!

Topics I want to explore in this exercise are:

- Elixir Supervision trees
- HTTP calls with Elixir (with HTTPoison)
- TDD and Refactoring

# Get crypto assets quotes

## Example with cURL

First things first. Are we able to make a simple (authenticated) HTTP call to the coinmarketcap API? I surely think so.

In curl this would be like this (use your own API Key):

```bash
curl -H "X-CMC_PRO_API_KEY: YOUR_COINMARKETCAP_API_KEY" -H "Accept: application/json" -d "symbol=BTC" -d "convert=EUR" -G https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest
```

The command above contacts the Coinmarketcap API to get the latest quote (conversion rate) of Bitcoin related to FIAT EUR.

*Note: this is a contrived example, as there is another endpoint (namely `/v1/cryptocurrency/listings/latest`) to get multiple quotes in a single API call*

The response looks like this:

```json
{
  "status": {
    "timestamp": "2020-04-28T06:46:09.890Z",
    "error_code": 0,
    "error_message": null,
    "elapsed": 14,
    "credit_count": 1,
    "notice": null
  },
  "data": {
    "BTC": {
      "id": 1,
      "name": "Bitcoin",
      "symbol": "BTC",
      "slug": "bitcoin",
      "num_market_pairs": 7965,
      "date_added": "2013-04-28T00:00:00.000Z",
      "tags": [
        "mineable"
      ],
      "max_supply": 21000000,
      "circulating_supply": 18349112,
      "total_supply": 18349112,
      "is_active": 1,
      "platform": null,
      "cmc_rank": 1,
      "is_fiat": 0,
      "last_updated": "2020-04-28T02:45:58.000Z",
      "quote": {
        "EUR": {
          "price": 7175.97279154951,
          "volume_24h": 32035162374.6573,
          "percent_change_1h": 0.07515773,
          "percent_change_24h": 0.45923884,
          "percent_change_7d": 12.62102123,
          "market_cap": 131672728461.0946,
          "last_updated": "2020-04-28T06:45:04.000Z"
        }
      }
    }
  }
}
```

One could say: "Bravo Christian, you can use curl with a copy-pasted example. What about Elixir?"

## Example with HTTPoison

Add the dependency `HTTPoison` to your mix.exs (`mix new YOUR_APP_NAME` if you're not in an existing application):

```elixir
...
  defp deps do
    [
      {:httpoison, "~> 1.6"}
    ]
  end
...
```

Use `iex -S mix` to enter an interactive shell:

```elixir
HTTPoison.get! "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest"
```

This results in a bad response, since the API Key is missing.

Let's see the documentation for "HTTPoison.get!" with `h`:
For more information about `h` see [IEx Helpers](https://elixirschool.com/en/lessons/basics/iex-helpers/#h).

```elixir
h HTTPoison.get!
```

Yielding:

```elixir
                  def get!(url, headers \\ [], options \\ [])

  @spec get!(binary(), headers(), Keyword.t()) ::
          HTTPoison.Response.t() | HTTPoison.AsyncResponse.t()

Issues a GET request to the given url, raising an exception in case of failure.

If the request does not fail, the response is returned.

See request!/5 for more detailed information.
```

---

Now that we know that `HTTPoison.get!` takes a second argument, namely the headers, let's try to pass them to the function:

```elixir
headers = ["X-CMC_PRO_API_KEY": "YOUR_API_KEY", "Accept": "Application/json; Charset=utf-8"]
HTTPoison.get! "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest", headers
```

Almost! We're missing some required fields, namely `id`, `symbol` or `slug`:

```elixir
headers = ["X-CMC_PRO_API_KEY": "YOUR_API_KEY", "Accept": "Application/json; Charset=utf-8"]
HTTPoison.get! "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC&convert=EUR", headers
```

Finally! A `%HTTPoison.Response` struct is returned with the property body.

# Let's test it

Found this little gem about [Elixir Test Mocking with Mox](https://www.thegreatcodeadventure.com/elixir-test-mocking-with-mox/).

The general advice is:

Define a behaviour for the `CoinmarketcapClient` (read more about [Elixir behaviours](https://elixirschool.com/en/lessons/advanced/behaviours/)) so that *only* during tests, a mock behaviour is used for testing purposes.

# to be continued
