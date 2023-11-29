'use client';
//Next Libs
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Loading from '../loading';

//state
import {
    Link_toApi,
    errorLogRegisterForm,
    messageOfServer,
} from '@/States/LoginRegisterStates';
import { AuthUser } from '@/States/AuthUser';

interface proprietyInput {
    placeholderText: string;
    form_name: string;
    type: string;
    labelText?: string;
    identity?: number;
    recoilAtom: any;
}

const InputField = (datas: proprietyInput) => {
    // states variables
    const [platformInfos, setPlatformInfos] = useState('');
    const [InValidClassname, setInValidClassname] = useState('');
    const [loadingState, setLoadingState] = useState(false);

    // Atoms
    const [ErrorStates, setErrorStates] = useRecoilState(errorLogRegisterForm);
    const setMessageServer = useSetRecoilState(messageOfServer);
    const setAuthUser = useSetRecoilState(AuthUser);
    const LogRegStatesValues = datas.recoilAtom[0]; // values of states
    const setLogRegStatesValues = datas.recoilAtom[1]; // function change States Values
    const url_to_api = useRecoilValue(Link_toApi);
    const Router = useRouter();

    useEffect(() => {
        setPlatformInfos(navigator.userAgent);
    }, []);

    useEffect(() => {
        // checking Value of Error States
        if (ErrorStates.invalidEmail && datas.labelText === 'email/Tél') {
            setInValidClassname('invalidEmail');
        } else if (
            ErrorStates.pswdAndCofirmPswd &&
            datas.labelText === 'confirm-password'
        ) {
            setInValidClassname('invalidPassword');
        } else if (
            ErrorStates.invalidMatricule &&
            datas.labelText === 'matricule'
        ) {
            setInValidClassname('invalidMatricule');
        } else {
            setInValidClassname('');
        }
    }, [ErrorStates]);

    //Save and Sending Datas functions
    const sendLoginData = () => {
        // // Send datas to Api
        setLoadingState(true); // activation Animation Component
        fetch(`${url_to_api.localLink}/Authentification/Login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(LogRegStatesValues),
        })
            .then((result) => {
                if (result.ok) {
                    result.json().then((datas) => {
                        setAuthUser({
                            ...datas.DataUser, //copy Authentification User datas
                        });
                        localStorage.setItem('TokenUser', datas.Token); // save token in localStorageSession

                        // Checking type of Account for Redirection AothIndex pages
                        switch (datas.typeAccount) {
                            case 'Admin':
                                Router.push('/AuthO/Admin');
                                break;

                            case 'NUser':
                                Router.push('AuthO/AllUser');
                                break;
                        }
                    });
                } else {
                    setLoadingState(false); // desactive Animation Component
                    result.json().then((datas) => {
                        setMessageServer({
                            content: datas.msg,
                            stateMsg: true,
                        });
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const sendRegisterData = () => {
        //Send datas to api
        setLoadingState(true); // Activation Animation Component
        fetch(`${url_to_api.localLink}/Authentification/ActiveAccount`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(LogRegStatesValues),
        })
            .then((result) => {
                setLoadingState(false); // after fetching data desactive Loading Component
                if (result.ok) {
                    result.json().then((datas) => {
                        if (datas.Updating) {
                            Router.push('/Login');
                        }
                    });
                } else {
                    result.json().then((datas) => {
                        setMessageServer({
                            content: datas.msg,
                            stateMsg: true,
                        });
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const datasOfLoginForm = (e: any, idField: number | undefined) => {
        switch (idField) {
            case 0: {
                setLogRegStatesValues({
                    ...LogRegStatesValues,
                    email: e.target.value,
                });
                // check format mail
                const mail = e.target.value;
                if (
                    mail.match(/@[a-zA-Z0-9]{5,}(.com$)/) ||
                    mail.match(/^[+][0-9]{12}$/)
                ) {
                    if (LogRegStatesValues.passWord != '') {
                        setErrorStates({
                            ...ErrorStates,
                            disabledBtn: false,
                            invalidEmail: false,
                        });
                    } else {
                        setErrorStates({
                            ...ErrorStates,
                            disabledBtn: true,
                            invalidEmail: false,
                        });
                    }
                } else {
                    setErrorStates({
                        ...ErrorStates,
                        disabledBtn: true,
                        invalidEmail: true,
                    });
                }
                break;
            }

            case 1: {
                setLogRegStatesValues({
                    ...LogRegStatesValues,
                    passWord: e.target.value,
                });

                if (!ErrorStates.invalidEmail && e.target.value != '') {
                    setErrorStates({
                        ...ErrorStates,
                        disabledBtn: false,
                    });
                } else {
                    setErrorStates({
                        ...ErrorStates,
                        disabledBtn: true,
                    });
                }
                break;
            }
        }
    };

    const dataOfRegisterForm = (e: any, idField: number | undefined) => {
        switch (idField) {
            case 0: {
                setLogRegStatesValues({
                    ...LogRegStatesValues,
                    matricule: e.target.value,
                });

                // Error verifications
                if (e.target.value.match(/^Hydro_[0-9a-z]{23}[0-9a-f]{1}$/)) {
                    if (
                        !ErrorStates.pswdAndCofirmPswd &&
                        LogRegStatesValues.passWord != ''
                    ) {
                        setErrorStates({
                            ...ErrorStates,
                            disabledBtn: false,
                            invalidMatricule: false,
                        });
                    } else {
                        setErrorStates({
                            ...ErrorStates,
                            disabledBtn: true,
                            invalidMatricule: false,
                        });
                    }
                } else {
                    setErrorStates({
                        ...ErrorStates,
                        disabledBtn: true,
                        invalidMatricule: true,
                    });
                }
                break;
            }
            case 1: {
                setLogRegStatesValues({
                    ...LogRegStatesValues,
                    passWord: e.target.value,
                });

                if (LogRegStatesValues.confirmpassWord === e.target.value) {
                    if (
                        !ErrorStates.invalidMatricule &&
                        LogRegStatesValues.matricule != ''
                    ) {
                        setErrorStates({
                            ...ErrorStates,
                            disabledBtn: false,
                            pswdAndCofirmPswd: false,
                        });
                    } else {
                        setErrorStates({
                            ...ErrorStates,
                            disabledBtn: true,
                            pswdAndCofirmPswd: false,
                        });
                    }
                } else {
                    setErrorStates({
                        ...ErrorStates,
                        disabledBtn: true,
                        pswdAndCofirmPswd: true,
                    });
                }

                break;
            }

            case 2: {
                setLogRegStatesValues({
                    ...LogRegStatesValues,
                    confirmpassWord: e.target.value,
                });
                // Error verifications
                if (LogRegStatesValues.passWord !== e.target.value) {
                    setErrorStates({
                        ...ErrorStates,
                        disabledBtn: true,
                        pswdAndCofirmPswd: true,
                    });
                } else {
                    if (
                        !ErrorStates.invalidMatricule &&
                        LogRegStatesValues.matricule != ''
                    ) {
                        setErrorStates({
                            ...ErrorStates,
                            disabledBtn: false,
                            pswdAndCofirmPswd: false,
                        });
                    } else {
                        setErrorStates({
                            ...ErrorStates,
                            disabledBtn: true,
                            pswdAndCofirmPswd: false,
                        });
                    }
                }
                break;
            }
        }
    };

    return (
        <>
            {datas.type === 'text' || datas.type === 'password' ? (
                <div className="groupe_form">
                    <label htmlFor={datas.labelText}>{datas.labelText}</label>
                    <div className={InValidClassname}>
                        <input
                            className={
                                platformInfos.match(/iPhone/)
                                    ? InValidClassname !== ''
                                        ? 'invalidEmailInput'
                                        : '_iPhone_input'
                                    : InValidClassname !== ''
                                      ? 'invalidEmailInput'
                                      : 'log_reg_input'
                            }
                            type={datas.type}
                            placeholder={datas.placeholderText}
                            id={datas.labelText}
                            onChange={(event) => {
                                datas.form_name === 'Login'
                                    ? datasOfLoginForm(event, datas.identity)
                                    : dataOfRegisterForm(event, datas.identity);
                            }}
                        />
                    </div>
                </div>
            ) : (
                <>
                    {loadingState ? (
                        <Loading WhiteOrBlack={false} />
                    ) : (
                        <button
                            disabled={ErrorStates.disabledBtn}
                            onClick={() => {
                                datas.form_name === 'Login'
                                    ? sendLoginData()
                                    : sendRegisterData();
                            }}
                            className={
                                ErrorStates.disabledBtn
                                    ? 'disabledBtn'
                                    : 'form_send_btn'
                            }
                        >
                            {datas.placeholderText}
                        </button>
                    )}
                </>
            )}
        </>
    );
};

export default InputField;
