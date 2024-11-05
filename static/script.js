document.addEventListener("DOMContentLoaded", function () {
  // Function to initialize particles with the default color based on theme
  function initParticles() {
    const isDarkMode = document.documentElement.classList.contains("dark");
    const particleColor = isDarkMode ? "#ffffff" : "#000000"; // White for dark, black for light

    particlesJS("particles-js", {
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: particleColor,
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: particleColor,
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }

  // Initial particle setup
  initParticles();

  // Function to refresh particles based on the current theme
  function refreshParticles() {
    const isDarkMode = document.documentElement.classList.contains("dark");
    const newColor = isDarkMode ? "#ffffff" : "#000000"; // Update color based on theme

    // Use pJSDom to modify particles color and refresh them
    if (window.pJSDom && window.pJSDom.length > 0) {
      window.pJSDom[0].pJS.particles.color.value = newColor;
      window.pJSDom[0].pJS.particles.line_linked.color = newColor;
      window.pJSDom[0].pJS.fn.particlesRefresh();
    }
  }

  // Event listener for theme toggle button
  const themeToggleButton = document.querySelector(".btn-dark");
  themeToggleButton.addEventListener("click", function () {
    // Toggle dark mode class on the html element
    document.documentElement.classList.toggle("dark");
    
    // Refresh particles to update colors
    refreshParticles();
  });
});
