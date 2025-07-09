export interface User {
  id: number;
  email: string;
  password: string;
  display_name: string;
  first_name: string;
  last_name: string;
  username: string;
  date_of_birth: Date;
  sports_preferences: string[];
  profile_pic: string;    
  location: string[] | null;
  visibility: boolean;
  created_at: Date;
  updated_at: Date;
}