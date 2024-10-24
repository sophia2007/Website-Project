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

    for (let i = 0; i < pages.length; i++) {
        if (pages[i] != page) {
            document.getElementById(pages[i]).style.height = 0;
        } else {
            document.getElementById(pages[i]).style.height = "100%";
        }
    }
}

// Create a new student item when clicking on the "Add" vutton
function newStudent() {
    var line = document.createElement("li");
    var inputValue = document.getElementById("inputStudent").value;
    var t = document.createTextNode(inputValue);
    line.appendChild(t);
    if (inputValue === "") {
        alert("Please enter your student's name!");
    } else {
        document.getElementById("studentList").appendChild(line);
    }
    document.getElementById("inputStudent").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    line.appendChild(span);
}

window.addEventListener('mousedown', checkClosed);

// Click on a close button to hide the current list item
function checkClosed() {
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}
