import axios from "axios";
const api = axios.create({
  baseURL: "https://encanto-backend.vercel.app/",
});

interface pagamentos {
  id: number;
  tipo: string;
  idpedido: number;
  created_at: Date;
  created_by: number;
  valor: number;
}

export const getPagametos = async (id: number): Promise<pagamentos[]> => {
  const response = await api.get<pagamentos[]>(`/pagamentos/${id}`);
  return response.data;
};

export const putPagamentos = async (data: pagamentos): Promise<pagamentos> => {
  const response = await api.put<pagamentos>("/pagamentos", data);
  return response.data;
};
