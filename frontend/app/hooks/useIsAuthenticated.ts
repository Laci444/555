import { useEffect, useState } from "react";
import { useReactAuthKitStore } from "react-auth-kit/AuthContext";
import isAuth from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";

export function useIsAuthenticated() {
  const store = useReactAuthKitStore();
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth());
  const signOut = useSignOut();
  useEffect(() => {
    return store.subscribe(() => {
      setIsAuthenticated(
        (store.value.auth &&
          new Date(store.value.auth.expiresAt) > new Date()) ||
        false,
      );
      store.value.auth &&
        new Date(store.value.auth.expiresAt) <= new Date() &&
        signOut();
    });
  }, [store]);

  return isAuthenticated;
}
