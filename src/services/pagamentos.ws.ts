import { api } from "./api.config";

interface pagamentos {
  id: number;
  tipo: string;
  idpedido: number;
  created_at: Date;
  created_by: number;
  valor: number;
}

export const getPagametos = async (id: number): Promise<pagamentos[]> => {
  const response = await api.get<pagamentos[]>(`/pedido/pagamentos/${id}`);
  return response.data;
};

export const putPagamentos = async (data: pagamentos): Promise<pagamentos> => {
  const response = await api.put<pagamentos>("/pedido/pagamentos", data);
  return response.data;
};
