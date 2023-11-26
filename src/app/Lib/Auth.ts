
// fuction cheking if User Aoutoriz to display this page
const withAuth = (api_link:any, Localtoken:any, setStatePage:any, setUaseAuth:any, UserAuth:any, Router: any) =>{
    const ActualiUrl = window.location.href;

    fetch(`${api_link.localLink}/AuthUser`, {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-type": 'application/json; charset=UTF-8',
            "Autorization": `Bearer ${Localtoken}`
        }
    })
        .then((datas) => {
            datas.json()
                .then((user: any) => {

                    if (!user.userFund) { // if not user find, redirect to login page
                        Router.push("/Login");
                         }

                    else {
                        if(!UserAuth){ // if no user saved
                            console.log(user.userFund.typeAccount);
                                switch(user.userFund.typeAccount){
                                        case "Admin":
                                            if(ActualiUrl.includes("/AuthO/Admin")){
                                                console.log("Autorisation Accordé Admin");
                                                setStatePage(true);
                                                setUaseAuth(user.userFund);
                                            }
                                            else{
                                                console.log(`Acces refusé : ${ActualiUrl}`);
                                                Router.push("/Login");
                                            } 
                                        break;
                                        
                                        case "NUser":
                                            if(ActualiUrl.includes("/AuthO/AllUser")){
                                                console.log("Autorisation Accordé Utilisateur");
                                                setStatePage(true);
                                                setUaseAuth(user.userFund);
                                            }
                                            else{
                                                console.log(`Acces refusé : ${ActualiUrl}`);
                                                Router.push("/Login");
                                            } 
                                        break;                                                
                                }
                        }
                    }

                })
        })
        .catch(error => {
            console.error(error);
            Router.push("/Login");
        })
}

export {
    withAuth
}
