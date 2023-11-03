import axios from "axios";
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

export const imgCardapio = async (data: any): Promise<any> => {
  const response = await api.post<any>("/cardapio/imagemsub", data);
  return response.data;
};

export const getImgCardapio = async (id: number): Promise<any> => {
  const response = await api.get<any>("/cardapio/imagem/" + id);
  return response.data;
};

export const InsertImg = async (data: any): Promise<any> => {
  const response = await api.post<any>("/cardapio/InsertImg", data);
  return response.data;
};

export const DeleteImg = async (id: number): Promise<any> => {
  const response = await api.delete<any>("/cardapio/deleteimagem/" + id);
  return response.data;
};
