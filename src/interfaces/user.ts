export interface UserInterface {
  id: string;
  name: string;
  total_archived: number | null;
  email: string;
  image: string | null;
  token: string;
  last_opened: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}
