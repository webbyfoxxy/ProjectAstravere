/* ==========================================================
   ROLEPLAY BANK API CONNECTOR
========================================================== */


const API_URL = "https://script.google.com/macros/s/AKfycbyHR5hZLyCrHazVyaEHiU3CGAbbkdANjRpkiErqaQbXT0OdG3JC221INd4HZCTt0rGM/exec";



async function apiRequest(action, data = {}){


    try{


        const response = await fetch(API_URL, {


            method:"POST",


            headers:{


                "Content-Type":"application/json"


            },


            body:JSON.stringify({


                action:action,

                data:data


            })


        });



        const result = await response.json();



        return result;



    }


    catch(error){



        console.error(
            "API ERROR:",
            error
        );



        return {


            success:false,


            message:
            "Unable to connect to server."


        };


    }


}



/* ==========================================================
   AUTH
========================================================== */


function registerUser(data){

    return apiRequest(
        "register",
        data
    );

}



function loginUser(data){

    return apiRequest(
        "login",
        data
    );

}



function registerCreator(data){

    return apiRequest(
        "creatorRegister",
        data
    );

}



/* ==========================================================
   PROFILE
========================================================== */


function getProfile(userId){

    return apiRequest(
        "getProfile",
        {
            userId:userId
        }
    );

}



function updateProfile(data){

    return apiRequest(
        "updateProfile",
        data
    );

}



/* ==========================================================
   MARKETPLACE
========================================================== */


function loadMarketplace(){

    return apiRequest(
        "getMarketplace"
    );

}



function createProduct(data){

    return apiRequest(
        "createProduct",
        data
    );

}



function buyProduct(data){

    return apiRequest(
        "purchaseProduct",
        data
    );

}



/* ==========================================================
   AUCTIONS
========================================================== */


function loadAuctions(){

    return apiRequest(
        "getAuctions"
    );

}



function createAuction(data){

    return apiRequest(
        "createAuction",
        data
    );

}



function placeBid(data){

    return apiRequest(
        "placeBid",
        data
    );

}



/* ==========================================================
   INVENTORY
========================================================== */


function getInventory(userId){

    return apiRequest(
        "getInventory",
        {
            userId:userId
        }
    );

}



/* ==========================================================
   SELLER
========================================================== */


function applySeller(data){

    return apiRequest(
        "submitSellerApplication",
        data
    );

}



function getSellerApplications(){

    return apiRequest(
        "getSellerApplications"
    );

}



/* ==========================================================
   CURRENCY
========================================================== */


function transferCurrency(data){

    return apiRequest(
        "transferCurrency",
        data
    );

}



function addCurrency(data){

    return apiRequest(
        "addCurrency",
        data
    );

}



function removeCurrency(data){

    return apiRequest(
        "removeCurrency",
        data
    );

}



/* ==========================================================
   CREATOR
========================================================== */


function creatorDashboard(){

    return apiRequest(
        "creatorDashboard"
    );

}



function getUsers(){

    return apiRequest(
        "getUsers"
    );

}



function createKingdom(data){

    return apiRequest(
        "addKingdom",
        data
    );

}
/* ==========================================================
   END OF FILE
========================================================== */
