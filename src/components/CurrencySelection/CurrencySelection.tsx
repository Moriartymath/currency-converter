import React, { SyntheticEvent } from "react";

interface CurrencySelectionProps {
  value: string;
  onChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
  currenciesArr: Array<{ currencyCode: string }>;
}

function CurrencySelection({
  value,
  onChange,
  currenciesArr,
}: CurrencySelectionProps) {
  return (
    <select value={value} onChange={onChange}>
      {currenciesArr.map(({ currencyCode }) => (
        <option value={currencyCode} key={currencyCode}>
          {currencyCode}
        </option>
      ))}
    </select>
  );
}

export default CurrencySelection;
