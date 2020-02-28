import React, { useRef, useEffect } from 'react';
import background from './1.jpg';
import fox from './2.png';
import './App.css';

function App() {
  let y = 0;
  let jumpingStarted = false;
  let jumpingEnded = true;
  const keydown = (e) => {
    if (e.keyCode === 32 && jumpingEnded) {
      jumpingStarted = true;
      jumpingEnded = false;
    }
  }
  let score = 0;
  
  useEffect(() => {
    document.addEventListener('keydown', keydown);
    const c = canvasRef.current;
    c.height = 510;
    c.width = c.offsetWidth;
    const ctx = c.getContext('2d');
    const velocity = 5;
    let x1 = 0;
    let x2 = c.width;
    const acc = 0.5;
    let foxl = false;
    let bl = false;
    let count = 0;
    const image = new Image();
    image.src = background;
    image.onload = function() {   
      bl = true; 
      draw();
    }
    const image2 = new Image();
    image2.src = fox;
    image2.onload = function() {
      foxl = true;    
      draw();
    }
    ctx.font = "30px Arial";
    let frame = 0;
    const delta = 70;
    let slowly = 0;
    const slowLimit = 4;
    function draw() {
      if (!( foxl && bl )) {
        return;
      }
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.drawImage(image, x1, 0, c.width, c.height);
      ctx.drawImage(image, x2, 0, c.width, c.height);
      if (Math.abs(x1) > c.width) {
        x1 = c.width - velocity;
      }
      //8 d 70
      // 10, 0 , 50, 70
      // 80 
      const deltax = 10 + frame * delta; 
      ctx.drawImage(image2, deltax, 0, 50, 70, 50, 410 + y, 50, 50);
      if (!jumpingStarted) {
          if (!slowly) {
            frame = frame === 7 ? 0 : (frame + 1);
          }          
          slowly = slowly < slowLimit ? slowly + 1 : 0;

      }

      ctx.fillText(`score: ${score++}` , 10, 30);
      x1 -= velocity;

      if (Math.abs(x2) > c.width) {
        x2 = c.width - velocity;
      }

      x2 -= velocity;

      if (jumpingStarted) {
        const delta = 15 - acc * count;        
        y -= delta;
        count++;
        if (y > 0) {
          y = 0;
          count = 0;
          jumpingStarted = false;
          jumpingEnded = true;
        }
      }
      
      requestAnimationFrame(draw)
    }
  }, [keydown, y])

  const canvasRef = useRef(null);
  return (
    <div className="App">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default App;
