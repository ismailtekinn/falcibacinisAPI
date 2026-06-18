export interface IHasher {
    hash(plainText: string): Promise<string>;
    compare(plainText: string, hashed: string): Promise<boolean>;
}
