export interface User {
  id: number;
  email: string;
  display_name: string;
  first_name: string;
  last_name: string;
  username: string;
  date_of_birth: Date;
  sports_preferences: string[];
  profile_pic: string;    
  location: string[] | null;
  visibility: boolean;
  is_oauth: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface Location {
    id : number;
    name: string;
    address: string;
    sports_offered: string[];
    has_office: boolean;
    lat: number;
    long: number;
    created_at: Date;
    updated_at: Date;
    image_uri: string;
}


// TODO Fetch sports list from API
// For now, using a static list
export const sportsList = [
  "Basketball",
  "Soccer",
  "Tennis",
  "Baseball",
  "Volleyball",
  "Golf",
  "Hockey",
  "Swimming",
  "Running",
  "Cycling",
  "Hiking",
  "Pickleball"
];