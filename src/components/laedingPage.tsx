// native Lib
import Link from "next/link";

// dev modules
import style from "../Style/leading.module.css"
import Loading from "@/Components/loading";

const LoadingPage = () =>{
    return(
            <section className={`${style.main}`}>
                <Loading/>
                <span className={`${style.nameApp}`}>Hydrol-App</span>
            </section>
    )
};

const MainLeadingPage = ()=>{
    return(
        <section className={`${style.ContainerLeadingPage}`}>
            <img alt="Manage Illustration" className={`${style.LeadingIllustrat}`} src={"/img/home.png"}/>
            <div className={`${style.Description}`}>
                <h1  className={`${style.HeadDescr}`}>Meilleure platforme de gestion d`eau</h1>
                <p  className={`${style.paragDescr}`}>connectez-vous à votre compte pour gérer et visualiser toutes vos données personnelles ( Litres utilisés, factures, etc.).</p>
                <div className={`${style.AllBtns}`}>
                    <Link className={`${style.BtnHome}`} href={"/home/"}>Connexion</Link>
                    <Link className={`${style.BtnLogin}`} href={"/Login"}>Next</Link>
                </div>
            </div>
        </section>
    )
};

export {
    LoadingPage,
    MainLeadingPage
}