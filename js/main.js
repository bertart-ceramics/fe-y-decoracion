window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if(window.scrollY > 50){

        navbar.style.background =
        "rgba(255,255,255,0.98)";

        navbar.style.boxShadow =
        "0 5px 20px rgba(0,0,0,.08)";

    }else{

        navbar.style.background =
        "rgba(255,255,255,.95)";

        navbar.style.boxShadow =
        "0 2px 15px rgba(0,0,0,.05)";
    }

});