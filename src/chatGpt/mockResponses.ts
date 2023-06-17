export const mockResponses = [
  `Here's some CSS code for an animated and moving abstract shape using keyframes, pseudo elements, border radius and CSS gradients:


  .shape {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    border-radius: 50% 20% 50% 50%;
    background: linear-gradient(135deg, #FFB347, #87CEEB, #FFB7B2);
  }
  
  .shape:before {
    content: "";
    position: absolute;
    top: -60px;
    left: -60px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(45deg, #FFB7B2, #87CEEB, #FFB347);
    animation: bounce 2s ease-in-out infinite alternate;
  }
  
  @keyframes bounce {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(0, 20px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  
  .shape:after {
    content: "";
    position: absolute;
    top: calc(100% + 60px);
    left: calc(50% - 60px);
    width: 120px;
    height: 120px;
    border-radius: 20% 50% 50% 50%;
    background: linear-gradient(-45deg, #FFB7B2, #FFB347, #87CEEB);
    animation: spin 4s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  
  This code creates a large abstract shape with a gradient background using the color scheme provided. The before pseudo element is a smaller circular shape that bounces up and down using the keyframes animation. The after pseudo element is a different shape that spins continuously using the keyframes animation. 
  
  The border-radius values on the main shape and the after pseudo element are non-symmetrical to create unusual shapes and add to the abstract feel of the animation. 
  
  Feel free to adjust the values to create a different look, or combine this code with other animations and elements to create something truly unique!`,
  `Here's some CSS for a unique and colorful animation that uses keyframes and pseudo elements. The animation features a colorful, gradient-filled shape that spins and moves across the screen:


  .move-shape {
    position: relative;
    animation: moveShape 5s ease infinite;
  }
  
  .move-shape::before {
    content: "";
    position: absolute;
    top: -30px;
    left: -30px;
    height: 100px;
    width: 100px;
    background: linear-gradient(to bottom right, #FFB347, #FFB7B2);
    border-radius: 60% 70% 50% 40%;
    transform: rotate(45deg);
    z-index: -1;
    filter: blur(20px);
    opacity: 0.5;
  }
  
  .move-shape::after {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    height: 80px;
    width: 80px;
    background: linear-gradient(to bottom right, #FFB347, #FFB7B2);
    border-radius: 50% 70% 60% 40%;
    transform: rotate(-45deg);
    z-index: -2;
    filter: blur(10px);
    opacity: 0.5;
  }
  
  @keyframes moveShape {
    0% {
      transform: translate(-100px, -100px) rotate(0deg);
    }
    25% {
      transform: translate(200px, -100px) rotate(180deg);
    }
    50% {
      transform: translate(200px, 200px) rotate(360deg);
    }
    75% {
      transform: translate(-100px, 200px) rotate(540deg);
    }
    100% {
      transform: translate(-100px, -100px) rotate(720deg);
    }
  }
  
  
  This code creates a .move-shape element that has two pseudo elements, ::before and ::after. These elements are positioned using position: absolute and have unique shapes and gradient backgrounds. The main moveShape keyframe animation moves the entire element diagonally across the screen while rotating it several times. The result is a unique and eye-catching animation that combines shape, color, and movement.`,
  `Here's an example of CSS for an animated and moving spiral:


  body {
    background: #FFB347;
  }
  
  .spiral {
    position: relative;
    width: 50px;
    height: 50px;
    margin: 50px auto;
    transform: rotate(0deg);
  }
  
  .spiral:before,
  .spiral:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    border-radius: 50% 0 0 50%;
    background: linear-gradient(to bottom right, #ADD8E6, #ADD8E6 45%, #FFB347);
    transform-origin: 100% 100%;
    animation: spin-right 6s linear infinite;
  }
  
  .spiral:after {
    border-radius: 0 50% 50% 0;
    transform-origin: 0 0;
    animation: spin-left 6s linear infinite;
  }
  
  @keyframes spin-right {
      0% {
          transform: rotate(0deg) scale(1);
      }
      100% {
          transform: rotate(360deg) scale(0.5);
      }
  }
  
  @keyframes spin-left {
      0% {
          transform: rotate(0deg) scale(0.5);
      }
      100% {
          transform: rotate(-360deg) scale(1);
      }
  }
  
  
  This code creates a spiral with two pseudo-elements, one rotating clockwise and the other rotating counterclockwise. The spiral uses a gradient that goes from one shade of #ADD8E6 to the lighter #FFB347, making it look like it's lighting up as it spins. The spiral also decreases and increases in size as it spins, making it more interesting to look at. The background is set to the darker shade of #ADD8E6 to create some contrast.`,
  `Here is some CSS that creates a flower that animates and moves using keyframes:

  css
  .flower {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 50px auto;
    background: linear-gradient(45deg, #FFB7B2, #FFB347, #FFB7B2);
    animation: flower 4s infinite;
  }
  
  .flower:before, .flower:after {
    content: "";
    position: absolute;
    width: 50px;
    height: 50px;
    top: 15px;
    left: 15px;
    background: linear-gradient(to bottom, #FFB347, #FFB7B2);
    border-radius: 50%;
  }
  
  .flower:before {
    transform: translate(0px,-30px);
  }
  
  .flower:after {
    transform: translate(30px,0px);
  }
  
  @keyframes flower {
    0% {
      transform: rotate(0deg) translateX(0px) translateY(0px);
    }
    50% {
      transform: rotate(180deg) translateX(50px) translateY(50px);
    }
    100% {
      transform: rotate(360deg) translateX(0px) translateY(0px);
    }
  }
  
  
  This flower has three parts: the center and two petals created using pseudo elements. The center is a simple circle created with CSS gradients. The petals are created using border radius and two circles positioned using absolute positioning.
  
  The flower moves and animates using a keyframe animation called "flower". This animation rotates the flower 360 degrees and moves it 50 pixels to the right and down. It repeats infinitely using the "infinite" keyword.
  
  The color scheme used is #FFB7B2 (a pale pink), #FFB347 (a bright orange), and #FFB7B2 again.`,
  `Here's a CSS animation that uses keyframes, pseudo elements, bizarre border radius, and CSS gradients to create a unique and intriguing animation:

  css
  /* Define initial styles */
  .animation {
    position: relative;
    width: 200px;
    height: 200px;
    background-color: #FFB347;
    border-radius: 50%;
  }
  
  .animation::before,
  .animation::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .animation::before {
    background: radial-gradient(circle at 60% -30%, #ADD8E6, #FFB7B2);
    border-radius: 60% 30% 30% 60% / 70% 50% 50% 70%;
    z-index: -1;
  }
  
  .animation::after {
    background: radial-gradient(circle at 40% 130%, #ADD8E6, #FFB7B2);
    border-radius: 30% 60% 60% 30% / 50% 70% 70% 50%;
    z-index: -2;
  }
  
  /* Define animation */
  @keyframes move {
    0% {
      transform: translateY(0) rotate(0);
    }
    50% {
      transform: translateY(100px) rotate(180deg);
    }
    100% {
      transform: translateY(0) rotate(360deg);
    }
  }
  
  /* Apply animation to .animation element */
  .animation {
    animation: move 3s ease-in-out infinite;
  }
  
  
  This code creates an element that is a yellow circle with a pink and blue gradient border in two pseudo elements. The animation makes the circle move up and down while it rotates, creating a hypnotic effect. The gradient in the border also moves in opposite directions, adding to the overall surrealism of the animation. The color scheme is used in the gradients, creating an eye-catching and vibrant animation.`,
  `Here's some crazy code for a moving and animating shape with pseudo elements, border radius, and CSS gradients:


  <html>
    <head>
      <title>Animating Shape with Keyframes</title>
      <style>
        @keyframes moveShape {
          0% { transform: translateX(0); }
          50% { transform: translateX(50vw); }
          100% { transform: translateX(0); }
        }
  
        .shape {
          position: relative;
          display: inline-block;
          width: 200px;
          height: 200px;
          background: #ADD8E6;
          border-radius: 50% 0 50% 50%;
          transform-origin: center right;
          animation: moveShape 3s ease-in-out infinite;
        }
  
        .shape:before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(#ADD8E6, #B19CD9);
          opacity: 0.8;
          border-radius: 50% 0 50% 50%;
        }
  
        .shape:after {
          content: '';
          position: absolute;
          inset: 30px;
          background: linear-gradient(#B19CD9, #FF9AA2);
          opacity: 0.8;
          border-radius: 0 50% 50% 50%;
        }
      </style>
    </head>
    <body>
      <div class="shape"></div>
    </body>
  </html>
  
  
  This code creates a unique and animated shape with a gradient fill by combining pseudo elements and border radius. The shape moves horizontally using keyframes and transforms, while the pseudo elements create a distinctive gradient border around the shape. The color scheme uses a mix of light blue, purple, and salmon pink tones that complement each other nicely.`,
  `Sorry, as a language model AI, I do not have the ability to generate visuals or code. However, I can provide an example of how keyframes can be used in CSS to animate an object:


  .box {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: #FFB347;
    border-radius: 50%;
    animation: move 2s ease-in-out infinite alternate;
  }
  
  @keyframes move {
    from {
      transform: translate(0);
    }
    to {
      transform: translate(100px, 50px);
    }
  }
  
  
  In this example, a box with a circular border radius is animated using keyframes. The box moves from its initial position to a new position using the translate property. The animation lasts for 2 seconds and repeats infinitely using the infinite keyword. The animation also alternates between the from and to positions using the alternate keyword.
  
  To make it more interesting, pseudo-elements could be added for additional effects such as a shadow or reflection. CSS gradients could be used to add color variations to the box and the border-radius property could be manipulated further to create unique shapes.`,
  `Here's an example of using keyframes, pseudo elements, strange border-radius, and gradients to create a unique animated shape:


  .shape {
    position: relative;
    width: 150px;
    height: 150px;
    background-color: #FF9AA2;
    border-radius: 50% 0 50% 50%;
    transition: all 0.5s ease-in-out;
  }
  
  .shape::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 150px;
    background: linear-gradient(to bottom right, #FFB7B2, #FF9AA2);
    border-radius: 0 50% 50% 50%;
    animation: move 2s linear forwards;
  }
  
  .shape::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 150px;
    background: linear-gradient(to bottom left, #FFB7B2, #FF9AA2);
    border-radius: 50% 50% 50% 0;
    animation: move 2s linear forwards;
  }
  
  @keyframes move {
    0% {
      transform: translateX(-150%);
    }
    100% {
      transform: translateX(150%);
    }
  }
  
  
  
  This code creates a shape that is half circle on the left side and a quarter of a circle on the right side. It also uses two pseudo elements to create the gradient effect. The animation moves the shape to the right and reveals the gradient effect. The color scheme is used in the gradients.`,
  `I'm sorry, as an AI language model, I don't have the capability to generate visual content such as CSS animations. However, I can give you a general idea of what the code could look like:

  /* Define keyframes for the animation */
  @keyframes myAnimation {
    0% {
      /* Define the starting position and styling */
      transform: translateX(0);
      background: linear-gradient(to bottom right, #87CEEB, #fff);
      border-radius: 50% 0 0 0;
    }
    50% {
      /* Define the mid-point position and styling */
      transform: translateY(-200px);
      background: linear-gradient(to top left, #fff, #87CEEB);
      border-radius: 0 50% 0 0;
    }
    100% {
      /* Define the end position and styling */
      transform: translateX(800px) rotate(360deg);
      background: linear-gradient(to top right, #fff, #87CEEB);
      border-radius: 0 0 50% 0;
    }
  }
  
  /* Apply the animation to a pseudo element */
  .my-element::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    transform: translate(-50%, -50%);
    animation: myAnimation 5s ease-in-out infinite;
    background: #87CEEB;
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
  
  
  This code defines an animation that moves a circular pseudo element across the screen while changing its background color, border radius, and gradient direction. It uses the color scheme you provided as well. You could customize this code further to create a truly unique and interesting animation.`
]