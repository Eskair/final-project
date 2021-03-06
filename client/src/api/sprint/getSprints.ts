//type import
import { HttpMethods, ApiResponse } from '../../types/Api';
import { ClientApiProps } from '../../types/Firestore';

export const getSprints = async (body: ClientApiProps) => {
  const { uid, client } = body;

  const sprintDoc = await fetch(
    `/api/admins/${uid}/clients/${client}/sprints`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: HttpMethods.GET,
    }
  );

  const res = (await sprintDoc.json()) as ApiResponse;
  return res;
};
