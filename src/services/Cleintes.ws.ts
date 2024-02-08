import { api } from "./api.config";

interface CleintesInterface {
  name: string;
  phone: string;
  active: boolean;
  category: string;
}

export const getCleintes = async (): Promise<CleintesInterface[]> => {
  const response = await api.get<CleintesInterface[]>(`/cliente`);
  return response.data;
};

export const putClientes = async (
  data: CleintesInterface
): Promise<CleintesInterface> => {
  const response = await api.put<CleintesInterface>("/cliente", data);
  return response.data;
};
