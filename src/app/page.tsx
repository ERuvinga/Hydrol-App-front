'use client'; // use client side page

//Lib
import MainLeadingPage from '@/Components/laedingPage';
import PreloadingPage from '@/Components/preloadPage';

//native lib
import { useEffect, useState } from 'react';

export default function Home() {
    const [preloadingState, setPreloadingState] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setPreloadingState(false);
        }, 2000);
    }, []);

    return (
        <>
            <section className="AppContainer">
                {preloadingState ? <PreloadingPage /> : <MainLeadingPage />}
            </section>
        </>
    );
}
