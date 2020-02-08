---
title: 'Using Cryptosheet.cc, Extract cumulative wallet size'
date: 2018-07-28
layout: post.njk
tags:
  - post
---

This is what I mean with **cumulative historic wallet size**:

![cryptosheet/cryptosheet-cumulative-historic-wallet](/assets/images/posts/cryptosheet/cryptosheet-cumulative-historic-wallet.png)

As you can see, it gives me a visualization of how my wallet changed over time and how various price changes, buys & sells influenced it.

## Open spreadsheet

You can go to your [Settings](https://cryptosheet.cc/settings) page on [cryptosheet.cc](https://cryptosheet.cc/settings), and check the **Google Sheets** Section for the spreadsheet you configured:

![cryptosheet/cryptosheet-google-sheets-section.png](/assets/images/posts/cryptosheet/cryptosheet-google-sheets-section.png)

## Create a new Filtered Worksheet

As an example, we'll choose **LTC-EUR** as the currency-pair and **coinbase** as the exchange.

Let's give the new Worksheet a name: `LTC-EUR-COINBASE - TRANSACTIONS`

![cryptosheet/cryptosheet-create-filtered-worksheet.png](/assets/images/posts/cryptosheet/cryptosheet-create-filtered-worksheet.png)

# `FILTER` to the rescue

Well use the `FILTER` formula to filter transaction for a specific currency-pair and exchange


## Define currency-pair and exchange filter

In cell `A1` of the new sheet, enter the desired filter: `ltc-eur-coinbase`.

> Context: As you can see in your `TRANSACTIONS` worksheet, in column `C` named `currencyPairExchange`, there lies the information to which currency-pair and exchange a transaction belongs to.

![cryptosheet/cryptosheet-filter-ltc-eur-coinbase.png](/assets/images/posts/cryptosheet/cryptosheet-filter-ltc-eur-coinbase.png)


## Copy transactions header columns

In cell `A2` of the sheet, enter the following formula to copy the header columns:

```bash
=FILTER(TRANSACTIONS!A:M, TRANSACTIONS!A:A = "exchange")
```

It will result in the following:

![cryptosheet/cryptosheet-create.header.columns.png](/assets/images/posts/cryptosheet/cryptosheet-create.header.columns.png)


## Filter transactions

Finally, in cell `A3` there is where the magic happens.

Enter `=FILTER(TRANSACTIONS!A:M, TRANSACTIONS!C:C = $A$1)` and you'll be amazed.

![cryptosheet/cryptosheet-filter-transactions.png](/assets/images/posts/cryptosheet/cryptosheet-filter-transactions.png)

# Visualize historic cumulative wallet size and value

The results are good, but **this** is what we are after:

![cryptosheet/cryptosheet-cumulative-historic-wallet.png](/assets/images/posts/cryptosheet/cryptosheet-cumulative-historic-wallet.png)

## Define `cumulative execSize`	and `cumulative execPrice`

We choose columns `P2` and `Q2` as the header rows for the cumulative calculations.

![cryptosheet/cryptosheet-cumulative-columns.png](/assets/images/posts/cryptosheet/cryptosheet-cumulative-columns.png)

In cell `P3` enter `=SUM($G$3:$G3)` and drag down.
In cell `Q3` enter `=P3*E3` and drag down.

And there you have the historic size of your wallet!

Let me know on Twitter [@christian_fei](https://twitter.com/christian_fei)!