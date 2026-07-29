/* ==========================================================
   ROLEPLAY BANK
   api.js
========================================================== */

"use strict";

/* ==========================================================
   CONFIGURATION
========================================================== */

const API = {

    endpoint: "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL",

    timeout: 30000

};

/* ==========================================================
   MAIN REQUEST
========================================================== */

async function api(action,data={}){

    showLoading();

    try{

        const response = await fetch(

            API.endpoint,

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    action,

                    data

                })

            }

        );

        if(!response.ok){

            throw new Error(

                "Server Error"

            );

        }

        const result = await response.json();

        hideLoading();

        return result;

    }

    catch(error){

        hideLoading();

        console.error(error);

        toast.error(

            "Unable to connect to server."

        );

        return{

            success:false,

            message:error.message

        };

    }

}

/* ==========================================================
   AUTHENTICATION
========================================================== */

async function login(username,password){

    return await api(

        "login",

        {

            username,

            password

        }

    );

}

async function register(data){

    return await api(

        "register",

        data

    );

}

async function creatorRegister(data){

    return await api(

        "creatorRegister",

        data

    );

}

/* ==========================================================
   PROFILE
========================================================== */

async function getProfile(userId){

    return await api(

        "getProfile",

        {

            userId

        }

    );

}

async function updateProfile(data){

    return await api(

        "updateProfile",

        data

    );

}

/* ==========================================================
   KINGDOMS
========================================================== */

async function getKingdoms(){

    return await api(

        "getKingdoms"

    );

}

async function addKingdom(data){

    return await api(

        "addKingdom",

        data

    );

}

async function updateKingdom(data){

    return await api(

        "updateKingdom",

        data

    );

}

async function deleteKingdom(id){

    return await api(

        "deleteKingdom",

        {

            id

        }

    );

}

/* ==========================================================
   CURRENCY
========================================================== */

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
/* ==========================================================
   SELLER APPLICATIONS
========================================================== */

async function submitSellerApplication(data){

    return await api(

        "submitSellerApplication",

        data

    );

}

async function getSellerApplications(){

    return await api(

        "getSellerApplications"

    );

}

async function approveSeller(applicationId){

    return await api(

        "approveSeller",

        {

            applicationId

        }

    );

}

async function rejectSeller(applicationId,reason=""){

    return await api(

        "rejectSeller",

        {

            applicationId,

            reason

        }

    );

}

/* ==========================================================
   MARKETPLACE
========================================================== */

async function getMarketplace(){

    return await api(

        "getMarketplace"

    );

}

async function getProduct(productId){

    return await api(

        "getProduct",

        {

            productId

        }

    );

}

async function createProduct(data){

    return await api(

        "createProduct",

        data

    );

}

async function updateProduct(data){

    return await api(

        "updateProduct",

        data

    );

}

async function deleteProduct(productId){

    return await api(

        "deleteProduct",

        {

            productId

        }

    );

}

async function approveProduct(productId){

    return await api(

        "approveProduct",

        {

            productId

        }

    );

}

async function rejectProduct(productId,reason=""){

    return await api(

        "rejectProduct",

        {

            productId,

            reason

        }

    );

}

async function purchaseProduct(data){

    return await api(

        "purchaseProduct",

        data

    );

}

/* ==========================================================
   INVENTORY
========================================================== */

async function getInventory(userId){

    return await api(

        "getInventory",

        {

            userId

        }

    );

}

async function addInventoryItem(data){

    return await api(

        "addInventoryItem",

        data

    );

}

async function removeInventoryItem(data){

    return await api(

        "removeInventoryItem",

        data

    );

}

async function transferInventory(data){

    return await api(

        "transferInventory",

        data

    );

}

/* ==========================================================
   AUCTIONS
========================================================== */

async function getAuctions(){

    return await api(

        "getAuctions"

    );

}

async function createAuction(data){

    return await api(

        "createAuction",

        data

    );

}

async function updateAuction(data){

    return await api(

        "updateAuction",

        data

    );

}

async function approveAuction(auctionId){

    return await api(

        "approveAuction",

        {

            auctionId

        }

    );

}

async function rejectAuction(auctionId,reason=""){

    return await api(

        "rejectAuction",

        {

            auctionId,

            reason

        }

    );

}

async function placeBid(data){

    return await api(

        "placeBid",

        data

    );

}

async function closeAuction(auctionId){

    return await api(

        "closeAuction",

        {

            auctionId

        }

    );

}

/* ==========================================================
   MEMBER MARKET SALES
========================================================== */

async function sellInventoryItem(data){

    return await api(

        "sellInventoryItem",

        data

    );

}

async function listInventoryForMarketplace(data){

    return await api(

        "listInventoryForMarketplace",

        data

    );

}
/* ==========================================================
   NOTIFICATIONS
========================================================== */

