import { urlToEsp8266 } from '@/States/Users';
import { DateReadDatas } from '@/app/Lib/Date';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface waterDatas {
    idAppart: number;
    nameUser: string;
    litres: number;
    ecoul: number;
    stateElectroVanne?: boolean;
    typeAccount: string;
    timeDatas: number;
}

const CardWater = (datas: waterDatas) => {
    const [StateVanne, setStateVanne] = useState(1);
    const linkToEsp = useRecoilValue(urlToEsp8266);

    useEffect(() => {
        fetch(`${linkToEsp}/${datas.idAppart}/ReadStateVanne`)
            .then((datas) => {
                datas.text().then((responseEsp) => {
                    setStateVanne(parseInt(responseEsp));
                });
            })
            .catch((error) => console.log(error));
    }, []);

    const ChangeStateVanne = () => {
        fetch(`${linkToEsp}/${datas.idAppart}/StateVanne`)
            .then((datas) => {
                datas.text().then((responseEsp) => {
                    const Datas = responseEsp.split(':');
                    setStateVanne(parseInt(Datas[1]));
                });
            })
            .catch((error) => console.log(error));
    };

    return (
        <section className="ContainerDatasSubComptr ">
            <div className="Compteur ">
                <div className="HeadeDatas">
                    <span>
                        compteur :{' '}
                        <span className="cibleH">
                            {`Appartement ${datas.idAppart}`}
                        </span>
                    </span>
                    <span>
                        Utilisateur :{' '}
                        <span className="cibleH">{datas.nameUser}</span>
                    </span>
                </div>
                <div className=" DatasView">
                    <div className="CircleContainer">
                        <span className="textDescr">
                            Eau Consomée en Litre(s)
                        </span>
                        <span className="Values">{datas.litres}</span>
                    </div>
                </div>
                <div className="footerCard">
                    <div className=" Datas">
                        <span className=" value">{`${datas.ecoul} litre(s)/min`}</span>
                        <span className=" description">Ecoulement</span>
                    </div>
                    <div className=" Datas">
                        <span className="value ">
                            {DateReadDatas(datas.timeDatas)}
                        </span>
                        <span className=" description">Aujourd`hui</span>
                    </div>
                </div>
            </div>
            <div className=" stateVanne">
                <span className="title ">Status de l`electro Vanne</span>
                <span className="descr">
                    <span>ElectroVanne :</span>
                    <span className={StateVanne ? 'cibleTrue' : 'cibleFalse'}>
                        {StateVanne ? 'Allumé' : 'Stoppé'}
                    </span>
                </span>
                <div className="ContainerBtn">
                    {datas.typeAccount === 'Admin' ? (
                        <button
                            onClick={() => {
                                ChangeStateVanne();
                            }}
                            className={
                                StateVanne
                                    ? 'btnElectrovanne Stopped'
                                    : 'btnElectrovanne Start'
                            }
                        >
                            {StateVanne ? 'Stoper' : 'Alimenter'}
                        </button>
                    ) : null}
                </div>
            </div>
        </section>
    );
};

export default CardWater;
