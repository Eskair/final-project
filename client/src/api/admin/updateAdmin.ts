//type import
import { FirestoreSchool } from '../../types/Firestore';
import { HttpMethods } from '../../types/Api';

export const updateAdmin = async (body: FirestoreSchool) => {
  const { uid, ...rest } = body;

  const updatedAdmin = await fetch(`/api/admins/${uid}`, {
    method: HttpMethods.PATCH,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...rest }),
  });

  return await updatedAdmin.json();
};
