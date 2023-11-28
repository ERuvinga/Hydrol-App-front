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

const Index = () => {
    // states and atoms
    const [loadingPage, setLoadingPage] = useState(false);
    const [DatasOfAuthUser, setDatasOfAuthUser]: any = useRecoilState(AuthUser);
    const Api_Url = useRecoilValue(Link_toApi);

    //initializ States
    const Router = useRouter();

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
                    <AdminNav
                        name={DatasOfAuthUser.name}
                        email={DatasOfAuthUser.email}
                        Tel={DatasOfAuthUser.tel}
                        image={DatasOfAuthUser.picture}
                    />
                    <div className="LoaderPage">
                        <Loading WhiteOrBlack={false} />
                        <span className="loadingText">
                            Connexion au Sous-Compteur d`eau...
                        </span>
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
