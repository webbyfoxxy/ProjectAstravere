const API_URL = "https://script.google.com/macros/s/AKfycbyHR5hZLyCrHazVyaEHiU3CGAbbkdANjRpkiErqaQbXT0OdG3JC221INd4HZCTt0rGM/exec";

async function apiRequest(action, data = {}) {
    try {
        const response = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ action, ...data }) });
        const result = await response.json();
        if (!result.success) console.error(result.message);
        return result;
    } catch (error) { return { success: false, message: "Server connection failed." }; }
}

/* AUTH & ACCOUNTS */
async function register(u, p, rp, k) { return apiRequest("register", {username:u,password:p,roleplayName:rp,kingdomId:k,role:"Member"}); }
async function registerCreator(u, p, rp, k, key) { return apiRequest("registerCreator", {username:u,password:p,roleplayName:rp,kingdomId:k,creatorKey:key}); }
async function registerTreasury(n, d, k) { return apiRequest("registerTreasury", {treasuryName:n, description:d, creatorKey:k}); }
async function registerInventoryAccount(n, d, k) { return apiRequest("registerInventoryAccount", {accountName:n, description:d, creatorKey:k}); }
async function login(u, p) { const r = await apiRequest("login", {username:u,password:p}); if(r.success) localStorage.setItem("currentUser", JSON.stringify(r.data)); return r; }
function logout() { localStorage.removeItem("currentUser"); window.location.href = "index.html"; }
function currentUser() { return localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null; }
function redirectByRole() { const u = currentUser(); if(!u) window.location.href="index.html"; else if(u.role==="Creator") window.location.href="creator-dashboard.html"; else if(u.role==="Seller") window.location.href="seller-dashboard.html"; else window.location.href="member-dashboard.html"; }

/* WALLET & TRANSFERS */
async function getWallet() { const u=currentUser(); return u ? apiRequest("getWallet",{userId:u.userId}) : {success:false}; }
async function transferMoney(r, c, a) { const u=currentUser(); return u ? apiRequest("transfer",{senderId:u.userId,receiverId:r,currency:c,amount:a}) : {success:false}; }
async function getTransactions() { const u=currentUser(); return u ? apiRequest("getTransactions",{userId:u.userId}) : {success:false}; }

/* TREASURY & LOANS */
async function treasuryTransfer(t, r, c, a) { return apiRequest("treasuryTransfer", {treasuryId:t,receiverId:r,currency:c,amount:a}); }
async function processLoan(t, u, c, a) { return apiRequest("processLoan", {treasuryId:t,userId:u,currency:c,amount:a}); }
async function getTreasuries() { return apiRequest("getTreasuries", {}); }
async function getLoans() { return apiRequest("getLoans", {}); }

/* INVENTORY ACCOUNT */
async function distributeItem(a, p, q, t="") { return apiRequest("distributeItem", {inventoryAccountId:a,productId:p,quantity:q,targetUserId:t}); }
async function getInventoryAccounts() { return apiRequest("getInventoryAccounts", {}); }

/* SELLER & MARKETPLACE */
async function applySeller(b, d) { const u=currentUser(); return u ? apiRequest("applySeller",{userId:u.userId,businessName:b,description:d}) : {success:false}; }
async function getSellerApplications() { return apiRequest("getSellerApplications", {}); }
async function approveSeller(id) { return apiRequest("approveSeller", {applicationId:id}); }
async function createProduct(d) { const u=currentUser(); return u ? apiRequest("createProduct",{sellerId:u.userId,...d}) : {success:false}; }
async function getProducts() { return apiRequest("getProducts", {}); }
async function getAllProducts() { return apiRequest("getAllProducts", {}); }
async function approveProduct(id) { return apiRequest("approveProduct", {productId:id}); }
async function purchaseProduct(id) { const u=currentUser(); return u ? apiRequest("purchaseProduct",{buyerId:u.userId,productId:id}) : {success:false}; }
async function getInventory() { const u=currentUser(); return u ? apiRequest("getInventory",{userId:u.userId}) : {success:false}; }

/* MEMBER MARKET */
async function listMemberItem(invId, p, c) { const u=currentUser(); return apiRequest("listMemberItem", {userId:u.userId,inventoryId:invId,price:p,currency:c}); }
async function getMemberMarket() { return apiRequest("getMemberMarket", {}); }
async function buyMemberItem(id) { const u=currentUser(); return apiRequest("buyMemberItem", {buyerId:u.userId,listingId:id}); }

/* AUCTIONS */
async function createAuction(d) { const u=currentUser(); return u ? apiRequest("createAuction",{sellerId:u.userId,...d}) : {success:false}; }
async function getAuctions() { return apiRequest("getAuctions", {}); }
async function approveAuction(id) { return apiRequest("approveAuction", {auctionId:id}); }
async function placeBid(id, a) { const u=currentUser(); return u ? apiRequest("placeBid",{bidderId:u.userId,auctionId:id,amount:a}) : {success:false}; }
async function closeAuction(id) { return apiRequest("closeAuction", {auctionId:id}); }

/* CREATOR & SYSTEM */
async function getDashboardStats() { return apiRequest("getDashboardStats", {}); }
async function createAnnouncement(t, c) { const u=currentUser(); return apiRequest("createAnnouncement", {userId:u.userId,title:t,content:c,creatorKey:"LuxemneauxCreator2026"}); }
async function getAnnouncements() { return apiRequest("getAnnouncements", {}); }
