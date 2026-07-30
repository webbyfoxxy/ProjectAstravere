/*******************************************************
 * LUXEMNEAUX ROLEPLAY BANK
 * api.js
 * COMPLETE VERSION
 *******************************************************/

const API_URL = "https://script.google.com/macros/s/AKfycbyHR5hZLyCrHazVyaEHiU3CGAbbkdANjRpkiErqaQbXT0OdG3JC221INd4HZCTt0rGM/exec";

async function apiRequest(action, data = {}) {
    try {
        const payload = { action, ...data };
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (!result.success) console.error(result.message);
        return result;
    } catch (error) {
        console.error("API ERROR:", error);
        return { success: false, message: "Server connection failed." };
    }
}

/* --- AUTH --- */
async function register(username, password, roleplayName, kingdomId) {
    return apiRequest("register", { username, password, roleplayName, kingdomId, role: "Member" });
}
async function registerCreator(username, password, roleplayName, kingdomId, creatorKey) {
    return apiRequest("registerCreator", { username, password, roleplayName, kingdomId, creatorKey });
}
async function login(username, password) {
    const result = await apiRequest("login", { username, password });
    if (result.success) localStorage.setItem("currentUser", JSON.stringify(result.data));
    return result;
}
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
function currentUser() {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
}
function redirectByRole() {
    const user = currentUser();
    if (!user) { window.location.href = "index.html"; return; }
    switch (user.role) {
        case "Creator": window.location.href = "creator-dashboard.html"; break;
        case "Seller": window.location.href = "seller-dashboard.html"; break;
        default: window.location.href = "member-dashboard.html";
    }
}

/* --- WALLET --- */
async function getWallet() {
    const user = currentUser();
    if (!user) return { success: false, message: "Not logged in." };
    return apiRequest("getWallet", { userId: user.userId });
}
async function transferMoney(receiverId, currency, amount) {
    const user = currentUser();
    if (!user) return { success: false, message: "Not logged in." };
    return apiRequest("transfer", { senderId: user.userId, receiverId, currency, amount });
}
async function addCurrency(userId, currency, amount) {
    const user = currentUser();
    if (!user || user.role !== "Creator") return { success: false, message: "Creator access required." };
    return apiRequest("addCurrency", { creatorId: user.userId, userId, currency, amount });
}
async function getTransactions() {
    const user = currentUser();
    if (!user) return null;
    return apiRequest("getTransactions", { userId: user.userId });
}

/* --- TREASURY & LOANS --- */
async function registerTreasury(treasuryName, description, creatorKey) {
    const user = currentUser();
    if (!user) return { success: false, message: "Not logged in." };
    return apiRequest("registerTreasury", { creatorId: user.userId, treasuryName, description, creatorKey });
}
async function treasuryTransfer(treasuryId, receiverId, currency, amount) {
    return apiRequest("treasuryTransfer", { treasuryId, receiverId, currency, amount });
}
async function processLoan(treasuryId, userId, currency, amount) {
    return apiRequest("processLoan", { treasuryId, userId, currency, amount });
}
async function repayLoan(loanId) {
    const user = currentUser();
    return apiRequest("repayLoan", { userId: user.userId, loanId });
}

/* --- CENTRAL INVENTORY ACCOUNT --- */
async function registerInventoryAccount(accountName, description, creatorKey) {
    const user = currentUser();
    if (!user) return { success: false, message: "Not logged in." };
    return apiRequest("registerInventoryAccount", { creatorId: user.userId, accountName, description, creatorKey });
}
async function distributeItem(inventoryAccountId, productId, quantity, targetUserId = "") {
    return apiRequest("distributeItem", { inventoryAccountId, productId, quantity, targetUserId });
}

/* --- SELLER & MARKETPLACE --- */
async function applySeller(businessName, description) {
    const user = currentUser();
    if (!user) return { success: false, message: "Not logged in." };
    return apiRequest("applySeller", { userId: user.userId, businessName, description });
}
async function approveSeller(applicationId) {
    const user = currentUser();
    if (!user || user.role !== "Creator") return { success: false, message: "Creator access required." };
    return apiRequest("approveSeller", { creatorId: user.userId, applicationId });
}
async function createProduct(productData) {
    const user = currentUser();
    if (!user) return { success: false, message: "Not logged in." };
    return apiRequest("createProduct", { sellerId: user.userId, ...productData });
}
async function getProducts() { return apiRequest("getProducts", {}); }
async function approveProduct(productId) {
    const user = currentUser();
    if (!user || user.role !== "Creator") return { success: false, message: "Creator access required." };
    return apiRequest("approveProduct", { creatorId: user.userId, productId });
}
async function purchaseProduct(productId) {
    const user = currentUser();
    if (!user) return { success: false, message: "Not logged in." };
    return apiRequest("purchaseProduct", { buyerId: user.userId, productId });
}
async function getInventory() {
    const user = currentUser();
    if (!user) return null;
    return apiRequest("getInventory", { userId: user.userId });
}

/* --- AUCTIONS --- */
async function createAuction(auctionData) {
    const user = currentUser();
    if (!user) return { success: false, message: "Not logged in." };
    return apiRequest("createAuction", { sellerId: user.userId, ...auctionData });
}
async function getAuctions() { return apiRequest("getAuctions", {}); }
async function approveAuction(auctionId) {
    const user = currentUser();
    if (!user || user.role !== "Creator") return { success: false, message: "Creator access required." };
    return apiRequest("approveAuction", { creatorId: user.userId, auctionId });
}
async function placeBid(auctionId, amount) {
    const user = currentUser();
    if (!user) return { success: false, message: "Not logged in." };
    return apiRequest("placeBid", { bidderId: user.userId, auctionId, amount });
}
async function closeAuction(auctionId) {
    const user = currentUser();
    if (!user || user.role !== "Creator") return { success: false, message: "Creator access required." };
    return apiRequest("closeAuction", { creatorId: user.userId, auctionId });
}

/* --- CREATOR & SYSTEM --- */
async function createKingdom(kingdomData) {
    const user = currentUser();
    if (!user || user.role !== "Creator") return { success: false, message: "Creator access required." };
    return apiRequest("createKingdom", { creatorId: user.userId, ...kingdomData });
}
async function getKingdoms() { return apiRequest("getKingdoms", {}); }
async function getDashboardStats() { return apiRequest("getDashboardStats", {}); }
async function getSellerApplications() { return apiRequest("getSellerApplications", {}); }
