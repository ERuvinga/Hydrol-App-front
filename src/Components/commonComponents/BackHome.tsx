// back home component
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const BackHome = () => {
    return (
        <Link className="backHome" href="/Home">
            <ArrowLeftIcon className="icone" />
        </Link>
    );
};

export default BackHome;
