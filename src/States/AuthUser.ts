import { atom } from "recoil";

const AuthUser = atom({
    key:"AuthUser",
    default:{
        name: "Elie Ruvinga",
        typeAccount:"Admin"
    }
});

export {
    AuthUser
}