import axios from "axios";
const api = axios.create({
  baseURL: "https://encanto-backend.vercel.app/",
});

interface category {
  id: number;
  name: string;
  active: boolean;
}

export const getCategoty = async (): Promise<category[]> => {
  const response = await api.get<category[]>("/categoria-cardapio");
  return response.data;
};

export const postCategoty = async (data: category): Promise<category> => {
  const response = await api.post<category>("/categoria-cardapio", data);
  return response.data;
};

export const putCategoty = async (data: category): Promise<category> => {
  const response = await api.put<category>("/categoria-cardapio", data);
  return response.data;
};

export const deleteCategoty = async (data: category): Promise<void> => {
  await api.delete(`/categoria-cardapio/${data.id}`);
};
