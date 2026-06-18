import jwt from "jsonwebtoken";
import config from "config";
import {
  ITokenService,
  TokenPayload,
} from "../../application/interfaces/ITokenService";

export class JwtTokenService implements ITokenService {
  private readonly secretKey: string;

  constructor() {
    this.secretKey = config.get<string>("jwtPrivateKey");
  }

  generate(payload: TokenPayload): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: "1h" });
  }

  verify(token: string): TokenPayload | null {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      if (typeof decoded === "string") {
        return null;
      }
      return decoded as TokenPayload;
    } catch {
      return null;
    }
  }
}
