// native Lib
import Link from 'next/link';

// dev modules
import style from '../Style/leading.module.css';
import LeadingNav, { LeadingFoot } from './commonComponents/NavBar';

const MainLeadingPage = () => {
    return (
        <>
            <LeadingNav />
            <section className={`${style.ContainerLeadingPage}`}>
                <img
                    alt="Manage Illustration"
                    className={`${style.LeadingIllustrat}`}
                    src={'/img/home.png'}
                />
                <div className={`${style.Description}`}>
                    <h1 className={`${style.HeadDescr}`}>
                        Meilleure platforme de gestion d`eau
                    </h1>
                    <p className={`${style.paragDescr}`}>
                        connectez-vous à votre compte pour gérer et visualiser
                        toutes vos données personnelles ( Litres utilisés,
                        factures, etc.).
                    </p>
                    <div className={`${style.AllBtns}`}>
                        <Link className={`${style.BtnHome}`} href={'/Login'}>
                            Connexion
                        </Link>
                        <Link
                            className={`${style.BtnLogin}`}
                            href={'/Register'}
                        >
                            Compte
                        </Link>
                    </div>
                </div>
            </section>
            <LeadingFoot />
        </>
    );
};

export default MainLeadingPage;
