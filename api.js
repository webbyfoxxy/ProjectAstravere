/*******************************************************
 * LUXEMNEAUX ROLEPLAY BANK
 *
 * api.js
 *
 * PART 1/5
 * CORE API CONNECTION
 *******************************************************/


/*
    GOOGLE APPS SCRIPT WEB APP URL

    Replace this with your deployed
    Apps Script Web App URL
*/


const API_URL =

"https://script.google.com/macros/s/AKfycbyHR5hZLyCrHazVyaEHiU3CGAbbkdANjRpkiErqaQbXT0OdG3JC221INd4HZCTt0rGM/exec";





/* =====================================================
   UNIVERSAL REQUEST FUNCTION
===================================================== */


async function apiRequest(
    action,
    data = {}
){

    try{


        const payload = {


            action:
            action,


            ...data


        };



        const response =
        await fetch(

            API_URL,

            {

                method:
                "POST",


                headers:
                {

                    "Content-Type":
                    "text/plain"

                },


                body:
                JSON.stringify(payload)

            }

        );



        const result =
        await response.json();



        if(
            !result.success
        ){

            console.error(
                result.message
            );

        }



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
            "Server connection failed."


        };


    }


}





/* =====================================================
   AUTHENTICATION
===================================================== */


/*
    REGISTER MEMBER
*/


async function register(
    username,
    password,
    roleplayName,
    kingdomId
){


    return apiRequest(

        "register",

        {

            username,

            password,

            roleplayName,

            kingdomId,

            role:
            "Member"

        }

    );


}





/*
    REGISTER CREATOR
*/


async function registerCreator(
    username,
    password,
    roleplayName,
    kingdomId,
    creatorKey
){


    return apiRequest(

        "registerCreator",

        {


            username,


            password,


            roleplayName,


            kingdomId,


            creatorKey


        }

    );


}





/*
    LOGIN
*/


async function login(
    username,
    password
){


    const result =

    await apiRequest(

        "login",

        {

            username,

            password

        }

    );



    if(
        result.success
    ){


        localStorage.setItem(

            "currentUser",

            JSON.stringify(
                result.data
            )

        );


    }



    return result;


}





/*
    LOGOUT
*/


function logout(){


    localStorage.removeItem(
        "currentUser"
    );


    window.location.href =
    "index.html";


}





/*
    CURRENT USER
*/


function currentUser(){


    const user =

    localStorage.getItem(
        "currentUser"
    );



    if(!user)
        return null;



    return JSON.parse(
        user
    );


}





/*
    PROFILE
*/


async function getProfile(){


    const user =
    currentUser();



    if(!user)
        return null;



    return apiRequest(

        "getProfile",

        {

            userId:
            user.userId

        }

    );


}
/*******************************************************
 * LUXEMNEAUX ROLEPLAY BANK
 *
 * api.js
 *
 * PART 2/5
 * WALLET FUNCTIONS
 *******************************************************/


/* =====================================================
   GET WALLET
===================================================== */


async function getWallet(){


    const user =
    currentUser();



    if(!user){

        return {

            success:false,

            message:
            "Not logged in."

        };

    }



    return apiRequest(

        "getWallet",

        {

            userId:
            user.userId

        }

    );


}





/* =====================================================
   TRANSFER CURRENCY
===================================================== */


async function transferMoney(

    receiverId,

    currency,

    amount

){


    const user =
    currentUser();



    if(!user){

        return {

            success:false,

            message:
            "Not logged in."

        };

    }



    return apiRequest(

        "transfer",

        {


            senderId:
            user.userId,


            receiverId:


            receiverId,


            currency:


            currency,


            amount:


            amount


        }

    );


}





/* =====================================================
   CREATOR ADD CURRENCY
===================================================== */


async function addCurrency(

    userId,

    currency,

    amount

){


    const user =
    currentUser();



    if(
        !user ||
        user.role !== "Creator"
    ){

        return {

            success:false,

            message:
            "Creator access required."

        };

    }



    return apiRequest(

        "addCurrency",

        {


            creatorId:
            user.userId,


            userId,


            currency,


            amount


        }

    );


}





/* =====================================================
   CREATOR REMOVE CURRENCY
===================================================== */


async function removeCurrency(

    userId,

    currency,

    amount

){


    const user =
    currentUser();



    if(
        !user ||
        user.role !== "Creator"
    ){

        return {

            success:false,

            message:
            "Creator access required."

        };

    }



    return apiRequest(

        "removeCurrency",

        {


            creatorId:
            user.userId,


            userId,


            currency,


            amount


        }

    );


}





