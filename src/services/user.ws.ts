import { api } from "./api.config";
interface User {
  id: number;
  name: string;
  password: string;
  active: boolean;
  categoria: string;
}

export const getUser = async (data: User): Promise<User> => {
  try {
    const response = await api.post<User>("/user", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter usuário:", error);
    throw error;
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>("/user/adm");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter usuários:", error);
    throw error;
  }
};

export const putUser = async (data: User): Promise<User> => {
  const response = await api.put<User>("/user", data);
  return response.data;
};
export const postUser = async (data: User): Promise<User> => {
  const response = await api.post<User>("/user", data);
  return response.data;
};

export const postUserAdm = async (data: User): Promise<User> => {
  const response = await api.post<User>("/user/adm", data);
  return response.data;
};

export const deleteUser = async (data: User): Promise<void> => {
  await api.delete<User>(`/user/${data.id}`);
};
