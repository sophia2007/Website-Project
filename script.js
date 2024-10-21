let menuOpen = false;

function menuActions(menu) {
    animateIcon(menu);

    if (menuOpen){
        changeNav("0", "0");
        menuOpen = false;
    } else {
        changeNav("250px", "250px");
        menuOpen = true;
    }
}

function animateIcon(icon) {
    icon.classList.toggle("change");
    
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function changeNav(width, margin, color) {
    document.getElementById("side-nav").style.width = width;
    document.getElementById("main").style.marginLeft = margin;
}
