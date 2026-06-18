export interface CreateUserProps {
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    username?: string | null;
    verified?: boolean;
    roleId: number;
}
export declare class User {
    readonly id: number | null;
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    username: string | null;
    verified: boolean;
    roleId: number;
    readonly createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    constructor(id: number | null, name: string, surname: string, email: string, password: string, phone: string, username: string | null, verified: boolean, roleId: number, createdAt?: Date | undefined, updatedAt?: Date | undefined);
    static create(props: CreateUserProps): User;
    updateProfile(props: {
        name?: string;
        surname?: string;
        phone?: string;
        username?: string | null;
    }): void;
}
