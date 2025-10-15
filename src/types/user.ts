export interface User {
  id: string;
  email: string;
  role: "admin" | "moderator" | "user";
  created_at: string;
}

export interface NewUser {
  email: string;
  password: string;
  role: "admin" | "moderator" | "user";
}