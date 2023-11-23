'use client' // use client side page

import { MainLeadingPage, LoadingPage } from '../Components/laedingPage';
import { useEffect, useState } from 'react';

var user = 'Elie';

export default function Home() {
    const [preloadingState, setPreloadingState] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setPreloadingState(false);
        }, 5000);

    }, []);

    return (
        <section className="AppContainer">
            {preloadingState ? <LoadingPage /> : <MainLeadingPage />}
        </section>
    );
}
