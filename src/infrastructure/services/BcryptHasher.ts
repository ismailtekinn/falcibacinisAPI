import bcrypt from "bcrypt";
import { IHasher } from "../../application/interfaces/IHasher";

const DEFAULT_SALT_ROUNDS = 10;

export class BcryptHasher implements IHasher {
  constructor(private readonly saltRounds: number = DEFAULT_SALT_ROUNDS) {}

  async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.saltRounds);
  }

  async compare(plainText: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashed);
  }
}
