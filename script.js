//-------------scroll sections active link ---------
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove("active");
                document.querySelector("header nav a[href*=" + id +"]").classList.add("active");
            });
        };
    });

//---------Sticky Navbar------------
    
    let header = document.querySelector('.header');
    
    header.classList.toggle('sticky', window.scrollY > 100);
};
    
//-------OnClick feature on About Section-----------

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab")
}

//---------Contact Form------------

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    //it won't do nothing if the form doesn't validate
    if (!validateForm(form)) return;

    //if form is valid, i'll be submited
    alert("Message succefully sent!");
});

const validateForm = (form) => {
    let valid = true;
    //it will check for empty fields
    let name = form.querySelector(".name");
    let message = form.querySelector(".message");
    let email = form.querySelector(".email");

    if (name.value === "") {
        giveError(name, "Please enter your name");
        valid = false;
    }
    if (message.value === "") {
        giveError(message, "Please enter your message");
        valid = false;
    }

   //E-mail Validation
   let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   let emailValue = email.value;
   if (!emailRegex.test(emailValue)){
    giveError(email, "Please enter a valid email");
    valid = false;
   }
   //to return true if email is valid
   if(valid) {
    return true; //!!!!!personalizar janela pop-out!!!!!!
   }
};

const giveError = (field, message) => {
    let parentElement = field.parentElement;
    parentElement.classList.add("error");
    //if the error message already exists, it'll not repeat it
    let existingError = parentElement.querySelector(".err-msg")
    if(existingError) {
        existingError.remove();
    }
    let error = document.createElement("span")
    error.textContent = message;
    error.classList.add("err-msg");
    parentElement.appendChild(error);
}
//Removing error on input
const inputs = document.querySelectorAll("input");
const textareas = document.querySelectorAll("textarea");

let allFields = [... inputs, ...textareas];

allFields.forEach((field) => {
    field.addEventListener("input", () => {
        removeError(field);
    });
});
const removeError = (field) => {
    let parentElement = field.parentElement;
    parentElement.classList.remove("error");
    let error = parentElement.querySelector(".err-msg");
    if(error) {
        error.remove();
    }
};