export interface User {
    id: number;
    email: string;
    password: string;
    display_name: string;
    first_name: string;
    last_name: string;
    username: string;
    date_of_birth: Date;
    created_at: Date;
    updated_at: Date;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  display_name: string;
  first_name: string;
  last_name: string;
  username: string;
  date_of_birth: string | Date;
}

export interface Post {
    id: number;
    user_id: number;
    location: string;
    sports: string[];
    num_people: number | null;
    wait_time: string | null;
    skill_level: string | null;
    session_length: string;
    images: string[];
    caption: string | null;
    win_loss: number | null;
    games_played: number | null;
    visibility: boolean;
    created_at: Date;
    updated_at: Date;
}

export function sanitizeUserData(user: User) {
    return {
        id: user.id,
        email: user.email,
        display_name: user.display_name,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        date_of_birth: user.date_of_birth,
        created_at: user.created_at,
        updated_at: user.updated_at
    };
}

