//type import
import { HttpMethods, ApiResponse } from '../../types/Api';
import { ProjectionApiProps } from '../../types/Firestore';

export const getProjection = async (body: ProjectionApiProps) => {
  const { uid, clientId, sprintId, projectionId } = body;

  const projectionDoc = await fetch(
    `/api/admins/${uid}/clients/${clientId}/sprints/${sprintId}/projections/${projectionId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: HttpMethods.GET,
    }
  );

  const res = (await projectionDoc.json()) as ApiResponse;
  return res;
};
