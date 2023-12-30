import { AxiosResponse } from "axios";
import { api } from "./api.config";
interface category {
  id: number;
  name: string;
  active: boolean;
}

const handleResponse = (response: AxiosResponse) => response.data;

export const getCategoty = async (): Promise<category[]> => {
  const response = await api.get<category[]>("/categoria-cardapio");
  return handleResponse(response);
};

export const postCategoty = async (data: category): Promise<category> => {
  const response = await api.post<category>("/categoria-cardapio", data);
  return handleResponse(response);
};

export const putCategoty = async (data: category): Promise<category> => {
  const response = await api.put<category>("/categoria-cardapio", data);
  return handleResponse(response);
};

export const deleteCategoty = async (data: category): Promise<void> => {
  await api.delete(`/categoria-cardapio/${data.id}`);
};
