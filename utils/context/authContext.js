import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { checkUser, registerUser } from '../auth';
import { firebase } from '../client';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext';

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [oAuthUser, setOAuthUser] = useState(null);

  const updateUser = useMemo(
    () => (uid) => checkUser(uid).then((userInfo) => {
      setUser({ fbUser: oAuthUser, ...userInfo });
    }),
    [oAuthUser],
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        setOAuthUser(fbUser);
        checkUser(fbUser.uid).then((userInfo) => {
          if (Object.keys(userInfo).length === 0) {
            registerUser({ uid: fbUser.uid, email: fbUser.email, userName: fbUser.displayName }).then((newUser) => {
              setUser({ fbUser, ...newUser });
            });
          } else {
            setUser({ fbUser, ...userInfo });
          }
        });
      } else {
        setOAuthUser(false);
        setUser(false);
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      updateUser,
      userLoading: user === null || oAuthUser === null,
    }),
    [user, oAuthUser, updateUser],
  );

  return <AuthContext.Provider value={value} {...props} />;
};

const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
