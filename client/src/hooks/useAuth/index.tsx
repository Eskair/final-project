import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getDocs, collection, query, where } from 'firebase/firestore';

//from firebase config
import { auth, db } from '../../utils/firebase';

//type
import { FirestoreSchool } from '../../types/Firestore';
import { UserCredential } from '../../types/Auth';

//api
import { createAdmin, getAdmin } from '../../api/admin';
import { getClient, createClient } from '../../api/client';

type AuthContextProps = {
  // school info
  admin: FirestoreSchool | null;
  // clientId
  client: string | null;
  loading: boolean;
  actions: {
    signup:
      | (({ email, password }: UserCredential) => Promise<{
          success: boolean;
          message: string;
        }>)
      | null;
    googleSignin: (() => Promise<void>) | null;
    signin:
      | (({ email, password }: UserCredential) => Promise<{
          success: boolean;
          message: string;
        }>)
      | null;
    signout: (() => Promise<void>) | null;
    updateClient: ((client: string) => Promise<boolean>) | null;
    updateAdmin: ((uid: string) => Promise<void>) | null;
  };
};

const initialState = {
  admin: null,
  client: null,
  loading: false,
  actions: {
    signup: null,
    signin: null,
    googleSignin: null,
    signout: null,
    updateClient: null,
    updateAdmin: null,
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
  const signup = async ({ email, password }: UserCredential) => {
    try {
      setLoading(true);
      const isAlreadyRegistered = await isAdminRegistered(email);
      if (isAlreadyRegistered) {
        return { success: false, message: 'Already registered' };
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      const body = {
        uid,
        admin: email || '',
      };

      await createAdmin(body);
      await updateAdmin(uid);
      return { success: true, message: 'successfully registered' };
    } catch (err) {
      console.log(err);
      return { success: false, message: 'Unknown error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const signin = async ({ email, password }: UserCredential) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      userCredential.user && (await updateAdmin(userCredential.user.uid));

      return { success: true, message: 'successfully registered' };
    } catch (err) {
      console.log(err);
      return { success: false, message: 'Not registered yet!' };
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
      const { uid, email } = result.user;

      const isAlreadyRegistered = await isAdminRegistered(email);

      if (!isAlreadyRegistered) {
        const body = {
          uid,
          admin: email || '',
        };
        await createAdmin(body);
      }

      //update admin status
      await updateAdmin(uid);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const isAdminRegistered = async (email: string | null) => {
    //check if the admin has already registered
    const schoolsRef = collection(db, 'schools');
    const q = query(schoolsRef, where('admin', '==', email));
    const querySnapshot = await getDocs(q);

    return querySnapshot.size;
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
    setLoading(true);
    const admin = await getAdmin(uid);

    // update logged in admin
    admin && setAdmin(admin as FirestoreSchool);
    setLoading(false);
  };

  const updateClient = async (client: string) => {
    setLoading(true);
    const { status, data } = await getClient({
      uid: admin!.uid as string,
      client,
    });

    let success = true;

    // update client
    if (status === 200) {
      // client already exists
      setClient(data.id);
      // store the client id on sessionStorage
      sessionStorage.setItem('client', data.id);
    } else {
      // client not found
      // create a new client
      const { status, data } = await createClient({ uid: admin!.uid, client });
      if (status === 200) {
        // client already exists
        setClient(data.id);
        // store the client id on sessionStorage
        sessionStorage.setItem('client', data.id);
      } else {
        // server error
        success = false;
      }
    }
    setLoading(false);
    return success;
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

    return unsubscribe;
  }, []); // eslint-disable-line

  return (
    <authContext.Provider
      value={{
        admin,
        client,
        loading,
        actions: {
          signup,
          signin,
          googleSignin,
          signout,
          updateAdmin,
          updateClient,
        },
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
