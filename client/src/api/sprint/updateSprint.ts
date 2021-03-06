//type import
import { SprintApiProps } from '../../types/Firestore';
import { HttpMethods } from '../../types/Api';

export const updateSprint = async (body: SprintApiProps) => {
  const { uid, clientId, sprintId, updatedInfo } = body;
  try {
    const updatedSprint = await fetch(
      `/api/admins/${uid}/clients/${clientId}/sprints/${sprintId}`,
      {
        method: HttpMethods.PATCH,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updatedInfo }),
      }
    );

    return await updatedSprint.json();
  } catch (err) {
    console.log(err);
  }
};
