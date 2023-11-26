interface ColorSnipper {
    WhiteOrBlack: boolean;
}

const Loading = (datas: ColorSnipper) => {
    return (
        <div
            className={
                datas.WhiteOrBlack == true
                    ? 'spinerWhite circles'
                    : 'spinerBlue circles'
            }
        >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Loading;
