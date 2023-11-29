//Natives Lib
'use client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

//Components
import Notification from '@/Components/commonComponents/NotificationLogReg';
import InputField from '@/Components/commonComponents/FieldInputNewUser';
import BackHome from '@/Components/commonComponents/BackHome';

//state
import { Link_toApi, messageOfServer } from '@/States/LoginRegisterStates';
import { AuthUser } from '@/States/AuthUser';
import { withAuth } from '@/app/Lib/Auth';
import { useRouter } from 'next/navigation';
import Loading from '@/Components/loading';

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

    const [StateNotification, setStateNotification] =
        useRecoilState(messageOfServer);

    useEffect(() => {
        setStateNotification({
            ...StateNotification,
            stateMsg: false,
        });
    }, []);
    return (
        <>
            {loadingPage || DatasOfAuthUser ? (
                <section className="body_log_reg">
                    <BackHome link="/AuthO/Admin/Menages" />
                    {StateNotification.stateMsg && <Notification />}
                    <div className="bloc">
                        <section className="login_form ">
                            <span className=" TitleForm">
                                Renseignez les données du nouvel Appartement
                            </span>
                            <InputField
                                labelText="pre-nom"
                                placeholderText="Elie"
                                type="text"
                                identity={0}
                            />
                            <InputField
                                labelText="nom"
                                placeholderText="Ruvinga"
                                type="text"
                                identity={1}
                            />
                            <InputField
                                labelText="email"
                                placeholderText="Hydro@gmail.com"
                                type="text"
                                identity={2}
                            />
                            <InputField
                                labelText="tel"
                                placeholderText="+243"
                                type="text"
                                identity={3}
                            />
                            <InputField type="button" placeholderText="Crée" />
                        </section>
                    </div>
                </section>
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
