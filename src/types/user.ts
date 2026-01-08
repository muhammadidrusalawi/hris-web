export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export type UsersResponse = User[];