export interface UpdateUserRequestDto {
  id: number;
  name?: string;
  surname?: string;
  phone?: string;
  username?: string | null;
}
