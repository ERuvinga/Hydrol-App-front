import { useRouter } from 'next/navigation';
import { AuthUser } from '@/States/AuthUser';
import { useRecoilState, useSetRecoilState } from 'recoil';

interface datasOfWrapping {
    text: String;
    setStatePopup: any;
    Action: String;
}

const WrapperCompnent = (datas: datasOfWrapping) => {
    //atoms and const
    const SetAuthUser = useSetRecoilState(AuthUser);
    const Router = useRouter();

    // functions
    const logout = () => {
        localStorage.removeItem('TokenUser');
        Router.push('/Login');
        SetAuthUser(null);
    };

    const deleteUserAccount = () => {
        console.log(' Deleting Account');
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
