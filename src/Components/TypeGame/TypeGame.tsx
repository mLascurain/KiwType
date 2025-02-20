import React, { useState, useEffect, useRef } from "react";
import styles from "./TypeGame.module.css";

const words: string[] = [
  "apple",
  "banana",
  "cherry",
  "dog",
  "elephant",
  "flower",
  "galaxy",
  "horizon",
  "island",
  "journey",
  "kite",
  "lemon",
  "mountain",
  "notebook",
  "ocean",
  "puzzle",
  "queen",
  "river",
  "sunflower",
  "tree",
  "universe",
  "valley",
  "waterfall",
  "xylophone",
  "yellow",
  "zebra",
  "adventure",
  "brave",
  "courage",
  "delight",
  "energy",
  "freedom",
  "grace",
  "harmony",
  "inspire",
  "joy",
  "kindness",
  "laughter",
  "marvel",
  "noble",
  "optimism",
  "passion",
  "radiant",
  "serene",
  "thrill",
  "unique",
  "victory",
  "wonder",
  "extreme",
  "youthful",
  "zealous",
  "ambition",
  "blossom",
  "creativity",
  "dream",
  "embrace",
  "flourish",
  "glimmer",
  "hope",
  "illuminate",
  "kindle",
  "liberty",
  "miracle",
  "nature",
  "oasis",
  "promise",
  "resilient",
  "spark",
  "tranquil",
  "unity",
  "vibrant",
  "wisdom",
  "xenial",
  "youth",
  "zenith",
  "agile",
  "bold",
  "curious",
  "dynamic",
  "elegant",
  "fierce",
  "genuine",
  "humble",
  "ingenious",
  "joyful",
  "keen",
  "lively",
  "mysterious",
  "outstanding",
  "powerful",
  "quirky",
  "reliable",
  "sincere",
  "tenacious",
  "unyielding",
  "versatile",
  "witty",
  "extraordinary",
  "yonder",
  "zestful",
  "cascade",
  "dazzle",
  "epiphany",
  "fascinate",
  "galvanize",
  "honor",
  "imagine",
  "jubilant",
  "knowledge",
  "luminescent",
  "momentum",
];

const INITIAL_TIME = 30;

const Game: React.FC = () => {
  const [jugando, setJugando] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [gameWords, setGameWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [typedWords, setTypedWords] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const iniciarJuego = () => {
    setJugando(true);
  };

  const pararJuego = () => {
    setJugando(false);
  };

  const generarPalabras = () => {
    const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, 50);
    setCurrentIndex(0);
    setTypedWords([]);
    return shuffled;
  };

  useEffect(() => {
    if (!jugando) {
      setGameWords(generarPalabras());
      setTimeLeft(INITIAL_TIME);
      setInputValue("");
    }
  }, [jugando]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (jugando && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setJugando(false);
    }
    return () => clearInterval(interval);
  }, [jugando, timeLeft]);

  useEffect(() => {
    if (jugando && inputRef.current) {
      inputRef.current.focus();
    }
  }, [jugando]);

  useEffect(() => {
    inputRef.current?.focus();
  });

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.location.reload();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!jugando) setJugando(true);
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmedInput = inputValue.trim();

    if (e.key === " ") {
      if (!jugando) setJugando(true);
      e.preventDefault();
      setTypedWords((prev) => [...prev, trimmedInput]);
      setCurrentIndex((prev) => prev + 1);
      setInputValue("");
    } else {
      setInputValue(trimmedInput);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>KiwType</h1>
      </header>
      <p className={styles.timer}>Tiempo restante: {timeLeft} s</p>
      <p className={styles.comment}>Hold Esc to cancel...</p>
      <input
        type="text"
        ref={inputRef}
        className={styles.hiddenInput}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.words}>
        {gameWords.map((word, index) => {
          if (index < currentIndex) {
            const typed = typedWords[index] || "";
            const letters = word.split("");
            return (
              <div key={index} className={styles.word}>
                {letters.map((letter, i) => {
                  const letterClass =
                    i < typed.length
                      ? typed[i] === letter
                        ? styles.correctLetter
                        : styles.incorrectLetter
                      : styles.missingLetter;
                  return (
                    <span key={i} className={letterClass}>
                      {letter}
                    </span>
                  );
                })}
              </div>
            );
          } else if (index === currentIndex) {
            const letters = word.split("");
            return (
              <div
                key={index}
                className={`${styles.word} ${styles.activeWord}`}
              >
                {letters.map((letter, i) => {
                  const letterClass =
                    i < inputValue.length
                      ? inputValue[i] === letter
                        ? styles.correctLetter
                        : styles.incorrectLetter
                      : "";
                  // : i >= inputValue.length
                  //   ? styles.activeWord
                  //   : "";
                  return (
                    <span key={i} className={letterClass}>
                      {letter}
                    </span>
                  );
                })}
              </div>
            );
          } else {
            return (
              <div key={index} className={styles.word}>
                {word}
              </div>
            );
          }
        })}
      </div>
      {!jugando && (
        <button onClick={iniciarJuego} className={styles.button}>
          Empezar juego
        </button>
      )}
      {jugando && (
        <button onClick={pararJuego} className={styles.button}>
          Reiniciar juego
        </button>
      )}
    </div>
  );
};

export default Game;
