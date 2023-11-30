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
});

const compteurDatas = atom({
    key:"ReloadDatasOfEsp",
    default:[
        {
            litre:30,
            vitesse:3
        },{
            litre:24,
            vitesse:1
        },
    ]
})

export{
    AllUsers,
    SelectedUser,
    NewUser,
    compteurDatas
}