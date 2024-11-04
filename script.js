var menuOpen = false;
var currentPage;

function menuActions(menu) {
    animateIcon(menu);
    if (menuOpen){
        changeNav("0");
        menuOpen = false;
    } else {
        changeNav("250px");
        menuOpen = true;
    }
}

function animateIcon(icon) {
    icon.classList.toggle("change");
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function changeNav(width) {
    document.getElementById("side-nav").style.width = width;
}

function selectPage(page) {
    const pages = ["menu", "students", "layout"];

    if (page == "seating" || page == "display") {
        var displayedPage = "layout";
    } else {
        var displayedPage = page;
    }

    for (let i = 0; i < pages.length; i++) {
        if (pages[i] != displayedPage) {
            document.getElementById(pages[i]).style.display = "none";
        } else {
            document.getElementById(pages[i]).style.display = "initial";
        }
    }
    
    switch (page) {
        case "layout":
            makeDisplay("initial", "none", "none", true, false, true);
            break;
        case "seating":
            makeDisplay("none", "initial", "none", false, true, false);
            break;
        case "display":
            makeDisplay("none", "none", "initial", false, false, false);
            break;
    }

    currentPage = page;

}

// Allows for the pages between Layout, Seating and Display to have different headers but the same seats grid
function makeDisplay(lHeader, sHeader, dHeader, spotVisible, seatDroppable, seatMoveable) {
    document.getElementById("layoutHeader").style.display = lHeader;
    document.getElementById("seatingHeader").style.display = sHeader;
    document.getElementById("displayHeader").style.display = dHeader;

    document.querySelectorAll(".spot").forEach(function (spot) {
        if (spotVisible) {
            spot.style.backgroundColor = "#00000033";
            spot.style.border = "1px solid black";
        } else {
            spot.style.backgroundColor = "#00000000";
            spot.style.border = "0";
        }
       
    });

    document.querySelectorAll(".seat").forEach(function (seat) {
        if (seatDroppable) {
            seat.setAttribute('ondrop', 'drop(event)');
            seat.setAttribute('ondragover', 'allowDrop(event)');
        } else {
            seat.removeAttribute('ondrop');
            seat.removeAttribute('ondragover');
        }
        if (seatMoveable) {
            seat.setAttribute('draggable', 'true');
        } else {
            seat.setAttribute('draggable', 'false');
        }
    });
}

// Create a new student item when clicking on the "Add" vutton
function newStudent() {
    var line = document.createElement("li");
    var studentName = document.getElementById("inputStudent").value;
    var t = document.createTextNode(studentName);
    line.appendChild(t);

    if (studentName === "") {
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

// Make the students as they've been entered in the Student page when the update button is clicked in Seating page
function makeStudent() {
    var allStudents = document.getElementById("studentList").children;
    
    var i;
    for (i = 0; i < allStudents.length; i++) {
        if (!(allStudents[i].style.display === "none")) {
            var studentName = allStudents[i].firstChild.textContent;
            var studentBlock = document.createElement("div");
            studentBlock.setAttribute("class", "studentBlock");
            studentBlock.setAttribute('draggable', 'true');
            studentBlock.setAttribute('ondragstart', 'dragStart(event)');
            studentBlock.setAttribute('ondragend', 'dragEnd(event)');
            studentBlock.innerHTML += studentName;
            studentBlock.id = studentName;
            document.getElementById("studentClassrooom").appendChild(studentBlock);
        }
    }
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

var originalSeat;

function dragStart(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.target.classList.add("dragging");
    originalSeat = ev.target.parentElement.firstChild;
}

function dragEnd(ev) {
    ev.target.classList.remove("dragging");
    originalSeat.style.display = "initial";
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    switch (currentPage) {
        case "layout":
            if (ev.target instanceof HTMLDivElement && !(ev.target.hasChildNodes())) {
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text/plain");
                ev.target.appendChild(document.getElementById(data));
            }
            break;
        case "seating":
            if (ev.target instanceof HTMLImageElement && !(ev.target.hasChildNodes())) {
                ev.preventDefault();
                var data = ev.dataTransfer.getData("text/plain");
                ev.target.style.display = "none";
                ev.target.parentElement.appendChild(document.getElementById(data));
            }
            break;
    }
    
}


// Create the correct number of seats upon clicking the "Confirm" vutton
function newSeat() {
    var numOfSeat = document.getElementById("inputNumOfSeat").value;

    const spotList = document.querySelectorAll(".spot");
    while (spotList.childElementCount > 0) {
        spotList.removeChild(spotList.firstChild);
    }

    if (numOfSeat === "") {
        alert("Please enter a postive integer.")
    } else {
        var i;
        for (i = 0; i < numOfSeat; i++) {
            var seat = document.createElement("img");
            seat.setAttribute('id', 'seat' + i);
            seat.setAttribute('class', 'seat');
            seat.setAttribute('src', 'Seat.png');
            seat.setAttribute('draggable', 'true');
            seat.setAttribute('ondragstart', 'dragStart(event)');
            seat.setAttribute('ondragend', 'dragEnd(event)');
            spotList[i].appendChild(seat);
        }
    }

}
