import Loading from '@/Components/loading';
import style from '../Style/leading.module.css';

const preloadingPage = () => {
    return (
        <section className={`${style.main}`}>
            <Loading />
            <span className={`${style.nameApp}`}>Hydrol-App</span>
        </section>
    );
};

export default preloadingPage;
