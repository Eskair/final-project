import Firebase from 'firebase/compat';

export type Timestamp = Firebase.firestore.Timestamp;

//firestore collections
export enum Collection {
  SCHOOLS = 'schools',
  CLASSES = 'classes',
  MOODS = 'moods',
  CASES = 'cases',
}

//each collection docs type
export type FirestoreSchool = {
  uid: string;
  admin: string;
  name?: string;
  location?: string;
  code?: string;
};

export type FirestoreClassroom = {
  client: string;
  name?: string;
};

export type FirestoreSprint = {
  id: string;
  title: string;
  options: string[];
  startDate: Timestamp;
  endDate: Timestamp;
};

export type FirestoreCase = {
  date: Timestamp;
  data: { [key: string]: number };
};

export interface ClientApiProps extends FirestoreClassroom {
  uid: string;
}

export type SprintApiProps = {
  uid: string;
  clientId: string;
};
