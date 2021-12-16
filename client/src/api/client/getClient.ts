//type import
import { HttpMethods, ApiResponse } from '../../types/Api';
import { ClientApiProps } from '../../types/Firestore';

export const getClient = async (body: ClientApiProps) => {
  const { uid, client } = body;

  const clientDoc = await fetch(`/api/admins/${uid}/clients/${client}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: HttpMethods.GET,
  });

  const res = (await clientDoc.json()) as ApiResponse;
  return res;
};
