import api from "./api";

// Register a new user
export async function signupUser(userData) {
  const { data } = await api.post("/auth/signup", userData);
  return data;
}

// Login existing user
export async function loginUser(credentials) {
  const { data } = await api.post("/auth/login", credentials);
  return data;
}

// Get logged-in user
export async function getCurrentUser() {
  const { data } = await api.get("/auth/me");
  return data?.user ?? data;
}

// Logout user
export async function logoutUser() {
  const { data } = await api.post("/auth/logout");
  return data;
}