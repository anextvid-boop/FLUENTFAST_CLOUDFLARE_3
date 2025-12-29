
import React, { useState, useEffect, useRef } from 'react';

interface AutoFitTextProps {
  text: string;
  minSize: number;
  color?: string;
  weight?: string;
  underline?: boolean;
}

const AutoFitText: React.FC<AutoFitTextProps> = ({ 
  text, 
  minSize, 
  color = 'currentColor', 
  weight = 'normal',
  underline = false 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(60); // Start large and shrink

  useEffect(() => {
    const resizeText = () => {
      const container = containerRef.current;
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      let currentFontSize = 120; // Max starting font size
      container.style.fontSize = `${currentFontSize}px`;

      while (
        (container.scrollHeight > height || container.scrollWidth > width) && 
        currentFontSize > minSize
      ) {
        currentFontSize -= 1;
        container.style.fontSize = `${currentFontSize}px`;
      }
      
      setFontSize(currentFontSize);
    };

    resizeText();
    window.addEventListener('resize', resizeText);
    return () => window.removeEventListener('resize', resizeText);
  }, [text, minSize]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-center justify-center text-center overflow-hidden leading-tight p-2 break-words"
      style={{ 
        fontSize: `${fontSize}px`, 
        color, 
        fontWeight: weight,
        textDecoration: underline ? 'underline' : 'none'
      }}
    >
      {text}
    </div>
  );
};

export default AutoFitText;
