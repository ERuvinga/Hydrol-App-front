interface waterDatas {
    idAppart: number;
    nameUser: string;
    litres: number;
    ecoul: number;
    stateElectroVanne?: boolean;
    typeAccount: string;
}

const CardWater = (datas: waterDatas) => {
    const Time = new Date(Date.now());
    return (
        <section className="ContainerDatasSubComptr ">
            <div className="Compteur ">
                <div className="HeadeDatas">
                    <span>
                        compteur :{' '}
                        <span className="cibleH">
                            {`Appartement ${datas.idAppart}`}
                        </span>
                    </span>
                    <span>
                        Utilisateur :{' '}
                        <span className="cibleH">{datas.nameUser}</span>
                    </span>
                </div>
                <div className=" DatasView">
                    <div className="CircleContainer">
                        <span className="textDescr">
                            Eau Consomée en Litre(s)
                        </span>
                        <span className="Values">{datas.litres}</span>
                    </div>
                </div>
                <div className="footerCard">
                    <div className=" Datas">
                        <span className=" value">{`${datas.ecoul} litre(s)/min`}</span>
                        <span className=" description">Ecoulement</span>
                    </div>
                    <div className=" Datas">
                        <span className="value ">
                            {`${Time.getHours()}h${Time.getHours()}`}
                        </span>
                        <span className=" description">Aujour`hui</span>
                    </div>
                </div>
            </div>
            <div className=" stateVanne">
                <span className="title ">Status de l`electro Vanne</span>
                <span className="descr">
                    <span>ElectroVanne :</span>
                    <span className="cible">
                        {datas.stateElectroVanne ? 'Actif' : 'Stoppé'}
                    </span>
                </span>
                <div className="ContainerBtn">
                    {datas.typeAccount === 'Admin' ? (
                        <button
                            className={
                                datas.stateElectroVanne
                                    ? 'btnElectrovanne Stopped'
                                    : 'btnElectrovanne Start'
                            }
                        >
                            {datas.stateElectroVanne ? 'Stoper' : 'Alimenter'}
                        </button>
                    ) : null}
                </div>
            </div>
        </section>
    );
};

export default CardWater;
