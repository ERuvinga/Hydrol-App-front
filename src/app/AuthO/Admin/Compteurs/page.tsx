'use client';
//Libs App
import { withAuth } from '@/app/Lib/Auth';
import Loading from '@/Components/loading';
import { AuthUser } from '@/States/AuthUser';
import { Link_toApi } from '@/States/LoginRegisterStates';

//Next Libs
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';
import AdminNav from '@/Components/commonComponents/NavAuthAdmin';
import { compteurDatas, urlToEsp8266 } from '@/States/Users';
import { AllUsers } from '@/States/Users';
import CardWater from '@/Components/commonComponents/CardWaterView';
import { savingDataOfEsp } from '@/app/Lib/datasEsp';
import { DateReadDatas } from '@/app/Lib/Date';

const Index = () => {
    // states and atoms
    const [loadingPage, setLoadingPage] = useState(false);
    const [ConnectionToEsp, setConnectionToEsp] = useState(true);
    const [ReloadDatasOfEsp, setReloadDatasOfEsp] = useState(false);
    const [DatasOfAuthUser, setDatasOfAuthUser]: any = useRecoilState(AuthUser);
    const [AllUserByAdmin, setAllUserByAdmin]: any = useRecoilState(AllUsers);
    const [ConsumDatas, setConsumDatas]: any = useRecoilState(compteurDatas);
    const Api_Url = useRecoilValue(Link_toApi);
    const Esp_Url = useRecoilValue(urlToEsp8266);
    const [timeDatas, setTimeDatas] = useState(Date.now());

    //initializ States
    const Router = useRouter();
    const TotalVolume = ConsumDatas[0].litre + ConsumDatas[1].litre;
    const TotalWaterFlow = `${ConsumDatas[0].vitesse}-${ConsumDatas[1].vitesse}`;

    useEffect(() => {
        // check if token of user is valid
        withAuth(
            Api_Url,
            localStorage.getItem('TokenUser'),
            setLoadingPage,
            setDatasOfAuthUser,
            DatasOfAuthUser,
            Router
        );

        // fetching Datas of Esp8266
        setInterval(() => {
            fetch(`${Esp_Url}/ReadDatas`)
                .then((datas) => {
                    datas.text().then((responseEsp) => {
                        const Datas = responseEsp.split('Ap2:');
                        savingDataOfEsp(Datas, setConsumDatas);
                        setConnectionToEsp(false);
                        setTimeDatas(Date.now());
                    });
                })
                .catch((error) => console.log(error));
        }, 5000);
    }, []);

    useEffect(() => {
        fetch(`${Api_Url.localLink}/Users`, {
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                Autorization: `Bearer ${localStorage.getItem('TokenUser')}`,
            },
        })
            .then((datas: any) => {
                if (datas.ok) {
                    datas.json().then((datasOfAllusers: any) => {
                        setAllUserByAdmin(datasOfAllusers.AllUsers);
                    });
                }
            })
            .catch((er: any) => console.log(er));
    }, []);

    return (
        <>
            {loadingPage || DatasOfAuthUser ? (
                <main className="AppContainer">
                    <AdminNav
                        name={DatasOfAuthUser.name}
                        email={DatasOfAuthUser.email}
                        Tel={DatasOfAuthUser.tel}
                        image={DatasOfAuthUser.picture}
                    />
                    <div>
                        {ConnectionToEsp || !AllUserByAdmin ? (
                            <div className="LoaderPage">
                                <Loading WhiteOrBlack={false} />
                                <span className="loadingText">
                                    Connexion au Sous-Compteur d`eau...
                                </span>
                            </div>
                        ) : (
                            <section className="ContainerDatasOfComteurs">
                                <div className="Compteur ">
                                    <div className="HeadeDatas">
                                        <span>
                                            compteur :{' '}
                                            <span className="cibleH">
                                                Principal
                                            </span>
                                        </span>
                                        <span>
                                            Utilisateur :{' '}
                                            <span className="cibleH">
                                                {DatasOfAuthUser.name}
                                            </span>
                                        </span>
                                    </div>
                                    <div className=" DatasView">
                                        <div className="CircleContainer">
                                            <span className="textDescr">
                                                Eau Consomée en Centilitre(s)
                                            </span>
                                            <span className="Values">
                                                {Math.round(TotalVolume * 10) /
                                                    10}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="footerCard">
                                        <div className=" Datas">
                                            <span className=" value">{`${TotalWaterFlow} litre(s)/min`}</span>
                                            <span className=" description">
                                                Ecoulement
                                            </span>
                                        </div>
                                        <div className=" Datas">
                                            <span className="value ">
                                                {DateReadDatas(timeDatas)}
                                            </span>
                                            <span className=" description">
                                                Aujourd`hui
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <>
                                    {AllUserByAdmin.map(
                                        (value: any, index: any) => (
                                            <CardWater
                                                timeDatas={timeDatas}
                                                key={index}
                                                idAppart={value.idCompteur}
                                                nameUser={value.name}
                                                litres={
                                                    ConsumDatas[
                                                        value.idCompteur - 1
                                                    ].litre
                                                }
                                                ecoul={
                                                    ConsumDatas[
                                                        value.idCompteur - 1
                                                    ].vitesse
                                                }
                                                typeAccount={
                                                    DatasOfAuthUser.typeAccount
                                                }
                                            />
                                        )
                                    )}
                                </>
                            </section>
                        )}
                    </div>
                </main>
            ) : (
                <div className="LoaderPage">
                    <Loading WhiteOrBlack={false} />
                    <span className="loadingText">Chargement ...</span>
                </div>
            )}
        </>
    );
};

export default Index;
