import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
  loginUser,
  signupUser,
  logoutUser,
} from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Check whether the user is already logged in.
  useEffect(() => {
    let active = true;

    async function checkAuth() {
      try {
        const currentUser = await getCurrentUser();

        if (active) {
          setUser(currentUser || null);
        }
      } catch {
        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    checkAuth();

    return () => {
      active = false;
    };
  }, []);

  // Login
  const login = useCallback(async (credentials) => {
    setError("");

    try {
      const response = await loginUser(credentials);
      const loggedInUser = response?.user ?? response;

      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please try again.";

      setError(message);
      throw err;
    }
  }, []);

  // Signup
  const signup = useCallback(async (userData) => {
    setError("");

    try {
      const response = await signupUser(userData);
      const registeredUser = response?.user ?? response;

      if (registeredUser?._id || registeredUser?.id || registeredUser?.email) {
        setUser(registeredUser);
      }

      return response;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Signup failed. Please try again.";

      setError(message);
      throw err;
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    setError("");

    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    isAuthenticated: Boolean(user),
    login,
    signup,
    logout,
    setUser,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}