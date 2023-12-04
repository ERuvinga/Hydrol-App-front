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
import { AllUsers } from '@/States/Users';
import { ArrowPathIcon, PlusIcon } from '@heroicons/react/24/outline';
import CardUsers from '@/Components/commonComponents/cardUser';

const Index = () => {
    // states and atoms
    const [loadingPage, setLoadingPage] = useState(false);
    const [searchUsers, setSearchUsers] = useState(true);
    const [ReloadUsers, setReloadUsers] = useState(false);
    const [DatasOfAuthUser, setDatasOfAuthUser]: any = useRecoilState(AuthUser);
    const [AllUserByAdmin, setAllUserByAdmin]: any = useRecoilState(AllUsers);
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
                    <AdminNav
                        name={DatasOfAuthUser.name}
                        email={DatasOfAuthUser.email}
                        Tel={DatasOfAuthUser.tel}
                        image={DatasOfAuthUser.picture}
                    />
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
                                                date={value.registerDate}
                                                key={index}
                                                id_Card={index}
                                                idUser={value._id}
                                                reloadFunction={setReloadUsers}
                                                reloadState={ReloadUsers}
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
