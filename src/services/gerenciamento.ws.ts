import { AxiosResponse } from "axios";
import { api } from "./api.config";

const handleResponse = (response: AxiosResponse) => response.data;

export const getPedidosDelivery = async (): Promise<any[]> => {
  const response = await api.get<any[]>("/pedido/pedidos/Delivery");
  return handleResponse(response);
};

export const postPedidosDelivery = async (data: any): Promise<any> => {
  const response = await api.post<any>("/gerenciamento/pedidos-delivery", data);
  return handleResponse(response);
};

export const putPedidos_uniDelivery = async (data: any): Promise<any> => {
  const response = await api.put<any>("pedido/pedidos/Delivery", data);
  return handleResponse(response);
};

export const getBairros = async (): Promise<any[]> => {
  const response = await api.get<any[]>("/gerenciamento/bairros");
  return handleResponse(response);
};

export const postBairros = async (data: any): Promise<any> => {
  const response = await api.post<any>("/gerenciamento/bairros", data);
  return handleResponse(response);
};

export const putBairros = async (data: any): Promise<any> => {
  const response = await api.put<any>("/gerenciamento/bairros", data);
  return handleResponse(response);
};

export const deleteBairros = async (id: number): Promise<void> => {
  await api.delete(`/gerenciamento/bairros/${id}`);
};

export const getEmail = async (): Promise<any> => {
  const response = await api.get<any>("/gerenciamento/email");
  return handleResponse(response);
};

export const postEmail = async (data: any): Promise<any> => {
  const response = await api.post<any>("/gerenciamento/email", data);
  return handleResponse(response);
};

export const putEmail = async (data: any): Promise<any> => {
  const response = await api.put<any>("/gerenciamento/email", data);
  return handleResponse(response);
};

export const deleteEmail = async (id: number): Promise<void> => {
  await api.delete(`/gerenciamento/email/${id}`);
};

export const getDados = async (): Promise<void> => {
  const response = await api.get("/gerenciamento/dados");
  return handleResponse(response);
};

export const postDados = async (dados: any): Promise<void> => {
  const response = await api.post("/gerenciamento/dados", dados);
  return handleResponse(response);
};
