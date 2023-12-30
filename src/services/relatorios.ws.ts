import { api } from "./api.config";

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

export const getRelatorioGraficoMensal = async (data: any): Promise<any[]> => {
  const response = await api.get<any>("pedido/relatorio/vendas/GraficoMensal", {
    params: data,
  });
  return response.data;
};
