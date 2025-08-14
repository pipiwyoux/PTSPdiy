import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

// In a real-world application, this would not be a hardcoded list.
// This would be managed in a secure backend system.
const ADMIN_EMAILS = ["admin@tolopani.net", "superadmin@tolopani.net"];

const checkAdminRole = (user: User | null): boolean => {
  if (!user || !user.email) {
    return false;
  }
  // In a real-world app, you would check a custom claim on the user's ID token.
  // For example: `return user.getIdTokenResult().then(idTokenResult => idTokenResult.claims.admin === true);`
  // For this simulation, we check against a hardcoded list.
  return ADMIN_EMAILS.includes(user.email);
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
      setIsAdmin(checkAdminRole(currentUser));
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { user, isLoggedIn, isAdmin, loading };
};
