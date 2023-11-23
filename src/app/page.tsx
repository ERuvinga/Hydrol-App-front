'use client' // use client side page

import  MainLeadingPage from '@/Components/laedingPage';
import PreloadingPage from '@/Components/preloadPage';
import { useEffect, useState } from 'react';

export default function Home() {
    const [preloadingState, setPreloadingState] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setPreloadingState(false);
        }, 5000);
    }, []);

    return (
        <section className="AppContainer">
            {preloadingState ? <PreloadingPage/> : <MainLeadingPage />}
        </section>
    );
}
