/* ==========================================================
   ROLEPLAY BANK
   MAIN FRONTEND CONTROLLER
========================================================== */



/* ==========================================================
   CURRENT USER
========================================================== */


function getCurrentUser(){


    return JSON.parse(

        localStorage.getItem(

            "currentUser"

        )

    );


}





/* ==========================================================
   SAVE USER SESSION
========================================================== */


function saveSession(user){


    localStorage.setItem(

        "currentUser",

        JSON.stringify(user)

    );


}





/* ==========================================================
   LOGOUT
========================================================== */


function logout(){


    localStorage.removeItem(

        "currentUser"

    );



    window.location.href =

    "index.html";


}





/* ==========================================================
   REQUIRE LOGIN
========================================================== */


function requireLogin(){


    const user =

    getCurrentUser();



    if(!user){


        window.location.href =

        "index.html";


        return false;


    }



    return true;


}





/* ==========================================================
   ROLE CHECK
========================================================== */


function requireRole(role){



    const user =

    getCurrentUser();



    if(!user){


        window.location.href =

        "index.html";


        return false;


    }





    if(user.role !== role){



        redirectDashboard();



        return false;


    }




    return true;


}





/* ==========================================================
   AUTO REDIRECT
========================================================== */


function redirectDashboard(){


    const user =

    getCurrentUser();



    if(!user){


        window.location.href =

        "index.html";


        return;


    }





    switch(user.role){



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





/* ==========================================================
   LOAD SIDEBAR
========================================================== */


async function loadSidebar(){



    const container =

    document.getElementById(

        "sidebar-container"

    );



    if(!container){

        return;

    }





    const response =

    await fetch(

        "sidebar.html"

    );



    const html =

    await response.text();



    container.innerHTML = html;



}






/* ==========================================================
   DISPLAY USER NAME
========================================================== */


function displayUserName(){



    const user =

    getCurrentUser();



    const element =

    document.getElementById(

        "user-name"

    );



    if(

        element &&

        user

    ){



        element.innerHTML =

        user.roleplayName;


    }


}






/* ==========================================================
   NOTIFICATION COUNT
========================================================== */


async function loadNotificationCount(){



    const user =

    getCurrentUser();



    if(!user){

        return;

    }




    const result =

    await apiRequest(

        "getNotifications",

        {

            userId:user.userId

        }

    );





    if(!result.success){

        return;

    }





    const unread =

    result.data.filter(

        n =>

        n.status === "Unread"

    ).length;





    const badge =

    document.getElementById(

        "notification-count"

    );





    if(badge){



        badge.innerHTML =

        unread;


    }



}





/* ==========================================================
   INITIALIZE
========================================================== */


document.addEventListener(

"DOMContentLoaded",

()=>{



    loadSidebar();



    displayUserName();



    loadNotificationCount();



}

);
