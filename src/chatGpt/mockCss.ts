export const mockCssResponses = [`
.interesting-class {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 50px;
  border-radius: 50% 0% 50% 0% / 0% 50% 0% 50%;
  background: #CD853F;
  overflow: hidden;
  animation: move 4s infinite ease-in-out;
}

.interesting-class::before,
.interesting-class::after {
  content: "";
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.interesting-class::before {
  background: linear-gradient(-45deg, #A0522D, #D2691E);
}

.interesting-class::after {
  background: linear-gradient(45deg, #A0522D, #D2691E);
}

@keyframes move {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateY(150px);
  }
  50% {
    transform: translateX(150px);
  }
  75% {
    transform: translateY(-150px);
  }
  100% {
    transform: translateX(0);
  }
}

`,
`Here's a sample of what your CSS code could look like:

.animate{
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 70px 80px 60px 90px;
  background: #D2691E;
  box-shadow: 0 0 5px #228B22;
  animation: move 3s ease-in-out infinite;
}

.animate::before{
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #D2691E, #B8860B);
  transform: rotate(45deg);
  animation: move 2s ease-in-out infinite alternate;
}

.animate::after{
  content: '';
  position: absolute;
  top: -10px;
  right: -10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(45deg, #D2691E, #B8860B);
  transform: rotate(-45deg);
  animation: move 2s ease-in-out infinite alternate;
}

@keyframes move {
  0%{
    transform: translate(0, 0);
  }
  25%{
    transform: translate(0, 30px);
  }
  50%{
    transform: translate(30px, 30px);
  }
  75%{
    transform: translate(30px, 0);
  }
  100%{
    transform: translate(0, 0);
  }
}

This CSS code creates an animated circle that moves in a square pattern. It has a unique curve shape with strange border-radius values. It also adds small circles on the top and bottom left and right sides using pseudo elements. It uses CSS gradients to create a nice color transition. The animation duration is set to 3 seconds using the ease-in-out timing function. The pseudo elements also have their own animation that makes them move independently using alternate iteration count. Finally, the color scheme of the circle is based on the given hex codes.`,

`Here's some crazy CSS code that will make a div class animate and move in a unique and interesting way:

\`\`\`
.move {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 50px auto;
  background: linear-gradient(45deg, #8B4513, #228B22, #8B4513);
  border-radius: 50% / 10% 90% 80% 20%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}
.move:before,
.move:after {
  content: "";
  position: absolute;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  top: 12.5%;
  left: 12.5%;
  transform: scale(0);
  animation: pulse 2s infinite;
  opacity: 0.9;
}
.move:before {
  background: rgba(139, 69, 19, 0.5);
}
.move:after {
  background: rgba(34, 139, 34, 0.5);
  animation-delay: 1s;
}
@keyframes pulse {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
.move:hover {
  transform: rotate(360deg) scale(1.1);
  transition: all 1s ease;
}
\`\`\` 

This code creates a div with a unique border radius and a gradient background. It also uses pseudo-elements to add two circles that pulse and twinkle. The div also rotates and scales on hover. This code will definitely make your webpage stand out!`,

`Here's an example of some CSS that uses crazy border radius, gradients and pseudo-elements to create an animated, moving shape.

\`\`\`css
.shape {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  background: #D2691E;
  border-radius: 50%;
  box-shadow: inset 0px 0px 12px #8B4513;
  transform: translate(-50%, -50%);
  animation: move 2s ease-in-out infinite;
}

.shape:before,
.shape:after {
  content: "";
  position: absolute;
  width: 20px;
  height: 50px;
  background: #D2691E;
  border-radius: 10px;
  margin-top: -25px;
  margin-left: -10px;
  transform: rotate(45deg);
  box-shadow: inset 0px 0px 6px #8B4513;
}

.shape:before {
  left: -30px;
  top: 50%;
  transform-origin: center top;
  animation: rotate 1.5s ease-in-out infinite;
}

.shape:after {
  right: -30px;
  top: 50%;
  transform-origin: center bottom;
  animation: rotate 1.5s ease-in-out infinite reverse;
}

@keyframes move {
  0% {
    top: 50%;
    left: 50%;
  }
  25% {
    top: 10%;
    left: 10%;
  }
  50% {
    top: 90%;
    left: 10%;
  }
  75% {
    top: 90%;
    left: 90%;
  }
  100% {
    top: 10%;
    left: 90%;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(45deg);
  }
  50% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(45deg);
  }
}
\`\`\`

This CSS creates a shape that moves around the screen, with two pseudo-elements that rotate around it. The shape uses a gradient background and a box-shadow to give it depth, and the before and after pseudo-elements use crazy border radius and rotations to create a look that is different from anything else. Finally, the keyframe animations keep everything moving and fluid.`,
`Here's some CSS for an animated and moving class that uses pseudo-elements, border-radius, and CSS gradients to create an interesting effect:

\`\`\`css
.animated-thing {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50% 20% 50% 20%;
  background: linear-gradient(to top, #B8860B, #CD853F);
  animation: move 2s infinite;
}

.animated-thing::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #B8860B;
  box-shadow: 0 0 10px 5px #B8860B;
  animation: spin 2s infinite;
}

.animated-thing::after {
  content: '';
  position: absolute;
  bottom: -10px;
  right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #B8860B;
  box-shadow: 0 0 10px 5px #B8860B;
  animation: spin 2s infinite;
}

@keyframes move {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  
  50% {
    transform: translateY(-30px) rotate(45deg);
  }
  
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
}
\`\`\`

This CSS creates a class called \`.animated-thing\` that has a circular shape with a non-uniform border radius. It uses a CSS gradient to create a smooth transition between the colors in the color scheme. The class also has pseudo-elements that create two smaller circles that spin around their centers. Finally, the class has a \`move\` animation that causes it to move up and down while rotating, giving it an interesting and unique movement style.`,
`To create an exciting and dynamic animated class, I would start by defining the basic properties of my element:

.animated-class {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #A0522D;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
}

Next, I'll add some pseudo elements to create a more complex shape:

.animated-class:before,
.animated-class:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #228B22;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
}

.animated-class:before {
  transform: translate(-50%, -50%) rotate(45deg) skew(10deg, 10deg);
}

.animated-class:after {
  transform: translate(-50%, -50%) rotate(-45deg) skew(-10deg, -10deg);
}

Now, let's add some gradients for a more vibrant effect:

.animated-class {
  background: linear-gradient(to bottom left, #A0522D, #B8860B);
}

.animated-class:before {
  background: linear-gradient(to bottom right, #228B22, #B8860B);
}

.animated-class:after {
  background: linear-gradient(to bottom left, #228B22, #A0522D);
}

Lastly, let's add the animation that will really make this class stand out:

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animated-class:before,
.animated-class:after {
  animation: pulse 2s linear infinite alternate;
}

With this code, our animated class will have a unique and eye-catching shape with gradients and dynamic animation.`,
`Here is an example of CSS animation and movement for a unique shape using the given color scheme:

\`\`\`css
.my-class {
  position: relative;
  width: 100px;
  height: 100px;
  background-color: #228B22;
  border-radius: 50% / 20%;

  animation: move 2s ease-in-out infinite alternate;

  &:before {
    content: '';
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    background: linear-gradient(to right, #228B22, #8B4513);
    border-radius: 50% / 40%;
    opacity: 0.5;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -10%;
    right: -10%;
    width: 120%;
    height: 120%;
    background: linear-gradient(to left, #A0522D, #8B4513);
    border-radius: 50% / 60%;
    opacity: 0.5;
  }
}

@keyframes move {
  from {
    transform: translateX(0) rotate(0deg);
  }
  to {
    transform: translateX(100px) rotate(360deg);
  }
}
\`\`\`

This CSS creates a circular shape with a unique border radius, adds pseudo elements with gradients for an interesting effect, and uses an animation to move the shape across the screen while rotating. The color scheme is used in the gradients and background color to tie everything together.`,
``
];