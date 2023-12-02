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

const urlToEsp8266 = atom({
    key:"urlToEsp8266",
    default:"http://192.168.43.76"
});

const compteurDatas = atom({
    key:"ReloadDatasOfEsp",
    default:[
        {
            litre:0,
            vitesse:0
        },{
            litre:0,
            vitesse:0
        },
    ]
})

export{
    AllUsers,
    SelectedUser,
    NewUser,
    compteurDatas,
    urlToEsp8266
}