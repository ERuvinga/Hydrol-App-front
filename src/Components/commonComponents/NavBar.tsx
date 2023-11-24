import style from '@/Style/leading.module.css';
import {
    AtSymbolIcon,
    CloudIcon,
    CodeBracketIcon,
} from '@heroicons/react/24/outline';
import { BellIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const LeadingNav = () => {
    return (
        <div className={`${style.Nav}`}>
            <div className={style.logo}>Hydrol-App</div>
            <div className={style.loginBtn}>
                <Link className={style.toLoginPage} href={'/Login'}>
                    Connexion
                </Link>
                <BellIcon className={style.icones} />
            </div>
        </div>
    );
};

export const LeadingFoot = () => {
    return (
        <section className={style.foot}>
            <div className={style.footerDatas}>
                <PhoneIcon className={style.fIcones} />
                <span>0973668210</span>
            </div>
            <div className={style.footerDatas}>
                <AtSymbolIcon className={style.fIcones} />
                <span>ruvingaelie@gmail.com</span>
            </div>
            <div className={style.footerDatas}>
                <CloudIcon className={style.fIcones} />
                <span>www.HydrolApp.comm</span>
            </div>
            <div className={style.footerDatas}>
                <CodeBracketIcon className={style.fIcones} />
                <span>Nextjs</span>
            </div>
        </section>
    );
};

export default LeadingNav;
