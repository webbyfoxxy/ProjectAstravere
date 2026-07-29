/*******************************************************
 ROLEPLAY BANK
 FRONTEND API CONNECTOR

 Connects:
 HTML
  |
  ↓
 api.js
  |
  ↓
 Google Apps Script Web App

*******************************************************/


const API_URL = 
"https://script.google.com/macros/s/AKfycbyHR5hZLyCrHazVyaEHiU3CGAbbkdANjRpkiErqaQbXT0OdG3JC221INd4HZCTt0rGM/exec";






/*
========================================================
 SEND REQUEST
========================================================
*/


async function apiRequest(action, data = {}){


    try{


        const response = await fetch(
            API_URL,
            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "text/plain;charset=utf-8"

                },


                body:JSON.stringify({

                    action:action,

                    data:data

                })

            }
        );



        const result =
        await response.json();



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
            "Unable to connect server."



        };


    }


}









/*
========================================================
 AUTH
========================================================
*/


async function register(
    username,
    password,
    roleplayName
){


    return await apiRequest(

        "register",

        {

            username,

            password,

            roleplayName

        }

    );


}








async function login(
    username,
    password
){


    return await apiRequest(

        "login",

        {

            username,

            password

        }

    );


}








async function creatorRegister(data){


    return await apiRequest(

        "creatorRegister",

        data

    );


}









/*
========================================================
 PROFILE
========================================================
*/


async function getProfile(userId){


    return await apiRequest(

        "getProfile",

        {

            userId

        }

    );


}









/*
========================================================
 WALLET
========================================================
*/


async function transferMoney(data){


    return await apiRequest(

        "transferCurrency",

        data

    );


}



async function addMoney(data){


    return await apiRequest(

        "addCurrency",

        data

    );


}








/*
========================================================
 INVENTORY
========================================================
*/


async function loadInventory(userId){


    return await apiRequest(

        "getInventory",

        {

            userId

        }

    );


}









/*
========================================================
 SELLER
========================================================
*/


async function applySeller(data){


    return await apiRequest(

        "submitSellerApplication",

        data

    );


}



async function createProduct(data){


    return await apiRequest(

        "createProduct",

        data

    );


}



async function getMarketplace(){


    return await apiRequest(

        "getMarketplace"

    );


}



async function buyProduct(data){


    return await apiRequest(

        "purchaseProduct",

        data

    );


}









/*
========================================================
 AUCTION
========================================================
*/


async function createAuction(data){


    return await apiRequest(

        "createAuction",

        data

    );


}



async function getAuctions(){


    return await apiRequest(

        "getAuctions"

    );


}



async function bidAuction(data){


    return await apiRequest(

        "placeBid",

        data

    );


}









/*
========================================================
 CREATOR
========================================================
*/


async function getUsers(){


    return await apiRequest(

        "getUsers"

    );


}



async function createKingdom(data){


    return await apiRequest(

        "createKingdom",

        data

    );


}



async function announce(data){


    return await apiRequest(

        "createAnnouncement",

        data

    );


}









/*
========================================================
 SESSION STORAGE
========================================================
*/


function saveSession(user){


    localStorage.setItem(

        "currentUser",

        JSON.stringify(user)

    );


}





function getSession(){


    return JSON.parse(

        localStorage.getItem(

            "currentUser"

        )

    );


}





function logout(){


    localStorage.removeItem(

        "currentUser"

    );


    window.location.href =
    "index.html";


}
