"use client";
import { useState, useEffect, useRef } from "react";

function Home() {
  const [count, setCount] = useState(0);
  const [isPoping, setIsPoping] = useState(false);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [comboAnimation, setComboAnimation] = useState(false);

  const comboTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("popcat-count");
    if (saved) setCount(parseInt(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("popcat-count", String(count));
  }, [count]);

  const pop = () => {
    setCount((c) => c + 1);
    setCombo((c) => c + 1);

    setShowCombo(true);
    setComboAnimation(true);

    setTimeout(() => {
      setComboAnimation(false);
    }, 300);

    setIsPoping(true);
    setTimeout(() => {
      setIsPoping(false);
    }, 100);

    if (comboTimeout.current) clearTimeout(comboTimeout.current);

    comboTimeout.current = setTimeout(() => {
      setCombo(0);
      setShowCombo(false);
    }, 1000);
  };

  useEffect(() => {
    const handlekey = (e: KeyboardEvent) => {
      e.preventDefault();
      pop();
    };

    window.addEventListener("keydown", handlekey);
    return () => window.removeEventListener("keydown", handlekey);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-pink-300">
      <img
        src="cat.png"
        onClick={pop}
        className={`w-100 h-100 cursor-pointer transition-transform duration-100 ${
          isPoping ? "scale-90" : "scale-100"
        }`}
        alt="cat"
      />
      <p className="mt-34 font-bold text-4xl text-white">{count}</p>

      {showCombo && (
        <div
          className={
            `absolute top-20 text-5xl font-extrabold text-white pointer-events-none transition-all duration-300` +
            (comboAnimation
              ? "opacity-100 scale-125 rotate-6"
              : "opacity-0 scale-75 -rotate-6")
          }
        >
          {combo} combo!!
        </div>
      )}
    </div>
  );
}

export default Home;
