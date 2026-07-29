/* ==========================================================
   ROLEPLAY BANK
   app.js
   Global Application
========================================================== */

"use strict";

/* ==========================================================
   APPLICATION
========================================================== */

const App = {

    version: "1.0.0",

    name: "Roleplay Bank",

    api: "",

    currentUser: null,

    initialized: false

};

/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeApplication();

});

/* ==========================================================
   INITIALIZE
========================================================== */

async function initializeApplication(){

    if(App.initialized){

        return;

    }

    App.initialized = true;

    initializeSidebar();

    initializeNavigation();

    initializeButtons();

    initializeModals();

    initializeToast();

    initializeLoading();

    initializeTooltips();

    initializeDropdowns();

    initializeSearch();

    initializeTables();

    initializeCards();

    initializeUser();

    console.log(App.name + " Loaded");

}

/* ==========================================================
   SIDEBAR
========================================================== */

function initializeSidebar(){

    const sidebar = document.querySelector(".sidebar");

    const toggle = document.querySelector("#sidebarToggle");

    if(!sidebar || !toggle){

        return;

    }

    toggle.addEventListener("click",()=>{

        sidebar.classList.toggle("collapsed");

    });

}

/* ==========================================================
   NAVIGATION
========================================================== */

function initializeNavigation(){

    document

    .querySelectorAll("[data-page]")

    .forEach(button=>{

        button.addEventListener("click",()=>{

            const page = button.dataset.page;

            navigate(page);

        });

    });

}

function navigate(page){

    window.location.href = page;

}

/* ==========================================================
   BUTTONS
========================================================== */

function initializeButtons(){

    document

    .querySelectorAll("[data-action]")

    .forEach(button=>{

        button.addEventListener("click",event=>{

            const action = event.currentTarget.dataset.action;

            dispatchAction(action);

        });

    });

}

function dispatchAction(action){

    switch(action){

        case "logout":

            logout();

            break;

        case "close-modal":

            hideModal();

            break;

        case "close-toast":

            clearToast();

            break;

        default:

            console.warn("Unknown Action:",action);

    }

}

/* ==========================================================
   USER
========================================================== */

function initializeUser(){

    const user = localStorage.getItem("CURRENT_USER");

    if(!user){

        return;

    }

    App.currentUser = JSON.parse(user);

}

/* ==========================================================
   LOADING
========================================================== */

function showLoading(message="Loading..."){

    const overlay = document.querySelector("#loadingOverlay");

    if(!overlay){

        return;

    }

    const text = overlay.querySelector("p");

    if(text){

        text.textContent = message;

    }

    overlay.classList.remove("hidden");

}

function hideLoading(){

    const overlay = document.querySelector("#loadingOverlay");

    if(!overlay){

        return;

    }

    overlay.classList.add("hidden");

}

/* ==========================================================
   TOAST PLACEHOLDER
========================================================== */

function initializeToast(){

    if(document.querySelector("#toastContainer")){

        return;

    }

    const toast = document.createElement("div");

    toast.id = "toastContainer";

    document.body.appendChild(toast);

}

/* ==========================================================
   END PART 1
========================================================== */
/* ==========================================================
   TOAST SYSTEM
========================================================== */

const Toast = {

    container: null,

    duration: 4000

};

function getToastContainer(){

    if(Toast.container){

        return Toast.container;

    }

    let container = document.querySelector("#toastContainer");

    if(!container){

        container = document.createElement("div");

        container.id = "toastContainer";

        document.body.appendChild(container);

    }

    Toast.container = container;

    return container;

}

function showToast(message,type="info"){

    const container = getToastContainer();

    const toast = document.createElement("div");

    toast.className = "toast " + type;

    toast.innerHTML = `

        <div class="toast-content">

            <strong>${type.toUpperCase()}</strong>

            <p>${message}</p>

        </div>

        <button class="toast-close">

            <i class="fa-solid fa-xmark"></i>

        </button>

    `;

    container.appendChild(toast);

    toast.querySelector(".toast-close")

    .addEventListener("click",()=>{

        toast.remove();

    });

    setTimeout(()=>{

        toast.remove();

    },Toast.duration);

}

const toast={

    success(message){

        showToast(message,"success");

    },

    error(message){

        showToast(message,"error");

    },

    warning(message){

        showToast(message,"warning");

    },

    info(message){

        showToast(message,"info");

    }

};

/* ==========================================================
   MODAL SYSTEM
========================================================== */

function showModal(title,content){

    const modal = document.querySelector("#confirmModal");

    if(!modal){

        return;

    }

    modal.classList.remove("hidden");

    const heading = modal.querySelector("h2");

    const body = modal.querySelector(".modal-body");

    if(heading){

        heading.textContent = title;

    }

    if(body){

        body.innerHTML = content;

    }

}

function hideModal(){

    document

    .querySelectorAll(".modal")

    .forEach(modal=>{

        modal.classList.add("hidden");

    });

}

/* ==========================================================
   CONFIRMATION
========================================================== */

function confirmAction(message,callback){

    showModal(

        "Confirmation",

        `

        <p>${message}</p>

        <div class="wallet-actions">

            <button
                class="btn btn-primary"
                id="confirmAccept">

                Confirm

            </button>

            <button
                class="btn btn-secondary"
                id="confirmCancel">

                Cancel

            </button>

        </div>

        `

    );

    document

    .querySelector("#confirmAccept")

    .addEventListener("click",()=>{

        hideModal();

        if(typeof callback==="function"){

            callback();

        }

    });

    document

    .querySelector("#confirmCancel")

    .addEventListener("click",hideModal);

}

/* ==========================================================
   DATE
========================================================== */

