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
import { compteurDatas } from '@/States/Users';
import { AllUsers } from '@/States/Users';
import CardWater from '@/Components/commonComponents/CardWaterView';

const Index = () => {
    // states and atoms
    const [loadingPage, setLoadingPage] = useState(false);
    const [ConnectionToEsp, setConnectionToEsp] = useState(true);
    const [ReloadDatasOfEsp, setReloadDatasOfEsp] = useState(false);
    const [DatasOfAuthUser, setDatasOfAuthUser]: any = useRecoilState(AuthUser);
    const [AllUserByAdmin, setAllUserByAdmin]: any = useRecoilState(AllUsers);
    const [ConsumDatas, setConsumDatas]: any = useRecoilState(compteurDatas);
    const Api_Url = useRecoilValue(Link_toApi);
    console.log(DatasOfAuthUser);
    //initializ States
    const Router = useRouter();
    const timeDatas = new Date(Date.now());

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

    useEffect(() => {
        setConnectionToEsp(false);
    }, [ReloadDatasOfEsp]);
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
                            <section className=" ContainerDatasOfComteurs">
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
                                                Eau Consomée en Litre(s)
                                            </span>
                                            <span className="Values">
                                                {ConsumDatas[0].litre +
                                                    ConsumDatas[1].litre}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="footerCard">
                                        <div className=" Datas">
                                            <span className=" value">{`${ConsumDatas[0].vitesse}-${ConsumDatas[1].vitesse} litre(s)/min`}</span>
                                            <span className=" description">
                                                Ecoulement
                                            </span>
                                        </div>
                                        <div className=" Datas">
                                            <span className="value ">
                                                {`${timeDatas.getHours()}h${timeDatas.getHours()}`}
                                            </span>
                                            <span className=" description">
                                                Aujour`hui
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <>
                                    {AllUserByAdmin.map(
                                        (value: any, index: any) => (
                                            <CardWater
                                                key={index}
                                                idAppart={index + 1}
                                                nameUser={value.name}
                                                litres={
                                                    ConsumDatas[index].litre
                                                }
                                                ecoul={
                                                    ConsumDatas[index].vitesse
                                                }
                                                stateElectroVanne={index}
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