/* =====================================================
   TRANSACTION HISTORY
===================================================== */


async function getTransactions(){


    const user =
    currentUser();



    if(!user)
        return null;



    return apiRequest(

        "getTransactions",

        {

            userId:
            user.userId

        }

    );


}





/* =====================================================
   FORMAT WALLET DISPLAY
===================================================== */


function formatWallet(wallet){


    if(!wallet)
        return {

            Lumen:0,

            Aurel:0,

            Virel:0,

            Sylem:0,

            Bront:0

        };



    return {


        Lumen:

        Number(wallet.Lumen)
        ||0,



        Aurel:

        Number(wallet.Aurel)
        ||0,



        Virel:

        Number(wallet.Virel)
        ||0,



        Sylem:

        Number(wallet.Sylem)
        ||0,



        Bront:

        Number(wallet.Bront)
        ||0


    };


}





/* =====================================================
   UPDATE WALLET DISPLAY
===================================================== */


async function loadWalletUI(){


    const result =
    await getWallet();



    if(
        !result ||
        !result.success
    )
        return;



    const wallet =
    formatWallet(
        result.data
    );



    const elements = {


        Lumen:
        document.getElementById(
            "lumenBalance"
        ),


        Aurel:
        document.getElementById(
            "aurelBalance"
        ),


        Virel:
        document.getElementById(
            "virelBalance"
        ),


        Sylem:
        document.getElementById(
            "sylemBalance"
        ),


        Bront:
        document.getElementById(
            "brontBalance"
        )

    };



    Object.keys(elements)
    .forEach(currency=>{


        if(
            elements[currency]
        ){

            elements[currency]
            .innerText =

            wallet[currency];


        }


    });


}
/*******************************************************
 * LUXEMNEAUX ROLEPLAY BANK
 *
 * api.js
 *
 * PART 3/5
 * SELLER + MARKETPLACE FUNCTIONS
 *******************************************************/


/* =====================================================
   SELLER APPLICATION
===================================================== */


async function applySeller(

    businessName,

    description

){


    const user =
    currentUser();



    if(!user){

        return {

            success:false,

            message:
            "Not logged in."

        };

    }



    return apiRequest(

        "applySeller",

        {


            userId:
            user.userId,


            businessName,


            description


        }

    );


}





/* =====================================================
   GET SELLER APPLICATIONS
===================================================== */


async function getSellerApplications(){


    return apiRequest(

        "getSellerApplications",

        {}

    );


}





/* =====================================================
   APPROVE SELLER
===================================================== */


async function approveSeller(

    applicationId

){


    const user =
    currentUser();



    if(
        !user ||
        user.role !== "Creator"
    ){

        return {

            success:false,

            message:
            "Creator access required."

        };

    }



    return apiRequest(

        "approveSeller",

        {


            creatorId:
            user.userId,


            applicationId


        }

    );


}





/* =====================================================
   CREATE PRODUCT
===================================================== */


async function createProduct(productData){


    const user =
    currentUser();



    if(!user){

        return {

            success:false,

            message:
            "Not logged in."

        };

    }



    return apiRequest(

        "createProduct",

        {


            sellerId:
            user.userId,


            productName:
            productData.productName,


            category:
            productData.category,


            description:
            productData.description,


            price:
            productData.price,


            currency:
            productData.currency,


            stock:
            productData.stock


        }

    );


}





/* =====================================================
   GET MARKETPLACE PRODUCTS
===================================================== */


async function getProducts(){


    return apiRequest(

        "getProducts",

        {}

    );


}





/* =====================================================
   APPROVE PRODUCT
===================================================== */


async function approveProduct(

    productId

){


    const user =
    currentUser();



    if(
        !user ||
        user.role !== "Creator"
    ){

        return {

            success:false,

            message:
            "Creator access required."

        };

    }



    return apiRequest(

        "approveProduct",

        {


            creatorId:
            user.userId,


            productId


        }

    );


}





/* =====================================================
   BUY PRODUCT
===================================================== */


async function purchaseProduct(

    productId

){


    const user =
    currentUser();



    if(!user){

        return {

            success:false,

            message:
            "Not logged in."

        };

    }



    return apiRequest(

        "purchaseProduct",

        {


            buyerId:
            user.userId,


            productId


        }

    );


}





/* =====================================================
   SELLER PRODUCT LIST
===================================================== */


async function getSellerProducts(){


    const user =
    currentUser();



    if(!user)
        return null;



    return apiRequest(

        "getSellerProducts",

        {


            sellerId:
            user.userId


        }

    );


}





