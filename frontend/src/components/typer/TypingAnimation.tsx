import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Chat With Your Own AI',
        1000,
        'Built with OpenAI',
        2000,
        'Your Own Customized ChatGPT',
        1500
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: "50px", color: "white", display: 'inline-block', textShadow: "1px 1px 20px #000" }}
      repeat={Infinity}
    />
  );
};
export default TypingAnimation;