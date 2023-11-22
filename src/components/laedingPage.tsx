import style from "../Style/leading.module.css"
import Loading from "@/Components/loading";

const LaedingPage = () =>{
    return(
            <section className={`${style.main}`}>
                <Loading/>
                <span className={`${style.description}`}>Hydrol-App</span>
            </section>
    )
}

export default LaedingPage;