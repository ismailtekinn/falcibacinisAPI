export interface UserResponseDto {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    username: string | null;
    verified: boolean;
    roleId: number;
    createdAt: Date;
    updatedAt: Date;
}
