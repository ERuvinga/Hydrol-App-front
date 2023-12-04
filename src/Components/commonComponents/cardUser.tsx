import { IdOfdeletingUser } from '@/States/Users';
import { Cog6ToothIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useSetRecoilState } from 'recoil';

interface User {
    name: string;
    tel: string;
    email: string;
    picture: string;
    date: number;
    id_Card: number;
    idUser: string;
    SetConfirmDelete: any;
}

const CardUsers = (datas: User) => {
    const SetIdOfDeletedUser = useSetRecoilState(IdOfdeletingUser);

    return (
        <div className="Card">
            <div className="ContainerPicture">
                {datas ? ( //Change it with a data corresponde => datas.picture
                    <span className="TextAppart">
                        Appartement {datas.id_Card + 1}
                    </span>
                ) : null}
            </div>
            <div className="cardDatas">
                <span className="name">{datas.name}</span>
                <div className="coordoUser">
                    <span className="email">
                        <span className="nameValue">email : </span>
                        {datas.email}
                    </span>
                    <span className="tel">
                        <span className="nameValue">Tel : </span>
                        {datas.tel}
                    </span>
                    <span className="date">
                        <span className="nameValue">Crée : </span>
                        {datas.date}
                    </span>
                </div>
            </div>
            <div className="ContainerBtn ">
                <button
                    className="btnDeleted"
                    onClick={() => {
                        datas.SetConfirmDelete(true);
                        SetIdOfDeletedUser(datas.idUser);
                    }}
                >
                    <TrashIcon className="Icone" />
                </button>
                <span className="Btn">
                    <Cog6ToothIcon className="Icone" />
                </span>
            </div>
        </div>
    );
};
export default CardUsers;
