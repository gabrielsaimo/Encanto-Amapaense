import axios from "axios";
const api = axios.create({
  baseURL: "https://encanto-backend.vercel.app/",
  // baseURL: "http://localhost:3000/",
});

export const getRelatorios_vendas = async (data: any): Promise<any[]> => {
  const response = await api.get<any>("pedido/relatorio/vendas", {
    params: data,
  });
  return response.data;
};

export const getRelatorios_pedidos = async (data: any): Promise<any[]> => {
  const response = await api.get<any>("pedido/relatorio/pedidos", {
    params: data,
  });
  return response.data;
};
