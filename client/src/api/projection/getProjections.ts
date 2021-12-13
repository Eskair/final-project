//type import
import { HttpMethods, ApiResponse } from '../../types/Api';
import { ProjectionApiProps } from '../../types/Firestore';

export const getProjections = async (body: ProjectionApiProps) => {
  const { uid, clientId, sprintId } = body;

  const projectionDocs = await fetch(
    `/api/${uid}/${clientId}/${sprintId}/projections`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: HttpMethods.GET,
    }
  );

  const res = (await projectionDocs.json()) as ApiResponse;
  return res;
};
