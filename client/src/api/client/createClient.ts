//type import
import { FirestoreClassroom, ClientApiProps } from '../../types/Firestore';
import { HttpMethods } from '../../types/Api';

export const createClient = async (body: ClientApiProps) => {
  try {
    const newClassroom = await fetch(`/api/classrooms`, {
      method: HttpMethods.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return await newClassroom.json();
  } catch (err) {
    console.log(err);
  }
};
