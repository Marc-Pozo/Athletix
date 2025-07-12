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
  skill_level: string;
  created_at: Date;
  updated_at: Date;
}
export interface Location {
  id : string;
  name: string;
  address: string;
  sports_offered: string[];
  lat: number;
  long: number;
  created_at: Date;
  updated_at: Date;
  image_uri: string;
  place_id: string;
}

export interface Post {
  id: number;
  user_id: number;
  num_people: number;
  wait_time: string;
  skill_level: string;
  session_length: string;
  content: string[];
  caption: string;
  win_loss: number;
  games_played: number;
  location_id: string;
  sport: string;
  created_at: Date;
  updated_at: Date;
}

export interface DiscoverProps {
  lat: string ,
  long: string ,
  token: string
}


export const skillLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Semi-Pro",
  "Pro",
  "Casual",
  "Mixed",
  "N/A"
]


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