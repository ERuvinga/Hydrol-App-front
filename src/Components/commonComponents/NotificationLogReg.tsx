import { useRecoilState } from 'recoil';
import { messageOfServer } from '@/States/LoginRegisterStates';
import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

const Notification = () => {
    const [Msg, setMsg] = useRecoilState(messageOfServer);
    // after 2 seconde hidden MessageError
    useEffect(() => {
        setTimeout(() => {
            setMsg({
                ...Msg,
                stateMsg: false,
            });
        }, 5000);
    }, []);
    return (
        <div className="NotificationMsg">
            <span className="">
                <span className="TitleNotif">
                    <CloudArrowDownIcon className="Icone" />
                    Server
                </span>
                <div className="msg ">{Msg.content}</div>
            </span>
        </div>
    );
};

export default Notification;
