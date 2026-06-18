"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
class Email {
    constructor(value) {
        this.value = value;
    }
    static create(email) {
        const normalized = email.trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
            throw new Error("Invalid email format");
        }
        return new Email(normalized);
    }
    toString() {
        return this.value;
    }
}
exports.Email = Email;
