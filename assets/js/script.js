/*Variables*/
const body = document.body;
const currentlocation = location.href;
const navUl = document.getElementById('nav-ul');
let navItems = document.querySelectorAll('.nav-li');
let navLinks = document.querySelectorAll('.nav-a');
let navLength = navItems.length;
const navToggle = document.querySelector('.nav-toggle');
const hamburger = document.querySelector('.hamburger');
const hamburgerX = document.querySelector('.hamburger-x');
let dropDownButtons = document.getElementsByClassName('dropdown-btn');
let dropDownButtonsLength = dropDownButtons.length;
let dropDownButtonsIcons = document.getElementsByClassName('dropdown-btn-icon');
let checkBoxes = document.querySelectorAll('.checkbox-btn');
let checkBoxesLength = checkBoxes.length;
const recurringCheckbox = document.getElementById('recurring-checkbox-toggle');
const recurringInfoDiv = document.getElementById('recurring-input-div-toggle');
const attendantCheckbox = document.getElementById('checkbox-toggle');
const attendantInfoDiv = document.getElementById('input-div-toggle');
const bookingBtn = document.getElementById('book-btn');
const bookingPopup = document.getElementById('booking-popup');
let breadCrumbSpan = document.getElementById('breadcrumb-toggle');

/*Store windowsize*/
let windowSize = window.innerWidth;

/*Save enter and spacekey in variables to listen to later*/
const enterKey = 27;
const spaceKey = 32;

//I hate CSS sometimes.
if (currentlocation.includes('info.html')) {
    let dropDownDiv = document.querySelector('.dropdown-buttons-div');
    dropDownDivFirstChild = dropDownDiv.firstElementChild;
    dropDownDivFirstChildBtn = dropDownDivFirstChild.firstElementChild;
    dropDownDivFirstChildBtn.style.margin = "0px 0px 0px 0px";
}

if (currentlocation.includes('booking.html') ) {
    let selectDiv = document.querySelectorAll('.select-div');
    let length = selectDiv.length;

    for (let i = 0; i < length; i++) {
        selectDiv[i].style.padding = "0px";
    }
}


/* Loop Through nav to add active class on li item that matches currentLocation */
for (let i = 0; i < navLength; i++) {
    //If current navitem is the same as href, add active class.
    if (navLinks[i].href == currentlocation) {
        navLinks[i].className = "nav-a active";
    }
}

                                                                                    /*Functions*/
/*Function to check if we need hamburger menu or not*/
function bodyToggle () {
    body.classList.toggle('nav-open');

    if (body.className == 'nav-open') {
        hamburger.style.display = 'none';
        hamburgerX.style.display = 'block';
        navUl.style.display = "block";
        navUl.tabIndex = 0;
    } else {
        hamburger.style.display = 'block';
        hamburgerX.style.display = 'none';
        navUl.style.display = "none";
        navUl.tabIndex = -1;
    }
}

/*Function that checks the windowsize of the user and displays the full nav if the screen size is larger than 782*/
function checkWindowSize (x) { 
    console.log("Windowsize: " + x)
    if (x <= 782) {
        navUl.classList.add('ul-hidden');
    } else {
        navUl.classList.remove('ul-hidden');
    }
}

//Changes second breadcrumb to current location
function checkBreadCrumb(href, span) {
    //Conditionals
    if (currentlocation.includes('booking.html') ) {return "Boka färdtjänst"}
    if (currentlocation.includes('info.html') ) {return "Information"}
    if (currentlocation.includes('apply.html') ) {return "Ansök om färdtjänst"}
    if (currentlocation.includes('contact.html') ) {return "Kontakt"}
    if (currentlocation.includes('mypages.html') ) {return "Mina sidor"}
    if (currentlocation.includes('login-booking.html') ) {return "Logga in"}
    if (currentlocation.includes('login-my-pages') ) {return "Logga in"}

    //Return empty if it's index
    return "";
}

/*Event listeners*/

/*Add class .nav-open when hamburger is clicked*/
navToggle.addEventListener('click', () => {
    bodyToggle();
});

/*Toggle ul when enter or space is pressed*/
navToggle.addEventListener('keyup', (e) => {
    //if e.keyCode is equal to enterkey or spacekey, toggle class on body
    if (e.keyCode == enterKey || e.keyCode == spaceKey) {
        bodyToggle();
    }
});

//Remove nav if body is clicked on
/*document.addEventListener('click', (e) => {
    //If click inside nav ul, do nothing. e.target.closest(navUl) 
    if (e.target.closest(navUl)) {
        return;
    } else {
        //If not, remove nav-open on body
        body.classList.remove('nav-open');
    }
});*/

//Remove nav-open class on load
window.addEventListener('load', () => {
    document.body.classList.remove('nav-open');
    navUl.style.display = "flex";
});

