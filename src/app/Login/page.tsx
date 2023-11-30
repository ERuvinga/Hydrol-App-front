//Natives Lib
'use client';
import { useRecoilState } from 'recoil';
import Link from 'next/link';
import { useEffect } from 'react';

//Components
import Notification from '@/Components/commonComponents/NotificationLogReg';
import InputField from '@/Components/commonComponents/FieldInputLogReg';
import BackHome from '@/Components/commonComponents/BackHome';

//state
import { loginDataState, messageOfServer } from '@/States/LoginRegisterStates';
//import { AuthUser } from '@/States/AuthUser';

const Index = () => {
    const logRegDatasOfUser = useRecoilState(loginDataState);
    //const DataOfUser = useRecoilValue(AuthUser);
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
            <section className="body_log_reg">
                <BackHome link="/" />
                {StateNotification.stateMsg && <Notification />}
                <div className="bloc">
                    <section className="login_form">
                        <img src="/img/logo.jpg" className="logo" alt="logo" />
                        <InputField
                            labelText="email/Tél"
                            placeholderText="Hydro@gmail.com/+243"
                            form_name="Login"
                            type="text"
                            recoilAtom={logRegDatasOfUser}
                            identity={0}
                        />
                        <InputField
                            labelText="password"
                            placeholderText="******"
                            form_name="Login"
                            type="password"
                            recoilAtom={logRegDatasOfUser}
                            identity={1}
                        />
                        <InputField
                            type="button"
                            placeholderText="Login"
                            form_name="Login"
                            recoilAtom={logRegDatasOfUser}
                        />
                    </section>
                    <p className="Register_bloc">
                        <span>
                            vous n’avez pas de compte ?{' '}
                            <Link href="/Register">Enregistrez-vous</Link>
                        </span>
                        <span>
                            <Link href="#">Mot de pass Oulier ?</Link>
                        </span>
                    </p>
                </div>
            </section>
        </>
    );
};

export default Index;
