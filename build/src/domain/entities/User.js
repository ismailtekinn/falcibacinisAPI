"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, surname, email, password, phone, username, verified, roleId, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.username = username;
        this.verified = verified;
        this.roleId = roleId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(props) {
        var _a, _b;
        return new User(null, props.name, props.surname, props.email, props.password, props.phone, (_a = props.username) !== null && _a !== void 0 ? _a : null, (_b = props.verified) !== null && _b !== void 0 ? _b : false, props.roleId);
    }
    updateProfile(props) {
        if (props.name !== undefined)
            this.name = props.name;
        if (props.surname !== undefined)
            this.surname = props.surname;
        if (props.phone !== undefined)
            this.phone = props.phone;
        if (props.username !== undefined)
            this.username = props.username;
        this.updatedAt = new Date();
    }
}
exports.User = User;
