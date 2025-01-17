//----------------Scroll Reveal --------------
ScrollReveal({
    distance: '80px',
    duration: 1000,
    delay: 100
});
ScrollReveal().reveal('.home-content, .heading, .subtitle-about', { origin: 'top' });
ScrollReveal().reveal('.home-img img,.ul-stacks,.portfolio-box,.contact-container', { origin: 'bottom' });
ScrollReveal().reveal('.about-col-1', { origin: 'left' });

/// Only one scroll will be necessary 
gsap.registerPlugin(ScrollToPlugin);
let currentSection = 0;
let isScrolling = false;
const sectionsScroll = document.querySelectorAll('section');

function scrollToSection(index) {
    if (index < 0 || index >= sectionsScroll.length) return;
    currentSection = index;
    // Animação suave para a seção alvo
    gsap.to(window, {
        scrollTo: { y: sectionsScroll[index].offsetTop, autoKill: false },
        duration: 0.1,
        ease: "power2.out",
        onComplete: () => {
            isScrolling = false;
        }
    });
}

window.addEventListener('wheel', (event) => {

    if (isScrolling) return;

    isScrolling = true;

    if (event.deltaY > 0) {
        // Scrolling down
        scrollToSection(currentSection + 1);
    } else {
        // Scrolling up
        scrollToSection(currentSection - 1);
    }
    event.preventDefault();
});
window.addEventListener('resize', () => {
    sectionsScroll.forEach((section, index) => {
        if (index === currentSection) {
            scrollToSection(index);
        }
    });
});


// -------------- Pop-out Modal ----------------------
document.addEventListener('DOMContentLoaded', () => {
    const openButtons = document.querySelectorAll('.open-modal');
    const closeButtons = document.querySelectorAll('.modal_close');
    const modalContainers = document.querySelectorAll('.modal_container');

    openButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modalId;
            const modal = document.getElementById(modalId);
            modalContainers.forEach(container => {
                container.classList.remove('active');
            });
            modal.classList.add('active');
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal_container');
            modal.classList.add('zoom-out');
            setTimeout(() => {
                modal.classList.remove('active', 'zoom-out');
              }, 500);
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

//--------------CV DOWNLOAD--------------------

var downloadButtons = document.querySelectorAll('.downloadButton');


downloadButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        
        var serverUrl = '/download-cv';

        var xhr = new XMLHttpRequest();
        xhr.open('GET', serverUrl, true);
        xhr.responseType = 'blob';
        
      
        xhr.onload = function () {
            if (xhr.status === 200) {
                var blob = new Blob([xhr.response], { type: 'application/pdf' });
                var url = window.URL.createObjectURL(blob);

                var link = document.createElement('a');
                link.href = url;
                link.download = 'ThaynaMacDolwCV.pdf'; 

                
                document.body.appendChild(link);
                link.click();

               
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }
        };
        xhr.send();
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


//Customized alert
const showAlert = (message, type) => {
    const successAlert = document.getElementById('success-alert');
    const errorAlert = document.getElementById('error-alert');

    const alert = type === 'success' ? successAlert : errorAlert;
    alert.querySelector('p').textContent = message;

    alert.classList.add('show');
    alert.classList.remove('hide');
    alert.style.display = 'block';

    setTimeout(() => {
        alert.classList.remove('show');
        alert.classList.add('hide');

        alert.addEventListener('animationend', () => {
            alert.style.display = 'none';
        }, { once: true });
    }, 4000); 
};

//Form
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    if (!validateForm(form)) return;

    const formData = {
        name: form.querySelector(".name").value,
        email: form.querySelector(".email").value,
        message: form.querySelector(".message").value
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/send-email');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        let response;
        try {
            response = JSON.parse(xhr.responseText.trim());  // Tenta parsear a resposta JSON
        } catch (e) {
            console.error('Failed to parse JSON:', e);
            showAlert('Something went wrong!', 'error');
            return;  // Se falhar, interrompe a execução
        }
    
        if (response.status === 'success') {  // Verifica a chave 'status'
            console.log('Message successfully sent!');
            showAlert('Message successfully sent!', 'success');
            form.querySelector(".name").value = '';  // Limpa os campos do formulário
            form.querySelector(".email").value = ''; 
            form.querySelector(".message").value = ''; 
        } else {
            console.log('Something went wrong!');
            showAlert('Something went wrong!', 'error');
        }
    };
    
    xhr.onerror = function () {
        console.error('Network error occurred.');
        showAlert('Network error occurred!', 'error');
    };

    xhr.send(JSON.stringify(formData));
});

