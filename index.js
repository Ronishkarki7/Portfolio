document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.getElementById('primary-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        mainNav.addEventListener('click', (event) => {
            if (event.target.matches('a') && mainNav.classList.contains('is-open')) {
                mainNav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // get signup button
    const signupBtn = document.getElementById("signupBtn");
    signupBtn.addEventListener("click", () => {
      // alert("Button clicked!");
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })});
    

    var audio = document.getElementById("myaudio");

      function playPauseAudio() {
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
      }

});