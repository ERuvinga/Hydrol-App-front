'use client';
// Externes libs
import { BeakerIcon } from '@heroicons/react/24/solid';

//Natives Libs
import { useEffect } from 'react';

const about = () => {
    useEffect(() => {
        //console.log('Eliasone');
    }, []);
    return (
        <div className="AppContainer">
            <BeakerIcon />
            Home Page
        </div>
    );
};

export default about;