/* =====================================================
   UPDATE STOCK
===================================================== */


async function updateStock(

    productId,

    amount

){


    const user =
    currentUser();



    if(!user)
        return null;



    return apiRequest(

        "updateStock",

        {


            sellerId:
            user.userId,


            productId,


            amount


        }

    );


}





/* =====================================================
   DELETE PRODUCT
===================================================== */


async function deleteProduct(

    productId

){


    const user =
    currentUser();



    if(!user)
        return null;



    return apiRequest(

        "deleteProduct",

        {


            userId:
            user.userId,


            productId


        }

    );


}





/* =====================================================
   INVENTORY
===================================================== */


async function getInventory(){


    const user =
    currentUser();



    if(!user)
        return null;



    return apiRequest(

        "getInventory",

        {


            userId:
            user.userId


        }

    );


}





/* =====================================================
   SEARCH PRODUCTS
===================================================== */


async function searchProducts(

    keyword

){


    return apiRequest(

        "searchProducts",

        {

            keyword

        }

    );


}
/*******************************************************
 * LUXEMNEAUX ROLEPLAY BANK
 *
 * api.js
 *
 * PART 4/5
 * AUCTION FUNCTIONS
 *******************************************************/


/* =====================================================
   CREATE AUCTION
===================================================== */


async function createAuction(

    auctionData

){


    const user =
    currentUser();



    if(!user){

        return {

            success:false,

            message:
            "Not logged in."

        };

    }



    return apiRequest(

        "createAuction",

        {


            sellerId:
            user.userId,


            itemName:
            auctionData.itemName,


            description:
            auctionData.description,


            startingPrice:
            auctionData.startingPrice,


            currency:
            auctionData.currency,


            endTime:
            auctionData.endTime


        }

    );


}





/* =====================================================
   GET AUCTIONS
===================================================== */


async function getAuctions(){


    return apiRequest(

        "getAuctions",

        {}

    );


}





/* =====================================================
   APPROVE AUCTION
===================================================== */


async function approveAuction(

    auctionId

){


    const user =
    currentUser();



    if(
        !user ||
        user.role !== "Creator"
    ){

        return {

            success:false,

            message:
            "Creator access required."

        };

    }



    return apiRequest(

        "approveAuction",

        {


            creatorId:
            user.userId,


            auctionId


        }

    );


}





/* =====================================================
   PLACE BID
===================================================== */


async function placeBid(

    auctionId,

    amount

){


    const user =
    currentUser();



    if(!user){

        return {

            success:false,

            message:
            "Not logged in."

        };

    }



    return apiRequest(

        "placeBid",

        {


            bidderId:
            user.userId,


            auctionId,


            amount


        }

    );


}





/* =====================================================
   CLOSE AUCTION
===================================================== */


async function closeAuction(

    auctionId

){


    const user =
    currentUser();



    if(
        !user ||
        user.role !== "Creator"
    ){

        return {

            success:false,

            message:
            "Creator access required."

        };

    }



    return apiRequest(

        "closeAuction",

        {


            creatorId:
            user.userId,


            auctionId


        }

    );


}





/* =====================================================
   GET BIDS
===================================================== */


async function getBids(

    auctionId

){


    return apiRequest(

        "getBids",

        {


            auctionId


        }

    );


}





/* =====================================================
   SEARCH AUCTIONS
===================================================== */


async function searchAuctions(

    keyword

){


    return apiRequest(

        "searchAuctions",

        {


            keyword


        }

    );


}





/* =====================================================
   GET AUCTION HISTORY
===================================================== */


async function getAuctionHistory(){


    const user =
    currentUser();



    if(!user)
        return null;



    return apiRequest(

        "getPurchaseHistory",

        {


            userId:
            user.userId


        }

    );


}





/* =====================================================
   AUCTION TIMER HELPER
===================================================== */


function auctionCountdown(

    endTime,

    elementId

){


    const target =
    new Date(
        endTime
    )
    .getTime();



    const timer =
    setInterval(()=>{


        const now =
        new Date()
        .getTime();



        const distance =
        target - now;



        const element =
        document.getElementById(
            elementId
        );



        if(
            distance <= 0
        ){


            clearInterval(
                timer
            );


            if(element){

                element.innerText =
                "Auction Ended";

            }


            return;


        }



        const days =
        Math.floor(
            distance /
            (1000*60*60*24)
        );



        const hours =
        Math.floor(

            (
                distance %
                (1000*60*60*24)

            )

            /

            (1000*60*60)

        );



        const minutes =
        Math.floor(

            (
                distance %
                (1000*60*60)

            )

            /

            (1000*60)

        );



        const seconds =
        Math.floor(

            (
                distance %
                (1000*60)

            )

            /

            1000

        );



        if(element){

            element.innerText =

            days +
            "d " +

            hours +
            "h " +

            minutes +
            "m " +

            seconds +
            "s";


        }



    },1000);


}
/*******************************************************
 * LUXEMNEAUX ROLEPLAY BANK
 *
 * api.js
 *
 * PART 5/5
 * CREATOR + SYSTEM FUNCTIONS
 *******************************************************/


