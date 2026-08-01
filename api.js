const API_URL = "https://script.google.com/macros/s/AKfycbyHR5hZLyCrHazVyaEHiU3CGAbbkdANjRpkiErqaQbXT0OdG3JC221INd4HZCTt0rGM/exec";
async function apiRequest(action, data = {}) {
    try {
        const response = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ action, ...data }) });
        const result = await response.json();
        if (!result.success) console.error(result.message);
        return result;
    } catch (error) { return { success: false, message: "Server connection failed." }; }
}

/* THEME SWITCHER */
function setTheme(theme) {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    const select = document.getElementById('themeSelect');
    if(select) select.value = theme;
}
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark-gold';
    setTheme(savedTheme);
}

async function register(u, p, rp, k) { return apiRequest("register", {username:u,password:p,roleplayName:rp,kingdomId:k,role:"Member"}); }
async function registerCreator(u, p, rp, k, key) { return apiRequest("registerCreator", {username:u,password:p,roleplayName:rp,kingdomId:k,creatorKey:key}); }
async function registerTreasury(n, d, k, p) { return apiRequest("registerTreasury", {treasuryName:n, description:d, creatorKey:k, password:p}); }
async function registerInventoryAccount(n, d, k, p) { return apiRequest("registerInventoryAccount", {accountName:n, description:d, creatorKey:k, password:p}); }
async function login(u, p) { const r = await apiRequest("login", {username:u,password:p}); if(r.success) localStorage.setItem("currentUser", JSON.stringify(r.data)); return r; }
function logout() { localStorage.removeItem("currentUser"); window.location.href = "index.html"; }
function currentUser() { return localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null; }
function redirectByRole() { 
    const u = currentUser(); 
    if(!u) window.location.href="index.html"; 
    else if(u.role==="Creator") window.location.href="creator-dashboard.html"; 
    else if(u.role==="Seller") window.location.href="seller-dashboard.html"; 
    else if(u.role==="Treasury") window.location.href="treasury-dashboard.html"; 
    else if(u.role==="Inventory") window.location.href="inventory-dashboard.html"; 
    else window.location.href="member-dashboard.html"; 
}
async function getWallet() { const u=currentUser(); return u ? apiRequest("getWallet",{userId:u.userId}) : {success:false}; }
async function transferMoney(r, c, a) { const u=currentUser(); return u ? apiRequest("transfer",{senderId:u.userId,receiverUsername:r,currency:c,amount:a}) : {success:false}; }
async function addCurrency(r, c, a) { return apiRequest("addCurrency", {receiverUsername:r,currency:c,amount:a}); }
async function exchangeCurrency(f, t, a) { const u=currentUser(); return u ? apiRequest("exchangeCurrency",{userId:u.userId,fromCurrency:f,toCurrency:t,amount:a}) : {success:false}; }
async function getTransactions() { const u=currentUser(); return u ? apiRequest("getTransactions",{userId:u.userId}) : {success:false}; }
async function getUserLoans() { const u=currentUser(); return u ? apiRequest("getUserLoans",{userId:u.userId}) : {success:false}; }
async function treasuryTransfer(t, r, c, a) { return apiRequest("treasuryTransfer", {treasuryId:t,receiverUsername:r,currency:c,amount:a}); }
async function processLoan(t, u, c, a) { return apiRequest("processLoan", {treasuryId:t,receiverUsername:u,currency:c,amount:a}); }
async function liquidateLoan(id) { return apiRequest("liquidateLoan", {loanId:id}); }
async function getTreasuries() { return apiRequest("getTreasuries", {}); }
async function getLoans() { return apiRequest("getLoans", {}); }
async function distributeItem(a, p, q, t="") { return apiRequest("distributeItem", {inventoryAccountId:a,productId:p,quantity:q,targetUsername:t}); }
async function getInventoryAccounts() { return apiRequest("getInventoryAccounts", {}); }
async function applySeller(b, d) { const u=currentUser(); return u ? apiRequest("applySeller",{userId:u.userId,businessName:b,description:d}) : {success:false}; }
async function getSellerApplications() { return apiRequest("getSellerApplications", {}); }
async function approveSeller(id) { return apiRequest("approveSeller", {applicationId:id}); }
async function rejectSeller(id) { return apiRequest("rejectSeller", {applicationId:id}); }
async function createProduct(d) { const u=currentUser(); return u ? apiRequest("createProduct",{sellerId:u.userId,...d}) : {success:false}; }
async function getProducts() { return apiRequest("getProducts", {}); }
async function getAllProducts() { return apiRequest("getAllProducts", {}); }
async function approveProduct(id) { return apiRequest("approveProduct", {productId:id}); }
async function rejectProduct(id) { return apiRequest("rejectProduct", {productId:id}); }
async function purchaseProduct(id) { const u=currentUser(); return u ? apiRequest("purchaseProduct",{buyerId:u.userId,productId:id}) : {success:false}; }
async function getInventory() { const u=currentUser(); return u ? apiRequest("getInventory",{userId:u.userId}) : {success:false}; }
async function listMemberItem(invId, p, c) { const u=currentUser(); return apiRequest("listMemberItem", {userId:u.userId,inventoryId:invId,price:p,currency:c}); }
async function getMemberMarket() { return apiRequest("getMemberMarket", {}); }
async function buyMemberItem(id) { const u=currentUser(); return u ? apiRequest("buyMemberItem",{buyerId:u.userId,listingId:id}) : {success:false}; }
async function createAuction(d) { const u=currentUser(); return u ? apiRequest("createAuction",{sellerId:u.userId,...d}) : {success:false}; }
async function getAuctions() { return apiRequest("getAuctions", {}); }
async function approveAuction(id) { return apiRequest("approveAuction", {auctionId:id}); }
async function rejectAuction(id) { return apiRequest("rejectAuction", {auctionId:id}); }
async function placeBid(id, a) { const u=currentUser(); return u ? apiRequest("placeBid",{bidderId:u.userId,auctionId:id,amount:a}) : {success:false}; }
async function closeAuction(id) { return apiRequest("closeAuction", {auctionId:id}); }
async function getDashboardStats() { return apiRequest("getDashboardStats", {}); }
async function getAllUsers() { return apiRequest("getAllUsers", {}); }
async function updateUserStatus(id, status) { return apiRequest("updateUserStatus", {userId:id, status:status}); }
async function createAnnouncement(t, c) { const u=currentUser(); return apiRequest("createAnnouncement", {userId:u.userId,title:t,content:c,creatorKey:"LuxemneauxCreator2026"}); }
async function getAnnouncements() { return apiRequest("getAnnouncements", {}); }
