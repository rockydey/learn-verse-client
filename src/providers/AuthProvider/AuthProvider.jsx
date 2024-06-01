import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (name, image) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current User : ", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
