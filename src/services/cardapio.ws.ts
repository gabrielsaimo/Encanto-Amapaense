import axios from "axios";
//! Inativo
const api = axios.create({
  baseURL: "https://63c4ae2ff80fabd877d96ecf.mockapi.io",
});

interface Cardapio {
  id: number;
  name: string;
  sub: string;
  price: string;
  description: string;
  ativo: boolean;
  category: string;
}

export const getCardapio = async (): Promise<Cardapio[]> => {
  const response = await api.get<Cardapio[]>("/cardapio");
  return response.data;
};

export const createCardapio = async (data: Cardapio): Promise<Cardapio> => {
  const response = await api.post<Cardapio>("/cardapio", data);
  return response.data;
};

export const updateCardapio = async (
  id: number,
  data: Cardapio
): Promise<Cardapio> => {
  const response = await api.put<Cardapio>(`/cardapio/${id}`, data);
  return response.data;
};

export const deleteCardapio = async (id: number): Promise<void> => {
  await api.delete(`/cardapio/${id}`);
};
