import { ITokenService, TokenPayload } from "../../application/interfaces/ITokenService";
export declare class JwtTokenService implements ITokenService {
    private readonly secretKey;
    constructor();
    generate(payload: TokenPayload): string;
    verify(token: string): TokenPayload | null;
}
