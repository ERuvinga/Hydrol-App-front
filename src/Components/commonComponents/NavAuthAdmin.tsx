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

const AdminNav = (datas: DatasOfMainUser) => {
    return (
        <div className={`${style.Nav}`}>
            <div className={'profilDatas'}>
                <Image
                    width={100}
                    height={100}
                    alt={'profil'}
                    src={
                        datas.image != ''
                            ? `/img/${datas.image}`
                            : '/img/profile.png'
                    }
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
                <Link href={'/AuthO/Admin'}>
                    <HomeIcon className={style.icones} />
                </Link>
                <Link href={'/AuthO/Admin/Profil'}>
                    <Cog6ToothIcon className={style.icones} />
                </Link>
            </div>
        </div>
    );
};

export default AdminNav;
