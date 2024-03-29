import { api, api2 } from "./api.config";

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
export const postNotification = async (data: any): Promise<any> => {
  const response = await api2.post<any>("/notifications/send", data);
  return response.data;
};

export const postPedidosStatus = async (data: any): Promise<any> => {
  const response = await api.post<any>("/pedido/status", data);
  if (response.data[1] === 1) {
    return response.data;
  } else {
    alert("Erro ao Mudar Status");
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

export const putPedido = async (data: any): Promise<any> => {
  const response = await api.put<any>("/pedido/pedidos", data);
  return response.data;
};

export const getPedidoId = async (): Promise<pedido> => {
  const response = await api.get<pedido>(`/pedido/pedidos`);
  if (response.data === null) {
    alert("Pedido não encontrado");
    return response.data;
  } else {
    return response.data;
  }
};

export const postPedidostatus = async (data: any): Promise<pedido> => {
  const response = await api.post<pedido>(`/pedido/pedidos`, data);
  if (response.data === null) {
    return response.data;
  } else {
    return response.data;
  }
};

export const getPedidosBar = async (): Promise<any[]> => {
  const response = await api.get<pedido[]>("/pedido/bar");
  return response.data;
};

export const veryfyMesa = async (messa: Number): Promise<any> => {
  const response = await api.get<any>(`/pedido/verif/${messa}`);
  return response.data;
};

export const valorTotal = async (id_mesa: number): Promise<any> => {
  const response = await api.get<any>(`/pedido/valor/${id_mesa}`);
  return response.data;
};

export const verifyFinalizar = async (id_mesa: number): Promise<any> => {
  const response = await api.get<any>(`/pedido/verif/finalizar/${id_mesa}`);
  return response.data;
};

export const FinalizarPedido = async (data: any): Promise<any> => {
  const response = await api.post<any>(`/pedido/finalizar`, data);
  return response.data;
};

export const putMesas = async (data: any): Promise<any> => {
  const response = await api.put<any>("/pedido/mesa", data);
  return response.data;
};

export const deletePedidos = async (data: pedido): Promise<void> => {
  await api.delete(`/pedido/${data.id}`);
};

export const deleteMesa = async (id_mesa: number): Promise<void> => {
  await api.delete(`/pedido/mesa/${id_mesa}`);
};

export const veryfyStatusPedidos = async (id: number): Promise<any> => {
  const response = await api.get<any>(`pedido/pagamentos/verify/${id}`);
  return response.data;
};

export const getStatusPedidos = async (id: number): Promise<any> => {
  const response = await api.get<any>(`pedido/verif/status/mesa/${id}`);
  return response.data;
};

export const getPedidosData = async (data: any): Promise<any> => {
  const response = await api.get<any>(`pedido/pedidos/data`, {
    params: data,
  });
  return response.data;
};
