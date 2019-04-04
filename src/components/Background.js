import React from "react";
import Particles from "react-particles-js";
import "../styles/particles.css";

const particlesParams = {
  particles: {
    number: {
      value: 300,
      density: {
        enable: true,
        value_area: 1500
      }
    },
    line_linked: {
      enable: true,
      opacity: 0.05
    },
    move: {
      direction: "right",
      speed: 0.07
    },
    size: {
      value: 1
    },
    opacity: {
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.05
      }
    }
  },
  interactivity: {
    events: {
      onclick: {
        enable: true,
        mode: "push"
      }
    },
    modes: {
      push: {
        particles_nb: 1
      }
    }
  },
  retina_detect: true
};

const Background = () => {
  return <Particles params={particlesParams} canvasClassName="particles" />;
};

export default Background;