function formatDate(date){

    return new Date(date)

    .toLocaleDateString(

        "en-US",

        {

            year:"numeric",

            month:"long",

            day:"numeric"

        }

    );

}

function formatDateTime(date){

    return new Date(date)

    .toLocaleString(

        "en-US",

        {

            year:"numeric",

            month:"short",

            day:"numeric",

            hour:"2-digit",

            minute:"2-digit"

        }

    );

}

/* ==========================================================
   CURRENCY
========================================================== */

function formatCurrency(amount,currency="Lumen"){

    return Number(amount).toLocaleString(

        "en-US"

    ) + " " + currency;

}

/* ==========================================================
   NUMBER
========================================================== */

function formatNumber(value){

    return Number(value)

    .toLocaleString("en-US");

}

/* ==========================================================
   CLIPBOARD
========================================================== */

async function copy(text){

    try{

        await navigator.clipboard.writeText(text);

        toast.success("Copied to clipboard.");

    }

    catch(error){

        toast.error("Unable to copy.");

    }

}

/* ==========================================================
   PAGE TITLE
========================================================== */

function setTitle(title){

    document.title = title + " | Roleplay Bank";

}

/* ==========================================================
   SCROLL
========================================================== */

function scrollTopSmooth(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/* ==========================================================
   END PART 2
========================================================== */
/* ==========================================================
   SEARCH
========================================================== */

function initializeSearch(){

    document

    .querySelectorAll("[data-search]")

    .forEach(input=>{

        input.addEventListener("input",event=>{

            const keyword = event.target.value

            .toLowerCase()

            .trim();

            const target = event.target.dataset.search;

            document

            .querySelectorAll(target)

            .forEach(item=>{

                const text = item.textContent.toLowerCase();

                item.style.display =

                    text.includes(keyword)

                    ? ""

                    : "none";

            });

        });

    });

}

/* ==========================================================
   TABLES
========================================================== */

function initializeTables(){

    document

    .querySelectorAll("table")

    .forEach(table=>{

        table.classList.add("table-ready");

    });

}

/* ==========================================================
   CARDS
========================================================== */

function initializeCards(){

    document

    .querySelectorAll(".card")

    .forEach(card=>{

        card.addEventListener("mouseenter",()=>{

            card.classList.add("active");

        });

        card.addEventListener("mouseleave",()=>{

            card.classList.remove("active");

        });

    });

}

/* ==========================================================
   DROPDOWNS
========================================================== */

function initializeDropdowns(){

    document

    .querySelectorAll(".dropdown-toggle")

    .forEach(button=>{

        button.addEventListener("click",()=>{

            const menu = button.nextElementSibling;

            if(menu){

                menu.classList.toggle("show");

            }

        });

    });

}

/* ==========================================================
   TOOLTIPS
========================================================== */

function initializeTooltips(){

    document

    .querySelectorAll("[data-tooltip]")

    .forEach(element=>{

        element.title = element.dataset.tooltip;

    });

}

/* ==========================================================
   FORM VALIDATION
========================================================== */

function validateRequired(form){

    let valid = true;

    form

    .querySelectorAll("[required]")

    .forEach(field=>{

        if(field.value.trim()===""){

            field.classList.add("input-error");

            valid = false;

        }

        else{

            field.classList.remove("input-error");

        }

    });

    return valid;

}

/* ==========================================================
   LOGOUT
========================================================== */

function logout(){

    confirmAction(

        "Are you sure you want to logout?",

        ()=>{

            localStorage.removeItem("CURRENT_USER");

            toast.success("Logged out successfully.");

            setTimeout(()=>{

                window.location.href="login.html";

            },1000);

        }

    );

}

/* ==========================================================
   EMPTY STATE
========================================================== */

function createEmptyState(message){

    return `

        <div class="empty-state">

            <i class="fa-solid fa-box-open"></i>

            <h3>No Records Found</h3>

            <p>${message}</p>

        </div>

    `;

}

/* ==========================================================
   SESSION
========================================================== */

function requireLogin(){

    const user = localStorage.getItem("CURRENT_USER");

    if(!user){

        window.location.href="login.html";

        return false;

    }

    App.currentUser = JSON.parse(user);

    return true;

}

/* ==========================================================
   HELPERS
========================================================== */

function generateId(prefix="ID"){

    return (

        prefix +

        "-" +

        Date.now() +

        "-" +

        Math.floor(Math.random()*100000)

    );

}

function sleep(milliseconds){

    return new Promise(resolve=>{

        setTimeout(resolve,milliseconds);

    });

}

function capitalize(text){

    return text.charAt(0).toUpperCase()

    + text.slice(1);

}

/* ==========================================================
   GLOBAL ERROR HANDLER
========================================================== */

window.addEventListener("error",event=>{

    console.error(

        "Application Error:",

        event.error

    );

    toast.error(

        "An unexpected error occurred."

    );

});

/* ==========================================================
   GLOBAL UNHANDLED PROMISES
========================================================== */

window.addEventListener(

    "unhandledrejection",

    event=>{

        console.error(

            event.reason

        );

        toast.error(

            "Unexpected server response."

        );

    }

);

/* ==========================================================
   EXPOSE GLOBAL METHODS
========================================================== */

window.toast = toast;

window.showLoading = showLoading;
window.hideLoading = hideLoading;

window.showModal = showModal;
window.hideModal = hideModal;

window.confirmAction = confirmAction;

window.formatCurrency = formatCurrency;
window.formatDate = formatDate;
window.formatDateTime = formatDateTime;
window.formatNumber = formatNumber;

window.copy = copy;

window.generateId = generateId;

window.requireLogin = requireLogin;

window.logout = logout;

window.navigate = navigate;

/* ==========================================================
   END OF FILE
========================================================== */
