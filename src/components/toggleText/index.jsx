import styles from './styles.module.css';
import React, { useRef, useEffect, useState } from 'react';

function ToggleText() {
  const textRef = useRef(null);
  const [opacityText, setOpacityText] = useState(1);
  const [text, setText] = useState('');
  const [animationTime, setAnimationTime] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const changeOpacity = () => {
      const duration = animationTime * 1000;
      let nextOp = null;
      setOpacityText((prev) => {
        const opacity = isVisible
          ? Math.min(1, prev + 50 / duration)
          : Math.max(0, prev - 50 / duration);
        console.log(prev);
        nextOp = opacity;
        return opacity;
      });
      return nextOp;
    };

    if (animationTime > 0) {
      const interval = setInterval(() => {
        const nextOp = changeOpacity();
        if (nextOp === 0 || nextOp === 1) clearInterval(interval);
      }, 50);
      return () => {
        clearInterval(interval);
      };
    }
  }, [animationTime, isVisible]);

  useEffect(() => {
    const handelHideText = () => {
      if (textRef.current) {
        textRef.current.style.opacity = opacityText;
      }
    };
    handelHideText();
  }, [opacityText]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.inputBtnContainer}>
        <div className={styles.inputContainer}>
          <span>Скрыть текст за: </span>
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            type="text"
            name="input"
            id="input_text"
            placeholder="Введите время в секундах"
          />
        </div>
        <button
          onClick={() => {
            setAnimationTime(Number(text));
            setIsVisible(!isVisible);
          }}>
          Скрыть/Показать текст
        </button>
      </div>
      <p ref={textRef}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, esse?</p>
    </div>
  );
}
export default ToggleText;
