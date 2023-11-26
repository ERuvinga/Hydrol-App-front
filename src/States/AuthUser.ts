import { atom } from "recoil";

const AuthUser = atom({
    key:"AuthUser",
    default:null
});

export {
    AuthUser
}