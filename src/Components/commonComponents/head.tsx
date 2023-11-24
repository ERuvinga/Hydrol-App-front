import Head from 'next/head';

// interface using to send datas to Head Component
interface metaDatasValues {
    namePage: string;
    colorTheme: string;
}

const MetaHead = (metaValues: metaDatasValues) => {
    return (
        <Head>
            <title>{metaValues.namePage}</title>
            <meta
                name="description"
                content="App manage connect to Watermeter of appart in HouseShold"
            />
            ,
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="theme-Color" content={metaValues.colorTheme} />
        </Head>
    );
};

export default MetaHead;
