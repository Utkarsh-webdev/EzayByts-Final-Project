import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

// ✅ Define all admin UIDs here
const ADMIN_UIDS = // add user id here;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      try {
        if (currentUser) {
          const isAdmin = ADMIN_UIDS.includes(currentUser.uid);
          setUser({ ...currentUser, isAdmin });
          console.log('✅ Authenticated as:', currentUser.email, '| Admin:', isAdmin);
        } else {
          setUser(null);
          console.log('❌ Logged out');
        }
      } catch (error) {
        console.error('🔥 Auth error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('🚪 Logged out');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
