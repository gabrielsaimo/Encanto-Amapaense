import { api } from "./api.config";

interface Email {
  destinatario: string;
  assunto: string;
  corpo: string;
}

export const postEmail = async (data: Email): Promise<Email> => {
  const response = await api.post<Email>("/email/enviar", data);
  return response.data;
};
