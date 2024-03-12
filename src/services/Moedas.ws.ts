export const getMoedas = async (): Promise<any[]> => {
  const response = await fetch(
    "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,AUD-BRL"
  ).then((res) => res.json());
  return response;
};
