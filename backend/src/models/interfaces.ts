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
    is_oauth: boolean;
    skill_level: string;
    created_at: Date;
    updated_at: Date;
}

export interface Post {
    id: number;
    user_id: number;
    location_id: string;
    sport: string;
    num_people: number | null;
    wait_time: string | null;
    skill_level: string | null;
    session_length: string;
    content: string[];
    caption: string | null;
    win_loss: number | null;
    games_played: number | null;
    visibility: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface Session {
    id: string;
    user_id: number;
    expires_at: Date;
    token?: string;
}

export interface Location {
    id : number;
    name: string;
    address: string;
    sports_offered: string[];
    lat: number;
    long: number;
    image_uri: string;
    created_at: Date;
    updated_at: Date;
}


export interface SearchLocationFilters {
    query?: string;
    sports_offered?: string[];
    lat?: number;
    long?: number;
    radius?: number;
    page?: number;
    pageSize?: number;
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export type SessionValidationResult =
    | { session: Session; user: User }
    | { session: null; user: null };


