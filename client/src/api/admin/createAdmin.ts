//type import
import { FirestoreSchool } from '../../types/Firestore';
import { HttpMethods } from '../../types/Api';

export const createAdmin = async (body: FirestoreSchool) => {
  try {
    const newSchool = await fetch(`/api/schools`, {
      method: HttpMethods.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    console.log(await newSchool.json());

    return await newSchool.json();
  } catch (err) {
    console.log(err);
  }
};
