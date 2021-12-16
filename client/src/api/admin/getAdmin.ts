//type import
import { HttpMethods, ApiResponse } from '../../types/Api';

export const getAdmin = async (uid: string) => {
  try {
    const admin = await fetch(`/api/admins/${uid}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: HttpMethods.GET,
    });

    const res = (await admin.json()) as ApiResponse;

    return res.data || null;
  } catch (err) {
    console.log(err);
  }
};
