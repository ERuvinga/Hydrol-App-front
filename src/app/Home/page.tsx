// Externes libs
//Natives Libs
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const WelcomePage = () => {
    return (
        <div className="AppContainer">
            <section className="BgImg">
                <img src="/img/logoTrans.png" alt="logo" className="Logo" />
                <section className="Containeranimated">
                    <span className="iconeCont">
                        <ExclamationCircleIcon className="icnExcls" />
                    </span>
                    <div className="AnimatedText">
                        Bienvenu sur Hydrol-App, Une application web vous
                        permettant de gerer la consommation d'eau dans votre
                        menage.
                        <span className="callToAction">
                            connectez pour plus d'informations!
                        </span>
                    </div>
                </section>
                <div className="TextContainer">
                    <div className="wrapperText">
                        <span className="TitlePage">
                            Bienvenu sur Hydrol-App
                        </span>
                        <ul className="Applist">
                            <li>
                                Gerez Efficacement vos consommations d`eau grace
                                à Hydrol-app
                            </li>
                            <li>
                                Archivez toutes vos factures et recevez des
                                notifications
                            </li>
                            <li>Analysez vos donnees d`eau en temps reel</li>
                        </ul>
                        <div className="BtnsLink">
                            <Link href="/Register" className="activBtn">
                                ACTIVATION COMPTE
                            </Link>
                            <Link href="/Login" className="loginBtn">
                                CONNEXION
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WelcomePage;
