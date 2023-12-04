import { useRouter } from 'next/navigation';
import { AuthUser } from '@/States/AuthUser';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { DeletingUserAccount } from '@/app/Lib/Auth';
import { Link_toApi } from '@/States/LoginRegisterStates';
import { IdOfdeletingUser } from '@/States/Users';

interface datasOfWrapping {
    text: String;
    setStatePopup: any;
    Action: String;

    LinkToApi?: any;
    reloadingPageState?: boolean;
    seteStateReloadingPage?: any;
}

const WrapperCompnent = (datas: datasOfWrapping) => {
    //atoms and const
    const api_link: any = useRecoilValue(Link_toApi);
    const SetAuthUser = useSetRecoilState(AuthUser);
    const IdOfUserDeleting = useRecoilValue(IdOfdeletingUser);
    const Router = useRouter();

    // functions
    const logout = () => {
        localStorage.removeItem('TokenUser');
        Router.push('/Login');
        SetAuthUser(null);
    };

    const deleteUserAccount = () => {
        DeletingUserAccount(
            api_link.localLink,
            IdOfUserDeleting,
            datas.reloadingPageState,
            datas.seteStateReloadingPage
        );
        datas.setStatePopup(false);
    };
    return (
        <>
            <section className="Wrapper">
                <div className="popup">
                    <span className="popupmsg">{datas.text}</span>
                    <div className="popupBtns">
                        <button
                            className="Confirmation"
                            onClick={() => {
                                datas.Action == 'logout'
                                    ? logout()
                                    : deleteUserAccount();
                            }}
                        >
                            Oui
                        </button>
                        <button
                            className="Exit"
                            onClick={() => {
                                datas.setStatePopup(false);
                            }}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WrapperCompnent;
