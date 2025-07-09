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
    has_office: boolean;
    lat: number;
    long: number;
    created_at: Date;
    updated_at: Date;
    image_uri: string;
}


export interface SearchLocationFilters {
    query?: string;
    sports_offered?: string[];
    has_office?: boolean;
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



export function sanitizeUserData(user: User) {
    return {
        id: user.id,
        email: user.email,
        display_name: user.display_name,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        date_of_birth: user.date_of_birth,
        sports_preferences: user.sports_preferences,
        profile_pic: user.profile_pic,
        location: user.location,
        visibility: user.visibility,
        created_at: user.created_at,
        updated_at: user.updated_at
    };
}

