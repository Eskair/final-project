//type import
import { ProjectionApiProps } from '../../types/Firestore';
import { HttpMethods } from '../../types/Api';

export const updateProjection = async (body: ProjectionApiProps) => {
  const { uid, clientId, sprintId, projectionId, clicked } = body;
  try {
    const updatedProjection = await fetch(
      `/api/admins/${uid}/clients/${clientId}/sprints/${sprintId}/projections/${projectionId}`,
      {
        method: HttpMethods.PATCH,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clicked }),
      }
    );

    return await updatedProjection.json();
  } catch (err) {
    console.log(err);
  }
};
