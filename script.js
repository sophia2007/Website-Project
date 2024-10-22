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

function selectPage(page) {
    const pages = ["menu", "students", "layout", "seating", "display"];

    for (let i = 0; i < pages[i].length; i++) {
        if (pages[i] != page) {
            document.getElementById(pages[i]).style.opacity = 0;
        } else {
            document.getElementById(pages[i]).style.opacity = 1;
        }
    }
}


