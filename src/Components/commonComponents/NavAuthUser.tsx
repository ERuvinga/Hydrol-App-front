import style from '@/Style/leading.module.css';
import { Cog6ToothIcon, HomeIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

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
                <Image
                    alt={'profil'}
                    src={
                        datas.image != ''
                            ? `/img/${datas.image}`
                            : '/img/profile.png'
                    }
                    className="profilImg"
                    width={100}
                    height={100}
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
