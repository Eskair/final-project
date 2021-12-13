//type import
import { SprintApiProps } from '../../types/Firestore';
import { HttpMethods } from '../../types/Api';

export const createSprint = async (body: SprintApiProps) => {
  try {
    const newSprint = await fetch(`/api/sprints`, {
      method: HttpMethods.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return await newSprint.json();
  } catch (err) {
    console.log(err);
  }
};
