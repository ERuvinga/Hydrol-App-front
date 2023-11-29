import { atom } from "recoil";

const AllUsers = atom({
    key:"AllUsers",
    default:null
});

const SelectedUser = atom({
    key:"SelectedUser",
    default:""
});

const NewUser = atom({
    key:"NewUser",
    default:{
        name:'',
        SecondeName:'',
        email:'',
        tel:''
    }
})

export{
    AllUsers,
    SelectedUser,
    NewUser
}