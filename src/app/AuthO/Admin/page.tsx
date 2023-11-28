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
import Link from 'next/link';

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
                    <section className="ProfilPage">
                        <span className="pagePath">Pages/Main</span>
                        <div className="MainPage">
                            <div className="Title">
                                Gérez les menages et les sous compteurs faisant
                                partie de votre Reseau
                            </div>
                            <p className="text">
                                Ajouter, supprimer des Menages, mettre à jour
                                les données des utilisateurs, arreter et mettre
                                à marche les electrovannes, envoyez des Alertes
                                aux utilisateur, etc.
                            </p>
                            <div className="containerLinks">
                                <Link
                                    href={'/AuthO/Admin/Menages'}
                                    className="btnToMenages"
                                >
                                    Gérez les Menages
                                </Link>
                                <Link
                                    href={'/AuthO/Admin/Compteurs'}
                                    className="btnToCompteurs"
                                >
                                    Gérez les Compteurs
                                </Link>
                            </div>
                        </div>
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