const validateForm = (form) => {
    let valid = true;
    
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
    
    if (valid) {
        return true; 
    }
};

const giveError = (field, message) => {
    let parentElement = field.parentElement;
    parentElement.classList.add("error");
 
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


//Sending data to server
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    const nameField = document.querySelector('.name');
    const emailField = document.querySelector('.email');
    const messageField = document.querySelector('.message');

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validateForm(contactForm)) {
            showAlert('Please fill out all fields correctly.', 'error');
            return;
        }

        const formData = {
            name: nameField.value,
            email: emailField.value,
            message: messageField.value
        };

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/send-email');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            console.log('Response status:', xhr.status); // Adicione esta linha para depurar o status da resposta
            console.log('Response text:', xhr.responseText); // Adicione esta linha para depurar o texto da resposta
            
            try {
                const response = JSON.parse(xhr.responseText);
                console.log('Parsed response:', response); // Adicione esta linha para depurar a resposta parseada
                if (response.status === 'success') {
                    console.log('Message successfully sent!');
                    showAlert('Message successfully sent!', 'success');
                    nameField.value = '';
                    emailField.value = '';
                    messageField.value = '';
                } else {
                    console.log('Something went wrong!');
                    showAlert('Something went wrong!', 'error');
                }
            } catch (e) {
                console.error('Error parsing response:', e);
                showAlert('Unexpected error occurred!', 'error');
            }
        };
    
        xhr.onerror = function () {
            console.error('Network error occurred.');
            showAlert('Network error occurred!', 'error');
        };
        xhr.send(JSON.stringify(formData));
    });
});


//----sticky scroll "back to top" button------

const scrollToTopButton = document.getElementById('js-top');
let scrollTimeout;

const scrollFunc = () => {
    
    let y = window.scrollY;

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
    }, 3000); 
};

window.addEventListener("scroll", scrollFunc);

const scrollToTop = () => {
    // Ensure the currentSection is reset when scrolling to the top
    currentSection = 0;
    
    gsap.to(window, {
        scrollTo: { y: 0, autoKill: false },
        duration: 0,
        ease: "power2.inOut",  // Adjust the easing function for a smooth start
        onComplete: () => {
            // Ensure currentSection is correctly reset
            currentSection = 0;
        }
    });
};

scrollToTopButton.addEventListener('click', scrollToTop);


// Changing when typing in the textarea and input 

document.addEventListener('DOMContentLoaded', () => {
    const messageTextarea = document.getElementById('message');

    messageTextarea.addEventListener('input', () => {
        if (messageTextarea.value.trim() !== '') {
            messageTextarea.classList.add('typing');
        } else {
            messageTextarea.classList.remove('typing');
        }
    });
});
$(document).ready(function () {
    $('#name, #email').on('input', function () {
        if ($(this).val().length > 0) {
            $(this).addClass('filled');
        } else {
            $(this).removeClass('filled');
        }
    });
});

// HAMBURGUER MENU AND DARK MODE 
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.querySelectorAll('.navbar a');
    const darkModeIcon = document.getElementById('darkMode-icon');
    
    // Verificar o tema salvo no localStorage e aplicá-lo ao carregar a página
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    // Evento de clique no ícone de dark mode
    darkModeIcon.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // Função para ativar o modo escuro
    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        darkModeIcon.classList.add('bx-sun');
        darkModeIcon.classList.remove('bx-moon');
        localStorage.setItem('theme', 'dark');
    }

    // Função para desativar o modo escuro
    function disableDarkMode() {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        darkModeIcon.classList.add('bx-moon');
        darkModeIcon.classList.remove('bx-sun');
        localStorage.setItem('theme', 'light');
    }

    // Evento de clique no ícone de menu hamburguer
    menuIcon.addEventListener('click', function() {
        navbar.classList.toggle('show');
    });

    // Fechar o menu ao clicar em um link dentro dele
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('show');
        });
    });
});




