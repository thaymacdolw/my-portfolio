//----------------Scroll Reveal --------------
ScrollReveal({
    //reset: true,
    distance: '80px',
    duration: 1000,
    delay: 100
});
ScrollReveal().reveal('.home-content, .heading, .subtitle-about', { origin: 'top' });
ScrollReveal().reveal('.home-img img,.ul-stacks,.portfolio-box,.contact-container', { origin: 'bottom' });
ScrollReveal().reveal('.about-col-1', { origin: 'left' });

// -------------- Pop-out Modal ----------------------
document.addEventListener('DOMContentLoaded', () => {
    const openButtons = document.querySelectorAll('.open-modal');
    const closeButtons = document.querySelectorAll('.modal_close');
    const modalContainers = document.querySelectorAll('.modal_container');

    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modalId;
            const modal = document.getElementById(modalId);
            modalContainers.forEach(container => container.style.display = 'none'); // Oculta todos os modais antes de abrir um novo
            modal.style.display = 'block'; // Exibe o modal específico
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal_container');
            modal.style.display = 'none'; // Oculta o modal específico
        });
    });
});
//-------------scroll sections active link ---------
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove("active");
                document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
            });
        };
    });

//---------Sticky Navbar------------

    let header = document.querySelector('.header');

    header.classList.toggle('sticky', window.scrollY > 100);
};
//------------------scroll-behavior: smooth--------------------------------

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//--------------CV DOWNLOAD--------------------
// Seleciona todos os elementos com a classe .downloadButton
var downloadButtons = document.querySelectorAll('.downloadButton');

// Adiciona um event listener para cada botão
downloadButtons.forEach(function(button) {
    button.addEventListener('click', function () {
        // URL do arquivo PDF no GitHub
        var pdfUrl = 'https://raw.githack.com/thaymacdolw/my-portfolio/main/assets/cvthay.pdf';

        // Fetch para obter o PDF
        fetch(pdfUrl) 
            .then(response => response.blob())
            .then(pdfBlob => {
                // Cria um link temporário para o PDF
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(pdfBlob);
                link.download = 'ThaynaMacDolwCV.pdf'; // Nome do arquivo que será baixado

                // Adiciona o link ao DOM e clica nele para iniciar o download
                document.body.appendChild(link);
                link.click();

                // Limpeza dos recursos
                document.body.removeChild(link);
                window.URL.revokeObjectURL(link.href);
            });
    });
});

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
    if (!emailRegex.test(emailValue)) {
        giveError(email, "Please enter a valid email");
        valid = false;
    }
    //to return true if email is valid
    if (valid) {
        return true; //!!!!!personalizar janela pop-out!!!!!!
    }
};

const giveError = (field, message) => {
    let parentElement = field.parentElement;
    parentElement.classList.add("error");
    //if the error message already exists, it'll not repeat it
    let existingError = parentElement.querySelector(".err-msg")
    if (existingError) {
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

let allFields = [...inputs, ...textareas];

allFields.forEach((field) => {
    field.addEventListener("input", () => {
        removeError(field);
    });
});
const removeError = (field) => {
    let parentElement = field.parentElement;
    parentElement.classList.remove("error");
    let error = parentElement.querySelector(".err-msg");
    if (error) {
        error.remove();
    }
};

//----sticky scroll "back to top" button------

const scrollToTopButton = document.getElementById('js-top');
let scrollTimeout;
//creating a function that shows the scroll-to-top button if the user scrolls beyond the height of the initial window.
const scrollFunc = () => {
    // Get the current scroll value
    let y = window.scrollY;

    // If the scroll value is greater than the window height, let's add a class to the scroll-to-top button to show it!
    if (y > 0) {
        scrollToTopButton.classList.add("show");
        scrollToTopButton.classList.remove("hide");
    } else {
        scrollToTopButton.classList.add("hide");
        scrollToTopButton.classList.remove("show");
    }
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        scrollToTopButton.classList.add("hide");
        scrollToTopButton.classList.remove("show");
    }, 3000); // 3 segundos
};

window.addEventListener("scroll", scrollFunc);
const scrollToTop = () => {
    // Let's set a variable for the number of pixels we are from the top of the document.
    const c = document.documentElement.scrollTop || document.body.scrollTop;

    // If that number is greater than 0, we'll scroll back to 0, or the top of the document.
    // We'll also animate that scroll with requestAnimationFrame:
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        // ScrollTo takes an x and a y coordinate.
        // Increase the '10' value to get a smoother/slower scroll!
        window.scrollTo(0, c - c / 10);
    };
};
// When the button is clicked, run our ScrolltoTop function above!
scrollToTopButton.onclick = function (e) {
    e.preventDefault();
    scrollToTop();
};

//---------------Dark Mode -------------------
let darkModeIcon = document.querySelector("#darkMode-icon");

// Verificar e aplicar o tema salvo no localStorage ou a preferência do sistema
document.addEventListener('DOMContentLoaded', (event) => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === 'dark' || (savedTheme === null && prefersDarkScheme)) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        darkModeIcon.classList.add('bx-sun');
        darkModeIcon.classList.remove('bx-moon');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        darkModeIcon.classList.add('bx-moon');
        darkModeIcon.classList.remove('bx-sun');
    }
});

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle("bx-sun");
    darkModeIcon.classList.toggle("bx-moon");
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    // Salvar a preferência do usuário no localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
};





