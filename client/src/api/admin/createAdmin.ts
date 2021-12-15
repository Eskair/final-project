//type import
import { FirestoreSchool } from '../../types/Firestore';
import { HttpMethods } from '../../types/Api';

export const createAdmin = async (body: FirestoreSchool) => {
  const newSchool = await fetch(`/api/schools`, {
    method: HttpMethods.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await newSchool.json();
};
