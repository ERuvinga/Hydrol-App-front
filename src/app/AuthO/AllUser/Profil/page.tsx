'use client';

//Atoms
import { AuthUser } from '@/States/AuthUser';

// Libs
import AuthNav from '@/Components/commonComponents/NavAuthUser';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Link_toApi } from '@/States/LoginRegisterStates';
import { useEffect, useState } from 'react';
import { withAuth } from '@/app/Lib/Auth';
import { useRouter } from 'next/navigation';
import Loading from '@/Components/loading';
import Image from 'next/image';

const ProfilPage = () => {
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
        console.log(DatasOfAuthUser);
    }, []);

    return (
        <>
            {loadingPage || DatasOfAuthUser ? (
                <>
                    <AuthNav
                        name={DatasOfAuthUser.name}
                        email={DatasOfAuthUser.email}
                        Tel={DatasOfAuthUser.tel}
                        image={DatasOfAuthUser.picture}
                    />
                    <section className="ProfilPage">
                        <span className="pagePath">Pages/Profil</span>
                        <Image
                            className="profilImage"
                            src={
                                DatasOfAuthUser.picture != ''
                                    ? DatasOfAuthUser.picture
                                    : '/img/profile.png'
                            }
                            width={100}
                            height={100}
                            alt="Profil image"
                        />
                        <div className="DatasOfUser">
                            <div className="containerDatas">
                                <span className="DesrcDatas">Nom :</span>
                                <span className="valueOfDescr">
                                    {DatasOfAuthUser.name}
                                </span>
                            </div>
                            <div className="containerDatas">
                                <span className="DesrcDatas">Matricule :</span>
                                <span className="valueOfDescr">
                                    {`${DatasOfAuthUser._id}`}
                                </span>
                            </div>
                            <div className="containerDatas">
                                <span className="DesrcDatas">Tél :</span>
                                <span className="valueOfDescr">
                                    {DatasOfAuthUser.tel}
                                </span>
                            </div>
                            <div className="containerDatas">
                                <span className="DesrcDatas">email :</span>
                                <span className="valueOfDescr">
                                    {DatasOfAuthUser.email}
                                </span>
                            </div>
                            <div className="containerDatas">
                                <span className="DesrcDatas">
                                    Compte Actif:
                                </span>
                                <span className="valueOfDescr">
                                    {DatasOfAuthUser.stateAccount
                                        ? 'Oui'
                                        : 'Non'}
                                </span>
                            </div>
                            <div className="containerDatas">
                                <span className="DesrcDatas">
                                    Date d`inscr :
                                </span>
                                <span className="valueOfDescr">
                                    {DatasOfAuthUser.registerDate}
                                </span>
                            </div>
                            <div className="containerDatas">
                                <span className="DesrcDatas">
                                    Admin du Reseau :
                                </span>
                                <span className="valueOfDescr">
                                    {DatasOfAuthUser.idOfAdmin}
                                </span>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <div className="LoaderPage">
                    <Loading WhiteOrBlack={false} />
                    <span className="loadingText">Chargement ...</span>
                </div>
            )}
        </>
    );
};

export default ProfilPage;
