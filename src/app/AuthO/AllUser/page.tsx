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

const Index = () => {
    // states and atoms
    const [loadingPage, setLoadingPage] = useState(false);
    const [ConnectionToEsp, setConnectionToEsp] = useState(false);
    const [DatasOfAuthUser, setDatasOfAuthUser]: any = useRecoilState(AuthUser);
    const Api_Url = useRecoilValue(Link_toApi);

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
        console.log(DatasOfAuthUser);
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
                                    idAppart={0}
                                    litres={20}
                                    ecoul={2}
                                    typeAccount={DatasOfAuthUser.typeAccount}
                                    nameUser={DatasOfAuthUser.name}
                                    timeDatas={0}
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
