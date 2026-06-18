export class Email {
  private constructor(private readonly value: string) {}

  static create(email: string): Email {
    const normalized = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      throw new Error("Invalid email format");
    }
    return new Email(normalized);
  }

  toString(): string {
    return this.value;
  }
}
