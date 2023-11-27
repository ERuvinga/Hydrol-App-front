import style from '@/Style/leading.module.css';
import { BellIcon, Cog6ToothIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

//Atoms
import { useRecoilValue } from 'recoil';

interface DatasOfMainUser {
    name: string;
    Tel: string;
    email: string;
    image: string;
}

const AuthNav = (datas: DatasOfMainUser) => {
    return (
        <div className={`${style.Nav}`}>
            <div className={'profilDatas'}>
                <img
                    alt={datas.image != '' ? datas.image : 'profil'}
                    src="/img/profile.png"
                    className="profilImg"
                />
                <div className="Identity">
                    <span className="name">{datas.name}</span>
                    <span className="tel">
                        {datas.email == '' ? datas.Tel : datas.email}
                    </span>
                </div>
            </div>
            <div className={style.loginBtn}>
                <Link href={'/AuthO/AllUser'}>
                    <HomeIcon className={style.icones} />
                </Link>
                <Link href={'/AuthO/AllUser/Profil'}>
                    <Cog6ToothIcon className={style.icones} />
                </Link>
            </div>
        </div>
    );
};

export default AuthNav;
