import styles from "./App.module.css";
import CurrencyAPI from "../CurrencyAPI/CurrencyAPI.ts";
import { useState, useEffect } from "react";
import CurrencySelection from "./CurrencySelection/CurrencySelection.tsx";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]) as [
    Array<{ currencyCode: string; currencyName: string }>,
    Function
  ];
  const [exchangeCurrencies, setExchangeCurrencies] = useState([]) as [
    Array<{ currencyCode: string; currencyExchangeRate: number }>,
    Function
  ];

  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedExchangeCurrency, setSelectedExchangeCurrency] = useState("");
  const [currencyAmount, setCurrencyAmount] = useState(1);

  useEffect(() => {
    async function getCurrencies() {
      setIsLoading(true);
      const currenciesData = await CurrencyAPI.getAllCurrencies();
      setIsLoading(false);
      setCurrencies(currenciesData);
      setSelectedCurrency(currenciesData[0].currencyCode);
    }
    getCurrencies();
  }, []);

  useEffect(() => {
    async function getCurrencyExchange() {
      const exchangeData = await CurrencyAPI.getCurrencyExchange(
        selectedCurrency
      );
      setExchangeCurrencies(exchangeData);
      setSelectedExchangeCurrency(
        (currentExCurrency) => currentExCurrency || exchangeData[0].currencyCode
      );
    }
    if (selectedCurrency) getCurrencyExchange();
  }, [selectedCurrency]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <input
            value={currencyAmount}
            onChange={(ev) => setCurrencyAmount(+ev.target.value)}
          />
          <CurrencySelection
            value={selectedCurrency}
            onChange={(ev) => setSelectedCurrency(ev.target.value)}
            currenciesArr={currencies}
          />
          <CurrencySelection
            value={selectedExchangeCurrency}
            onChange={(ev) => setSelectedExchangeCurrency(ev.target.value)}
            currenciesArr={exchangeCurrencies}
          />
          {currencyAmount && selectedCurrency && selectedExchangeCurrency && (
            <p>
              Exchange:
              {currencyAmount *
                exchangeCurrencies.find(
                  (currency) =>
                    currency.currencyCode === selectedExchangeCurrency
                ).currencyExchangeRate}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
