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
import { NewUser } from '@/States/Users';
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

    const NewUserDatas = useRecoilState(NewUser);
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
                    <div className="bloc border">
                        <section className="login_form border">
                            <span className="border TitleForm">
                                Renseignez les données du nouvel Appartement
                            </span>
                            <InputField
                                labelText="email/Tél"
                                placeholderText="Hydro@gmail.com/+243"
                                form_name="Login"
                                type="text"
                                recoilAtom={NewUserDatas}
                                identity={0}
                            />
                            <InputField
                                labelText="password"
                                placeholderText="******"
                                form_name="Login"
                                type="password"
                                recoilAtom={NewUserDatas}
                                identity={1}
                            />
                            <InputField
                                type="button"
                                placeholderText="Login"
                                form_name="Login"
                                recoilAtom={NewUserDatas}
                            />
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
