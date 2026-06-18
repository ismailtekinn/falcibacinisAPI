import { IHasher } from "../../application/interfaces/IHasher";
export declare class BcryptHasher implements IHasher {
    private readonly saltRounds;
    constructor(saltRounds?: number);
    hash(plainText: string): Promise<string>;
    compare(plainText: string, hashed: string): Promise<boolean>;
}
