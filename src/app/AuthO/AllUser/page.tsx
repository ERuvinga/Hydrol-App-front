'use client';
//Libs App
import { withAuth } from '@/app/Lib/Auth';
import Loading from '@/Components/loading';
import { AuthUser } from '@/States/AuthUser';
import { Link_toApi } from '@/States/LoginRegisterStates';
import AuthNav from '@/Components/commonComponents/NavAuthUser';

//Next Libs
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';
import CardWater from '@/Components/commonComponents/CardWaterView';
import { urlToEsp8266, SubCompter } from '@/States/Users';
import { savingDataOfSubComptEsp } from '@/app/Lib/datasEsp';

const Index = () => {
    // states and atoms
    const [loadingPage, setLoadingPage] = useState(false);
    const [ConnectionToEsp, setConnectionToEsp] = useState(true);
    const [DatasOfAuthUser, setDatasOfAuthUser]: any = useRecoilState(AuthUser);
    const [DatasSubComptr, setDatasSubComptr]: any = useRecoilState(SubCompter);
    const Api_Url = useRecoilValue(Link_toApi);
    const Esp_Url = useRecoilValue(urlToEsp8266);
    const [timeDatas, setTimeDatas] = useState(Date.now());
    const [VannesState, setStateVannes] = useState(1);
    //initializ States
    const Router = useRouter();

    useEffect(() => {
        if (DatasOfAuthUser) {
            setInterval(() => {
                fetch(`${Esp_Url}/${DatasOfAuthUser.idCompteur}/ReadStateVanne`)
                    .then((datas) => {
                        datas.text().then((responseEsp) => {
                            setStateVannes(parseInt(responseEsp));
                        });
                    })
                    .catch((error) => console.log(error));

                fetch(`${Esp_Url}/${DatasOfAuthUser.idCompteur}/ReadDatas`)
                    .then((datas) => {
                        datas.text().then((responseEsp) => {
                            const Datas = responseEsp.split('_');
                            savingDataOfSubComptEsp(Datas, setDatasSubComptr);
                            setConnectionToEsp(false);
                            setTimeDatas(Date.now());
                        });
                    })
                    .catch((error) => console.log(error));
            }, 5000);
        }
    }, [DatasOfAuthUser]);

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
    return (
        <>
            {loadingPage || DatasOfAuthUser ? (
                <main className="AppContainer">
                    <AuthNav
                        name={DatasOfAuthUser.name}
                        email={DatasOfAuthUser.email}
                        Tel={DatasOfAuthUser.tel}
                        image={DatasOfAuthUser.picture}
                    />
                    <section>
                        {ConnectionToEsp ? (
                            <div className="LoaderPage">
                                <Loading WhiteOrBlack={false} />
                                <span className="loadingText">
                                    Connexion au Sous-Compteur d`eau...
                                </span>
                            </div>
                        ) : (
                            <section className=" ContainerDatasOfComteurs">
                                <CardWater
                                    idAppart={DatasOfAuthUser.idCompteur}
                                    litres={DatasSubComptr.litre}
                                    ecoul={DatasSubComptr.vitesse}
                                    typeAccount={DatasOfAuthUser.typeAccount}
                                    nameUser={DatasOfAuthUser.name}
                                    timeDatas={timeDatas}
                                    stateVanne={VannesState}
                                />
                            </section>
                        )}
                    </section>
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
