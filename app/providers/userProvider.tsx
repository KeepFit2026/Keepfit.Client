'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/app/lib/axios';
import { User, UserContextType } from '../types/User';

//Création du contexte
const UserContext = createContext<UserContextType | undefined>(undefined);

//Le composant Provider
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {

    //Loading seulement si l'utilisateur n'est pas encore chargé pour la première fois.
    if(!user) {
      setIsLoading(true);
    }

    try {
      const response = await api.get('/api/user');
      setUser(response.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, refetchUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

//Hook pour utiliser le contexte
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser doit être utilisé à l\'intérieur d\'un UserProvider');
  }
  return context;
}