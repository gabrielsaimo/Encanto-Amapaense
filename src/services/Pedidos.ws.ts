import axios from "axios";
const api = axios.create({
  baseURL: "https://encanto-backend.vercel.app/",
  // baseURL: "http://localhost:3000/",
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
export const getPedidosAdm = async (): Promise<pedido[]> => {
  const response = await api.get<pedido[]>("/pedido/adm");
  return response.data;
};

export const getMesas = async (): Promise<any[]> => {
  const response = await api.get<pedido[]>("/pedido/mesa");
  return response.data;
};

export const getMesasbyId = async (id: number): Promise<pedido[]> => {
  const response = await api.get<pedido[]>(`/pedido/mesa/${id}`);
  return response.data;
};

export const postTransferir = async (data: pedido): Promise<pedido> => {
  const response = await api.post<pedido>("/pedido/transferir", data);
  return response.data;
};

export const postPedidos = async (data: pedido): Promise<pedido> => {
  const response = await api.post<pedido>("/pedido", data);
  return response.data;
};

export const postPedidosStatus = async (data: any): Promise<any> => {
  const response = await api.post<any>("/pedido/status", data);
  console.log("teste", response.data[1]);
  if (response.data[1] === 1) {
    return response.data;
  } else {
    alert("Erro ao Mudar Status , Pedido Possivelmente Excluido");
    return response.data;
  }
};

export const getStatusPedido = async (id: number): Promise<any[]> => {
  const response = await api.get<any[]>(`/pedido/status/${id}`);
  return response.data;
};

export const putPedidos = async (data: pedido): Promise<pedido> => {
  const response = await api.put<pedido>("/pedido", data);
  return response.data;
};

export const deletePedidos = async (data: pedido): Promise<void> => {
  await api.delete(`/pedido/${data.id}`);
};
