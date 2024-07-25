import axios from "axios";

class CurrencyAPI {
  private static client = axios.create({
    baseURL:
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/",
  });

  public static async getAllCurrencies(): Promise<
    { currencyCode: string; currencyName: string }[]
  > {
    try {
      const res = await this.client.get("currencies.json");
      const data = res.data;
      const resultArr = [];
      for (const [currencyCode, currencyName] of Object.entries(data))
        resultArr.push({ currencyCode, currencyName });
      return resultArr;
    } catch (err) {
      return [];
    }
  }
  public static async getCurrencyExchange(
    currency: string
  ): Promise<{ currencyCode: string; currencyExchangeRate: number }[]> {
    try {
      const res = await this.client.get(`currencies/${currency}.json`);
      const data = res.data;
      const exchangeCurrenciesArr = [];
      for (const [currencyCode, currencyExchangeRate] of Object.entries(
        data[currency]
      ))
        exchangeCurrenciesArr.push({ currencyCode, currencyExchangeRate });
      return exchangeCurrenciesArr;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}

export default CurrencyAPI;
