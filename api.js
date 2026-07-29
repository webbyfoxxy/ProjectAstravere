const API_URL =
"https://script.google.com/macros/s/AKfycbyHR5hZLyCrHazVyaEHiU3CGAbbkdANjRpkiErqaQbXT0OdG3JC221INd4HZCTt0rGM/exec";





/*******************************************************
 BASIC API CALL
*******************************************************/

async function api(action,data={}){


    try{


        const response =
        await fetch(API_URL,{

            method:"POST",

            headers:{

                "Content-Type":
                "text/plain"

            },

            body:JSON.stringify({

                action:action,

                data:data

            })

        });




        const result =
        await response.json();




        return result;



    }
    catch(error){


        console.error(error);



        return {


            success:false,

            message:
            "Unable to connect server."


        };


    }



}








/*******************************************************
 AUTH
*******************************************************/


async function registerMember(data){

    return await api(
        "register",
        data
    );

}



async function login(data){

    return await api(
        "login",
        data
    );

}



async function registerCreator(data){

    return await api(
        "registerCreator",
        data
    );

}








/*******************************************************
 PROFILE
*******************************************************/


async function getProfile(userId){

    return await api(

        "getProfile",

        {
            userId:userId
        }

    );

}








/*******************************************************
 CURRENCY
*******************************************************/


async function addCurrency(data){

    return await api(

        "addCurrency",

        data

    );

}



async function removeCurrency(data){

    return await api(

        "removeCurrency",

        data

    );

}



async function transferCurrency(data){

    return await api(

        "transferCurrency",

        data

    );

}








/*******************************************************
 SELLER
*******************************************************/


async function applySeller(data){

    return await api(

        "applySeller",

        data

    );

}



async function getSellerApplications(){

    return await api(

        "getSellerApplications"

    );

}



async function approveSeller(data){

    return await api(

        "approveSeller",

        data

    );

}








/*******************************************************
 PRODUCTS
*******************************************************/


async function createProduct(data){

    return await api(

        "createProduct",

        data

    );

}



async function approveProduct(data){

    return await api(

        "approveProduct",

        data

    );

}



async function getMarketplace(){

    return await api(

        "getMarketplace"

    );

}



async function purchaseProduct(data){

    return await api(

        "purchaseProduct",

        data

    );

}








/*******************************************************
 INVENTORY
*******************************************************/


async function getInventory(userId){

    return await api(

        "getInventory",

        {

            userId:userId

        }

    );

}








/*******************************************************
 AUCTIONS
*******************************************************/


async function createAuction(data){

    return await api(

        "createAuction",

        data

    );

}



async function approveAuction(data){

    return await api(

        "approveAuction",

        data

    );

}



async function getAuctions(){

    return await api(

        "getAuctions"

    );

}



async function placeBid(data){

    return await api(

        "placeBid",

        data

    );

}








/*******************************************************
 CREATOR
*******************************************************/


async function getAllUsers(){

    return await api(

        "getAllUsers"

    );

}



async function updateUserStatus(data){

    return await api(

        "updateUserStatus",

        data

    );

}



async function createKingdom(data){

    return await api(

        "createKingdom",

        data

    );

}



async function createAnnouncement(data){

    return await api(

        "createAnnouncement",

        data

    );

}



async function getAnnouncements(){

    return await api(

        "getAnnouncements"

    );

}
