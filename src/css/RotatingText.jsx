"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

// Utility function to join class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts = ["Hello"], // 🔹 Default value to avoid undefined error
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-120%", opacity: 0 },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = "first",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;

  // 🔹 Ensure texts is a valid array
  const safeTexts = Array.isArray(texts) && texts.length > 0 ? texts : ["Hello"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Function to split text into characters safely
  const splitIntoCharacters = (text) => {
    if (!text) return []; // 🔹 Prevents undefined error

    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    return Array.from(text);
  };

  // 🔹 Handle undefined or empty texts
  const elements = useMemo(() => {
    const currentText = safeTexts?.[currentTextIndex] ?? ""; // Ensure it's never undefined

    if (!currentText) return []; // 🔹 Prevents `.split()` on undefined

    if (splitBy === "characters") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }
    if (splitBy === "words") {
      return currentText.split(" ").map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }
    if (splitBy === "lines") {
      return currentText.split("\n").map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1,
      }));
    }
    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }));
  }, [safeTexts, currentTextIndex, splitBy]);

  // 🔹 Fix stagger timing for animations
  const getStaggerDelay = useCallback(
    (index, totalChars) => {
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (totalChars - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(totalChars / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "random") {
        return Math.floor(Math.random() * totalChars) * staggerDuration;
      }
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  // 🔹 Ensure currentTextIndex is valid
  useEffect(() => {
    if (currentTextIndex >= safeTexts.length) {
      setCurrentTextIndex(0);
    }
  }, [currentTextIndex, safeTexts.length]);

  // Functions for rotating text
  const next = useCallback(() => {
    setCurrentTextIndex((prevIndex) =>
      prevIndex === safeTexts.length - 1 ? (loop ? 0 : prevIndex) : prevIndex + 1
    );
  }, [safeTexts.length, loop]);

  const previous = useCallback(() => {
    setCurrentTextIndex((prevIndex) =>
      prevIndex === 0 ? (loop ? safeTexts.length - 1 : prevIndex) : prevIndex - 1
    );
  }, [safeTexts.length, loop]);

  const jumpTo = useCallback((index) => {
    setCurrentTextIndex(Math.max(0, Math.min(index, safeTexts.length - 1)));
  }, [safeTexts.length]);

  const reset = useCallback(() => setCurrentTextIndex(0), []);

  // Expose functions via ref
  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset]);

  // 🔹 Auto-rotate text
  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  return (
    <motion.span className={cn("flex flex-wrap whitespace-pre-wrap relative", mainClassName)} {...rest} layout transition={transition}>
      {/* Screen-reader only text */}
      <span className="sr-only">{safeTexts[currentTextIndex]}</span>

      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.div
          key={currentTextIndex}
          className={cn(splitBy === "lines" ? "flex flex-col w-full" : "flex flex-wrap whitespace-pre-wrap relative")}
          layout
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array.slice(0, wordIndex).reduce((sum, word) => sum + word.characters.length, 0);
            return (
              <span key={wordIndex} className={cn("inline-flex", splitLevelClassName)}>
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                      ...transition,
                      delay: getStaggerDelay(previousCharsCount + charIndex, array.reduce((sum, word) => sum + word.characters.length, 0)),
                    }}
                    className={cn("inline-block", elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
              </span>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </motion.span>
  );
});

RotatingText.displayName = "RotatingText";
export default RotatingText;
