import axios from "axios";
//! Inativo
const api = axios.create({
  baseURL: "https://encanto-backend.vercel.app/",
});

interface Cardapio {
  id: number;
  name: string;
  sub: string;
  price: string;
  description: string;
  active: boolean;
  category: string;
}

export const getCardapio = async (): Promise<Cardapio[]> => {
  const response = await api.get<Cardapio[]>("/cardapio");
  return response.data;
};

export const putCardapio = async (data: Cardapio): Promise<Cardapio> => {
  const response = await api.put<Cardapio>("/cardapio", data);
  return response.data;
};
export const postCardapio = async (data: Cardapio): Promise<Cardapio> => {
  const response = await api.post<Cardapio>("/cardapio", data);
  return response.data;
};

export const deleteCardapio = async (data: Cardapio): Promise<void> => {
  await api.delete<Cardapio>(`/cardapio/${data.id}`);
};
