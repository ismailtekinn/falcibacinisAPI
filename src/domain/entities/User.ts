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

export class User {
  constructor(
    public readonly id: number | null,
    public name: string,
    public surname: string,
    public email: string,
    public password: string,
    public phone: string,
    public username: string | null,
    public verified: boolean,
    public roleId: number,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  static create(props: CreateUserProps): User {
    return new User(
      null,
      props.name,
      props.surname,
      props.email,
      props.password,
      props.phone,
      props.username ?? null,
      props.verified ?? false,
      props.roleId,
    );
  }

  updateProfile(props: {
    name?: string;
    surname?: string;
    phone?: string;
    username?: string | null;
  }): void {
    if (props.name !== undefined) this.name = props.name;
    if (props.surname !== undefined) this.surname = props.surname;
    if (props.phone !== undefined) this.phone = props.phone;
    if (props.username !== undefined) this.username = props.username;
    this.updatedAt = new Date();
  }
}
