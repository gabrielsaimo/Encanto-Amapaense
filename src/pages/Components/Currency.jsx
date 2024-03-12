export const currency_USD = (number) =>
  number.toLocaleString("en-US", { style: "currency", currency: "USD" });
export const currency_AUD = (number) =>
  number.toLocaleString("en-AU", { style: "currency", currency: "AUD" });
export const currency_EUR = (number) =>
  number.toLocaleString("eu-EU", { style: "currency", currency: "EUR" });
export const currency_BRL = (number) =>
  number.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
