import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  sendSignInLinkToEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDocs, collection, query, where } from 'firebase/firestore';

//from firebase config
import { auth, actionCodeSettings, db } from '../../utils/firebase';

//type
import { FirestoreSchool } from '../../types/Firestore';

//api
import { createAdmin, getAdmin } from '../../api/admin';
import { getClient } from '../../api/client';

type UserCredential = {
  email: string;
};

type AuthContextProps = {
  // school info
  admin: FirestoreSchool | null;
  // clientId
  client: string | null;
  loading: boolean;
  actions: {
    signin: (({ email }: UserCredential) => Promise<void>) | null;
    googleSignin: (() => Promise<void>) | null;
    // signup: ({ email }: UserCredential) => Promise<void>;
    signout: (() => Promise<void>) | null;
    // setError: React.Dispatch<React.SetStateAction<string>>;
    updateClient: ((client: string) => Promise<void>) | null;
  };
};

const initialState = {
  admin: null,
  client: null,
  loading: false,
  actions: {
    signin: null,
    googleSignin: null,
    signout: null,
    updateClient: null,
  },
};

const authContext = createContext<AuthContextProps>(initialState);

export const AuthProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  //school credential
  const [admin, setAdmin] = useState<FirestoreSchool | null>(null);

  //each client identifier
  const [client, setClient] = useState<string | null>(
    sessionStorage.getItem('client') || null
  );

  const [loading, setLoading] = useState(false);

  //actions
  const signin = async ({ email }: UserCredential) => {
    try {
      setLoading(true);
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      //store email address for later use
      window.localStorage.setItem('emailForSignIn', email);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const googleSignin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      // The signed-in admin info.
      const { uid, displayName: name, email } = result.user;

      //check if the admin has already registered
      const schoolsRef = collection(db, 'schools');
      const q = query(schoolsRef, where('admin', '==', email));
      const querySnapshot = await getDocs(q);

      //user doesn't exists
      if (!querySnapshot.size) {
        //new register
        //create new school doc
        //create school api
        const body = {
          uid,
          admin: email || '',
        };
        await createAdmin(body);
      }

      //update admin status
      updateAdmin(uid);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateAdmin = async (uid: string) => {
    const admin = await getAdmin(uid);
    console.log(admin);

    // update logged in admin
    admin && setAdmin(admin as FirestoreSchool);
  };

  const updateClient = async (client: string) => {
    const { status, data } = await getClient({
      uid: admin!.uid as string,
      client,
    });

    // update client
    status === 200 && setClient(data.id);
    // store the client id on sessionStorage
    sessionStorage.setItem('client', data.id);
  };

  //update user data on auth state change
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        //update admin status
        updateAdmin(user.uid);
      } else {
        setAdmin(null);
        setClient(null);
        //clear sessionStorage
        sessionStorage.removeItem('client');
      }
      setLoading(false);
    });

    // cleanup subscription on unmount
    return unsubscribe;
  }, []);

  return (
    <authContext.Provider
      value={{
        admin,
        client,
        loading,
        actions: { signin, googleSignin, signout, updateClient },
      }}
    >
      {children}
    </authContext.Provider>
  );
};

// let files use auth context directly
export const useAuth = () => {
  return useContext(authContext);
};
