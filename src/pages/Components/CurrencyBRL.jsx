const currency_BRL = (number) =>
  number.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

export default currency_BRL;
