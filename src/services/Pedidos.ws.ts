import axios from "axios";
const api = axios.create({
  baseURL: "https://encanto-backend.vercel.app/",
});

interface pedido {
  id: number;
  mesa: number;
  pedido: string;
  valor: number;
  desconto: number;
  obs: string;
  status: string;
  created_by: string;
  acepted_by: string;
  acepeted_at: string;
  updated_by: string;
  finished_by: string;
  finished_at: string;
}

export const getPedidos = async (): Promise<pedido[]> => {
  const response = await api.get<pedido[]>("/pedido");
  return response.data;
};


export const postPedidos = async (data: pedido): Promise<pedido> => {
  const response = await api.post<pedido>("/pedido", data);
  return response.data;
};

export const putPedidos = async (data: pedido): Promise<pedido> => {
  const response = await api.put<pedido>("/pedido", data);
  return response.data;
};

export const deletePedidos = async (data: pedido): Promise<void> => {
  await api.delete(`/pedido/${data.id}`);
};
