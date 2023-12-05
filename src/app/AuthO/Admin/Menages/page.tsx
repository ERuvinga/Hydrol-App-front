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

//Atoms
import { AllUsers, compteurDatas } from '@/States/Users';
import {
    ArrowPathIcon,
    PlusIcon,
    PrinterIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import CardUsers from '@/Components/commonComponents/cardUser';
import WrapperCompnent from '@/Components/commonComponents/wrapperComponent';
import { nowDate } from '@/app/Lib/Date';

const Index = () => {
    // states
    const [MainPage, setMainPage] = useState(true);
    const [loadingPage, setLoadingPage] = useState(false);
    const [searchUsers, setSearchUsers] = useState(true);
    const [ReloadUsers, setReloadUsers] = useState(false);
    const [ConfirmDelete, setConfirmDelete] = useState(false);
    const [userSelected, setUserSelected] = useState(0);
    const litre_$ = 0.5;

    //Atoms
    const [DatasOfAuthUser, setDatasOfAuthUser]: any = useRecoilState(AuthUser);
    const [AllUserByAdmin, setAllUserByAdmin]: any = useRecoilState(AllUsers);
    const ValueOfCompter = useRecoilValue(compteurDatas);
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

    useEffect(() => {
        setSearchUsers(true);
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
                        console.log(datasOfAllusers.AllUsers);
                        setTimeout(() => {
                            setSearchUsers(false);
                        }, 1500);
                    });
                }
            })
            .catch((er: any) => console.log(er));
    }, [ReloadUsers]);
    return (
        <>
            {loadingPage || DatasOfAuthUser ? (
                <main className="AppContainer">
                    <div className="NavBarnoPrinting">
                        <AdminNav
                            name={DatasOfAuthUser.name}
                            email={DatasOfAuthUser.email}
                            Tel={DatasOfAuthUser.tel}
                            image={DatasOfAuthUser.picture}
                        />
                    </div>
                    <>
                        {MainPage ? (
                            <section
                                className="
                    DisplayDatasOfUser"
                            >
                                <span className="RefreshDatas">
                                    <Link href="/AuthO/Admin/Menages/NewUser">
                                        <span className="PlusBtn">
                                            <PlusIcon className="Icone" />
                                        </span>
                                    </Link>
                                    <span
                                        className="ReloadBtn"
                                        onClick={() => {
                                            setReloadUsers(!ReloadUsers);
                                        }}
                                    >
                                        <ArrowPathIcon className="Icone" />
                                    </span>
                                </span>
                                {searchUsers || !AllUserByAdmin ? (
                                    <div className="LoadingUsers">
                                        <Loading WhiteOrBlack={false} />
                                        <span className="loadingText">
                                            Recherche d`Utilisateurs ...
                                        </span>
                                    </div>
                                ) : (
                                    <div className="containerCards">
                                        {AllUserByAdmin.length ? (
                                            AllUserByAdmin.map(
                                                (value: any, index: any) => (
                                                    <CardUsers
                                                        name={value.name}
                                                        email={value.email}
                                                        tel={value.tel}
                                                        picture={value.picture}
                                                        date={
                                                            value.registerDate
                                                        }
                                                        key={index}
                                                        id_Card={index}
                                                        idUser={value._id}
                                                        SetConfirmDelete={
                                                            setConfirmDelete
                                                        }
                                                        SetMainPage={
                                                            setMainPage
                                                        }
                                                        setUserSelected={
                                                            setUserSelected
                                                        }
                                                    />
                                                )
                                            )
                                        ) : (
                                            <span className="notfundUser">
                                                O`oops! Aucun utilisateur Trouvé
                                            </span>
                                        )}
                                    </div>
                                )}
                            </section>
                        ) : (
                            <section className="DisplayDatasOfUser">
                                <span className="ReturnToMain">
                                    <span
                                        className="ReturnMainPageBtn"
                                        onClick={() => {
                                            setMainPage(!MainPage);
                                        }}
                                    >
                                        <XMarkIcon className="Icone" />
                                    </span>
                                </span>
                                <div className="SateOut">
                                    <span className="title">
                                        Facture de consommation d`eau
                                    </span>
                                    <div className="ContainerIdUser">
                                        <div className="AdminUser">
                                            <span className="idFacture">
                                                ID_ Administrateur
                                            </span>
                                            <span>
                                                Nom:{' '}
                                                <span className="cible">
                                                    {DatasOfAuthUser.name}
                                                </span>
                                            </span>
                                            <span>
                                                Tél:{' '}
                                                <span className="cible">
                                                    {DatasOfAuthUser.tel}
                                                </span>
                                            </span>
                                            <span>
                                                email:{' '}
                                                <span className="cible">
                                                    {DatasOfAuthUser.email}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="SubComptr">
                                            <span className="idFacture">
                                                ID_ sous compteur
                                            </span>
                                            <span>
                                                Nom:{' '}
                                                <span className="cible">
                                                    {
                                                        AllUserByAdmin[
                                                            userSelected
                                                        ].name
                                                    }
                                                </span>
                                            </span>
                                            <span>
                                                Tél:{' '}
                                                <span className="cible">
                                                    {
                                                        AllUserByAdmin[
                                                            userSelected
                                                        ].tel
                                                    }
                                                </span>
                                            </span>
                                            <span>
                                                email:{' '}
                                                <span className="cible">
                                                    {
                                                        AllUserByAdmin[
                                                            userSelected
                                                        ].email
                                                    }
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="containerDatasFacture">
                                        <span className="noStateOut">
                                            No Compteur:{' '}
                                            <span className="cible">
                                                000
                                                {
                                                    AllUserByAdmin[userSelected]
                                                        .idCompteur
                                                }
                                            </span>
                                        </span>
                                        <span className="noStateOut">
                                            No Facture:{' '}
                                            <span className="cible">
                                                000
                                                {AllUserByAdmin[userSelected]
                                                    .idCompteur - 1}
                                            </span>
                                        </span>
                                        <span className="noStateOut">
                                            Date:{' '}
                                            <span className="cible">
                                                {nowDate(Date.now())}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="ContainerConsommation">
                                        <span className="noStateOut">
                                            Litres Consommés:{' '}
                                            <span className="cible">
                                                {
                                                    ValueOfCompter[userSelected]
                                                        .litre
                                                }
                                            </span>
                                        </span>
                                        <span className="noStateOut">
                                            $/Litre:{' '}
                                            <span className="cible">
                                                {litre_$}$
                                            </span>
                                        </span>
                                        <span className="noStateOut">
                                            Total à payer:{' '}
                                            <span className="cible">
                                                {litre_$ *
                                                    ValueOfCompter[userSelected]
                                                        .litre}
                                                $
                                            </span>
                                        </span>
                                    </div>
                                    <div className="containerprintBtn">
                                        <button
                                            className="printStateOutBtn"
                                            onClick={() => {
                                                window.print();
                                            }}
                                        >
                                            <PrinterIcon className="Icone" />
                                        </button>
                                    </div>
                                </div>
                            </section>
                        )}
                    </>
                </main>
            ) : (
                <div className="LoaderPage">
                    <Loading WhiteOrBlack={false} />
                    <span className="loadingText">Chargement ...</span>
                </div>
            )}
            <>
                {ConfirmDelete ? (
                    <WrapperCompnent
                        text={'Voulez-vous Supprimer cet compte?'}
                        Action={'deleting'}
                        setStatePopup={setConfirmDelete}
                        seteStateReloadingPage={setReloadUsers}
                        reloadingPageState={ReloadUsers}
                    />
                ) : null}
            </>
        </>
    );
};

export default Index;
