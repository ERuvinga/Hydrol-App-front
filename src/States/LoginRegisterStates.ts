// file content principals states of App
import {atom}  from "recoil";

export const loginDataState = atom({
    key:"loginDataState",
    default:{
        email:"",
        passWord: "",
    }
});

export const messageOfServer = atom({
    key:"messageOfServer",
    default:{
        content:"No Message Content",
        stateMsg:false
    }
});

export const registerDataState = atom({
    key:"registerDataState",
    default:{
        matricule:"",
        passWord:"",
        confirmpassWord:""
    }
});

export const errorLogRegisterForm = atom({
    key:"errorLogRegisterForm",
    default:{
        disabledBtn:true,
        invalidEmail: false,
        invalidMatricule: false,
        pswdAndCofirmPswd:false,
    }
});

export const Link_toApi = atom({
    key: "Link_toApi",
    default:{
        remoteLink: "https://shule-app.onrender.com",
        localLink: "http://127.0.0.1:4002"
    }
});
 // export states
