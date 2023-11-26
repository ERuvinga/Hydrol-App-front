'use client';
//Libs App
import { withAuth } from '@/app/Lib/Auth';
import Loading from '@/Components/loading';
import { AuthUser } from '@/States/AuthUser';
import { Link_toApi } from '@/States/LoginRegisterStates';

//Next Libs
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';

const Index = () => {
    // states and atoms
    const [loadingPage, setLoadingPage] = useState(false);
    const [DatasOfAuthUser, setDatasOfAuthUser] = useRecoilState(AuthUser);
    const Api_Url = useRecoilValue(Link_toApi);

    //initializ States
    const Router = useRouter();

    useEffect(() => {
        // check if token of user is valid
        withAuth(
            Api_Url,
            localStorage.getItem('TokenUser'),
            setLoadingPage,
            setDatasOfAuthUser,
            DatasOfAuthUser,
            Router
        );
        console.log(DatasOfAuthUser);
    }, []);
    return (
        <>
            {loadingPage /*|| DatasOfAuthUser*/ ? (
                <main>
                    <h1>All User Page</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptas delectus iure animi laudantium facere odio
                        mollitia! Ex libero, iusto consequatur, sunt omnis
                        repellat tenetur, eius earum dicta natus alias. Fugiat!
                    </p>
                </main>
            ) : (
                <div className="LoaderPage">
                    <Loading WhiteOrBlack={false} />
                    <span className="loadingText">Chargement ...</span>
                </div>
            )}
        </>
    );
};

export default Index;
