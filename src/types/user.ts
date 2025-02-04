export interface User {
  id: string;
  email: string;
  role: "admin" | "editor";
  created_at: string;
}

export interface NewUser {
  email: string;
  password: string;
  role: "admin" | "editor";
}