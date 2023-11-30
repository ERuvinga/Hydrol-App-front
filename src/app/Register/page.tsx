'use client';
//Natives tools
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Link from 'next/link';

//components
import Notification from '@/Components/commonComponents/NotificationLogReg';
import InputField from '@/Components/commonComponents/FieldInputLogReg';
import BackHome from '@/Components/commonComponents/BackHome';

//state
import {
    registerDataState,
    messageOfServer,
} from '@/States/LoginRegisterStates';

const Index = () => {
    const logRegDatasOfUser = useRecoilState(registerDataState);
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
                {StateNotification.stateMsg && <Notification />}
                <div className="bloc">
                    <BackHome link="/" />
                    <section className="register_form">
                        <img src="/img/logo.jpg" className="logo" alt="logo" />
                        <InputField
                            labelText="matricule"
                            placeholderText="Hydro******"
                            form_name="Register"
                            type="text"
                            recoilAtom={logRegDatasOfUser}
                            identity={0}
                        />
                        <InputField
                            labelText="password"
                            placeholderText="******"
                            form_name="Register"
                            type="password"
                            recoilAtom={logRegDatasOfUser}
                            identity={1}
                        />
                        <InputField
                            labelText="confirm-password"
                            placeholderText="******"
                            form_name="Register"
                            type="password"
                            recoilAtom={logRegDatasOfUser}
                            identity={2}
                        />
                        <InputField
                            type="button"
                            placeholderText="Register"
                            form_name="Register"
                            recoilAtom={logRegDatasOfUser}
                        />
                    </section>
                    <p className="Register_bloc">
                        <span>
                            vous avez déjà un compte ?{' '}
                            <Link href="/Login">Connectez-vous</Link>
                        </span>
                    </p>
                </div>
            </section>
        </>
    );
};

export default Index;