/* =====================================================
   CREATE KINGDOM
===================================================== */


async function createKingdom(

    kingdomData

){


    const user =
    currentUser();



    if(
        !user ||
        user.role !== "Creator"
    ){

        return {

            success:false,

            message:
            "Creator access required."

        };

    }



    return apiRequest(

        "createKingdom",

        {


            creatorId:
            user.userId,


            kingdomName:
            kingdomData.kingdomName,


            ruler:
            kingdomData.ruler,


            description:
            kingdomData.description


        }

    );


}





/* =====================================================
   GET KINGDOMS
===================================================== */


async function getKingdoms(){


    return apiRequest(

        "getKingdoms",

        {}

    );


}





/* =====================================================
   CREATE ANNOUNCEMENT
===================================================== */


async function createAnnouncement(

    title,

    content

){


    const user =
    currentUser();



    if(
        !user ||
        user.role !== "Creator"
    ){

        return {

            success:false,

            message:
            "Creator access required."

        };

    }



    return apiRequest(

        "announcement",

        {


            creatorId:
            user.userId,


            title,


            content


        }

    );


}





/* =====================================================
   GET ANNOUNCEMENTS
===================================================== */


async function getAnnouncements(){


    return apiRequest(

        "getAnnouncements",

        {}

    );


}





/* =====================================================
   CHANGE USER STATUS
===================================================== */


async function updateUserStatus(

    userId,

    status

){


    const user =
    currentUser();



    if(
        !user ||
        user.role !== "Creator"
    ){

        return {

            success:false,

            message:
            "Creator access required."

        };

    }



    return apiRequest(

        "updateUserStatus",

        {


            creatorId:
            user.userId,


            userId,


            status


        }

    );


}





/* =====================================================
   DELETE USER
===================================================== */


async function deleteUser(

    userId

){


    const user =
    currentUser();



    if(
        !user ||
        user.role !== "Creator"
    ){

        return {

            success:false,

            message:
            "Creator access required."

        };

    }



    return apiRequest(

        "deleteUser",

        {


            creatorId:
            user.userId,


            userId


        }

    );


}





/* =====================================================
   RESET SYSTEM TABLE
===================================================== */


async function clearTable(

    table

){


    const user =
    currentUser();



    if(
        !user ||
        user.role !== "Creator"
    ){

        return {

            success:false,

            message:
            "Creator access required."

        };

    }



    return apiRequest(

        "clearTable",

        {


            creatorId:
            user.userId,


            table


        }

    );


}





/* =====================================================
   CREATOR DASHBOARD DATA
===================================================== */


async function getDashboardStats(){


    return apiRequest(

        "getDashboardStats",

        {}

    );


}





/* =====================================================
   GET LOGS
===================================================== */


async function getLogs(){


    return apiRequest(

        "getLogs",

        {}

    );


}





/* =====================================================
   HEALTH CHECK
===================================================== */


async function healthCheck(){


    return apiRequest(

        "healthCheck",

        {}

    );


}





/* =====================================================
   SYSTEM INFO
===================================================== */


async function getSystemInfo(){


    return apiRequest(

        "getSystemInfo",

        {}

    );


}





/* =====================================================
   AUTO LOAD USER SESSION
===================================================== */


function loadSession(){


    const user =
    currentUser();



    if(
        !user
    ){

        return false;

    }



    return true;


}





/* =====================================================
   ROLE REDIRECT
===================================================== */


function redirectByRole(){


    const user =
    currentUser();



    if(!user){

        window.location.href =
        "index.html";

        return;

    }



    switch(
        user.role
    ){


        case "Creator":


            window.location.href =
            "creator-dashboard.html";


            break;



        case "Seller":


            window.location.href =
            "seller-dashboard.html";


            break;



        default:


            window.location.href =
            "member-dashboard.html";


    }


}





/* =====================================================
   NOTIFICATION HELPER
===================================================== */


function showMessage(

    message

){


    alert(
        message
    );


}





/* =====================================================
   END api.js
===================================================== */