//Run breadcrumbs funktion on load
window.addEventListener('load', () => {
    let result = checkBreadCrumb(currentlocation, breadCrumbSpan);
    breadCrumbSpan.innerHTML = result;

    //Save parent link tag and breadcrumbs baseuri 
    let a = breadCrumbSpan.parentElement;
    let href = breadCrumbSpan.baseURI;

    //Set link tag to proper href
    a.setAttribute('href', href);
});

/*Detect viewport width when window resizes*/
window.addEventListener('resize', () => {
    windowSize = window.innerWidth;
    checkWindowSize(windowSize);  
  });

/*Add eventlistener to all dropdown-buttons*/
for (let i = 0; i < dropDownButtonsLength; i++) {
    dropDownButtons[i].addEventListener('click', () => {

        dropDownToggle(dropDownButtons[i]);

        checkBtnOpen(dropDownButtons[i]);
        
    });

    //Prevent button to still be focused when clicking with mouse
    for (let i = 0; i < dropDownButtonsLength; i++) {
        dropDownButtons[i].addEventListener('mouseup', () => dropDownButtons[i].blur())
    }

    //Check for space or enter key on button
    dropDownButtons[i].addEventListener ('keyup', (e) => {
        if (e.keyCode == enterKey || e.keyCode == spaceKey) {
        dropDownToggle(dropDownButtons[i]);

        checkBtnOpen(dropDownButtons[i]);
        }      
    });
}

//Add eventlistener to boooking button, show popup div if clicked
bookingBtn.addEventListener('click', () => {
    bookingPopupToggle(bookingBtn);
});

function bookingPopupToggle(btn) {
    //Store variables
    let nextSibling = btn.nextElementSibling;
    
    //Toggle class
    nextSibling.classList.toggle('pop');

    if (nextSibling.classList.contains('pop')) {
        btn.blur();
        btn.style.display = "none";
        btn.setAttribute("aria-expanded", 'true');
        nextSibling.setAttribute("aria-expanded", 'true');
        nextSibling.style.display = "flex";
        nextSibling.style.flexDirection = "row";

        //Store delete-button in variable
        let removeBtn = document.getElementById('popup-close-btn');

        removeBtn.addEventListener('click', () => {
            nextSibling.style.display = "none";
            nextSibling.style.flexDirection = "unset";
            nextSibling.classList.remove('pop');
            btn.style.display = "block";
            btn.setAttribute("aria-expanded", 'false');
            nextSibling.setAttribute("aria-expanded", 'false');
        });
    } else {
        nextSibling.style.display = "none";
        btn.setAttribute("aria-expanded", 'false');
        nextSibling.setAttribute("aria-expanded", 'false');
    }
}

function ariaExpand (btn, div) {

}

//Lose focus on all checkboxes if clicked
for (let i = 0; i < checkBoxesLength; i++) {
    checkBoxes[i].addEventListener('click', () => {checkBoxes[i].blur()});
}

//Toggle attendant div if checkbox changes
attendantCheckbox.addEventListener('change', () => {
    checkBoxToggle(attendantCheckbox, attendantInfoDiv);
});

//Toggle recurring div if checkbox changes
recurringCheckbox.addEventListener('change', () => {
    checkBoxToggle(recurringCheckbox, recurringInfoDiv);
});

//Function for checkboxes to toggle divs beneath
function checkBoxToggle(btn, div) {
    if (btn.checked) {
        div.style.display = "block";
        setTimeout(() => {
            div.style.transform = "scaleY(1)";
          }, 100);
        
    } else {
        div.style.transform = "scaleY(0)";
        setTimeout(() => {
            div.style.display = "none";   
          }, 100);
    }  
}


function dropDownToggle(btn) {
    //Store the buttons hidden text div in a variable
    let nextSibling = btn.nextElementSibling;
    
    //Toggle btn-open class to make it show
    nextSibling.classList.toggle('btn-open');
}

function checkBtnOpen (btn) {
    //Store buttons text div in a variable
    let btnNextSibling = btn.nextElementSibling;

    //Store icon in a variable
    let icon = btn.lastElementChild;
        
    //Check if div has class 'btn-open', if so set Aria-expanded to true. Rotate icon aswell
    if (btnNextSibling.classList.contains('btn-open')) {
        btn.setAttribute("aria-expanded", 'true');
        btnNextSibling.setAttribute("aria-expanded", 'true');
        icon.style.transform = "rotate(180deg)";
        icon.style.margin = "0px 5px 0px auto";       
    } else {
        btn.setAttribute("aria-expanded", 'false');
        btnNextSibling.setAttribute("aria-expanded", 'false');
        icon.style.transform = "rotate(360deg)";
        icon.style.margin = "0px 5px 0px auto";
        btn.blur();
    }
}

//Set breadcrumb span to current location


