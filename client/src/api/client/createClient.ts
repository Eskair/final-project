//type import
import { ClientApiProps } from '../../types/Firestore';
import { HttpMethods } from '../../types/Api';

export const createClient = async (body: ClientApiProps) => {
  const newClassroom = await fetch(`/api/clients`, {
    method: HttpMethods.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return await newClassroom.json();
};
