//type import
import { SprintApiProps } from '../../types/Firestore';
import { HttpMethods } from '../../types/Api';

export const deleteSprint = async (body: SprintApiProps) => {
  const { uid, clientId, sprintId } = body;
  try {
    const deletedSprint = await fetch(
      `/api/admins/${uid}/clients/${clientId}/sprints/${sprintId}`,
      {
        method: HttpMethods.DELETE,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return await deletedSprint.json();
  } catch (err) {
    console.log(err);
  }
};
