//type import
import { ProjectionApiProps } from '../../types/Firestore';
import { HttpMethods } from '../../types/Api';

export const createProjection = async (body: ProjectionApiProps) => {
  try {
    const newProjection = await fetch(`/api/projections`, {
      method: HttpMethods.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return await newProjection.json();
  } catch (err) {
    console.log(err);
  }
};