async function getNotifications(userId){

    return await api(

        "getNotifications",

        {

            userId

        }

    );

}

async function markNotificationRead(notificationId){

    return await api(

        "markNotificationRead",

        {

            notificationId

        }

    );

}

async function deleteNotification(notificationId){

    return await api(

        "deleteNotification",

        {

            notificationId

        }

    );

}

/* ==========================================================
   TRANSACTIONS
========================================================== */

async function getTransactions(userId){

    return await api(

        "getTransactions",

        {

            userId

        }

    );

}

async function getAllTransactions(){

    return await api(

        "getAllTransactions"

    );

}

/* ==========================================================
   USERS
========================================================== */

async function getUsers(){

    return await api(

        "getUsers"

    );

}

async function getUser(userId){

    return await api(

        "getUser",

        {

            userId

        }

    );

}

async function updateUser(data){

    return await api(

        "updateUser",

        data

    );

}

async function suspendUser(userId){

    return await api(

        "suspendUser",

        {

            userId

        }

    );

}

async function unsuspendUser(userId){

    return await api(

        "unsuspendUser",

        {

            userId

        }

    );

}

async function deleteUser(userId){

    return await api(

        "deleteUser",

        {

            userId

        }

    );

}

async function resetUserPassword(userId,newPassword){

    return await api(

        "resetUserPassword",

        {

            userId,

            newPassword

        }

    );

}

/* ==========================================================
   ANNOUNCEMENTS
========================================================== */

async function getAnnouncements(){

    return await api(

        "getAnnouncements"

    );

}

async function createAnnouncement(data){

    return await api(

        "createAnnouncement",

        data

    );

}

async function updateAnnouncement(data){

    return await api(

        "updateAnnouncement",

        data

    );

}

async function deleteAnnouncement(announcementId){

    return await api(

        "deleteAnnouncement",

        {

            announcementId

        }

    );

}

/* ==========================================================
   DASHBOARD STATISTICS
========================================================== */

async function getDashboardStatistics(){

    return await api(

        "getDashboardStatistics"

    );

}

/* ==========================================================
   SETTINGS
========================================================== */

async function getSettings(){

    return await api(

        "getSettings"

    );

}

async function saveSettings(data){

    return await api(

        "saveSettings",

        data

    );

}

/* ==========================================================
   SYSTEM HEALTH
========================================================== */

async function ping(){

    return await api(

        "ping"

    );

}

/* ==========================================================
   GLOBAL EXPORTS
========================================================== */

window.API = API;

window.api = api;

window.login = login;
window.register = register;
window.creatorRegister = creatorRegister;

window.getProfile = getProfile;
window.updateProfile = updateProfile;

window.getKingdoms = getKingdoms;
window.addKingdom = addKingdom;
window.updateKingdom = updateKingdom;
window.deleteKingdom = deleteKingdom;

window.addCurrency = addCurrency;
window.removeCurrency = removeCurrency;
window.transferCurrency = transferCurrency;

window.submitSellerApplication = submitSellerApplication;
window.getSellerApplications = getSellerApplications;
window.approveSeller = approveSeller;
window.rejectSeller = rejectSeller;

window.getMarketplace = getMarketplace;
window.getProduct = getProduct;
window.createProduct = createProduct;
window.updateProduct = updateProduct;
window.deleteProduct = deleteProduct;
window.approveProduct = approveProduct;
window.rejectProduct = rejectProduct;
window.purchaseProduct = purchaseProduct;

window.getInventory = getInventory;
window.addInventoryItem = addInventoryItem;
window.removeInventoryItem = removeInventoryItem;
window.transferInventory = transferInventory;

window.getAuctions = getAuctions;
window.createAuction = createAuction;
window.updateAuction = updateAuction;
window.approveAuction = approveAuction;
window.rejectAuction = rejectAuction;
window.placeBid = placeBid;
window.closeAuction = closeAuction;

window.sellInventoryItem = sellInventoryItem;
window.listInventoryForMarketplace = listInventoryForMarketplace;

window.getNotifications = getNotifications;
window.markNotificationRead = markNotificationRead;
window.deleteNotification = deleteNotification;

window.getTransactions = getTransactions;
window.getAllTransactions = getAllTransactions;

window.getUsers = getUsers;
window.getUser = getUser;
window.updateUser = updateUser;
window.suspendUser = suspendUser;
window.unsuspendUser = unsuspendUser;
window.deleteUser = deleteUser;
window.resetUserPassword = resetUserPassword;

window.getAnnouncements = getAnnouncements;
window.createAnnouncement = createAnnouncement;
window.updateAnnouncement = updateAnnouncement;
window.deleteAnnouncement = deleteAnnouncement;

window.getDashboardStatistics = getDashboardStatistics;

window.getSettings = getSettings;
window.saveSettings = saveSettings;

window.ping = ping;

/* ==========================================================
   END OF FILE
========================================================== */
