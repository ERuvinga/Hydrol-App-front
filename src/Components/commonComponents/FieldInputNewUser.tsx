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
import { NewUser } from '@/States/Users';

interface proprietyInput {
    placeholderText: string;
    type: string;
    labelText?: string;
    identity?: number;
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
    const [NewUserDatas, setNewUserDatas]: any = useRecoilState(NewUser);
    const url_to_api = useRecoilValue(Link_toApi);
    const Router = useRouter();

    useEffect(() => {
        setPlatformInfos(navigator.userAgent);
    }, []);

    useEffect(() => {
        // checking Value of Error States
        if (ErrorStates.invalidEmail && datas.labelText === 'email') {
            setInValidClassname('invalidEmail');
        } else if (ErrorStates.invalidTelInput && datas.labelText === 'tel') {
            setInValidClassname('invalidTelInput');
        } else {
            setInValidClassname('');
        }
    }, [ErrorStates]);

    //Save and Sending Datas functions
    const NewUserSendingDatas = () => {
        // // Send datas to Api
        setLoadingState(true); // activation Animation Component
        fetch(`${url_to_api.localLink}/Users/New`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                Autorization: `Bearer ${localStorage.getItem('TokenUser')}`,
            },
            body: JSON.stringify(NewUserDatas),
        })
            .then((result) => {
                if (result.ok) {
                    Router.push('/AuthO/Admin/Menages');
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

    const datasOfNewUserForm = (e: any, idField: number | undefined) => {
        switch (idField) {
            case 0: {
                setNewUserDatas({
                    ...NewUserDatas,
                    SecondeName: e.target.value,
                });
                break;
            }

            case 1: {
                setNewUserDatas({
                    ...NewUserDatas,
                    name: e.target.value,
                });
                break;
            }
            case 2: {
                setNewUserDatas({
                    ...NewUserDatas,
                    email: e.target.value,
                });
                // check format mail
                const mail = e.target.value;
                if (mail.match(/@[a-zA-Z0-9]{5,}(.com$)/)) {
                    if (NewUserDatas.tel != '') {
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
            case 3: {
                setNewUserDatas({
                    ...NewUserDatas,
                    tel: e.target.value,
                });
                const tel = e.target.value;
                if (tel.match(/^[+][0-9]{12}$/)) {
                    if (NewUserDatas.email != '') {
                        setErrorStates({
                            ...ErrorStates,
                            disabledBtn: false,
                            invalidTelInput: false,
                        });
                    } else {
                        setErrorStates({
                            ...ErrorStates,
                            disabledBtn: true,
                            invalidTelInput: false,
                        });
                    }
                } else {
                    setErrorStates({
                        ...ErrorStates,
                        disabledBtn: true,
                        invalidTelInput: true,
                    });
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
                                datasOfNewUserForm(event, datas.identity);
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
                            onClick={() => NewUserSendingDatas()}
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
