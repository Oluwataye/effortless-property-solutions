
export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  subject: string;
  phone?: string;
  created_at: string;
  read: boolean;
};
