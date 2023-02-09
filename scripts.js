//tittle animations
window.sr = ScrollReveal({reset: true});

sr.reveal('.title1', { duration: 1500 });
sr.reveal('.title2', { duration: 1500 });
sr.reveal('.title3', { duration: 1500 });
sr.reveal('.title4', { duration: 1500 });

// Projects Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }

    });
});

const hiddenElements = document.querySelectorAll('.portfolio');
hiddenElements.forEach((el) => observer.observe(el));
