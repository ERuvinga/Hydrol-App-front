// back home component
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface LinkToBac {
    link: string;
}

const BackHome = (datas: LinkToBac) => {
    return (
        <Link className="backHome" href={datas.link}>
            <ArrowLeftIcon className="icone" />
        </Link>
    );
};

export default BackHome;
