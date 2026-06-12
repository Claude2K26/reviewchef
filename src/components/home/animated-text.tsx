"use client";

interface AnimatedTextProps {
  text: string;
  className?: string;
  /** "words" = chaque mot slide up en décalé | "wave" = chaque lettre flotte en vague */
  mode?: "words" | "wave";
  delay?: number;
}

export function AnimatedText({ text, className = "", mode = "words", delay = 0 }: AnimatedTextProps) {
  if (mode === "wave") {
    return (
      <span className={`inline ${className}`} aria-label={text}>
        {text.split("").map((char, i) => (
          <span
            key={i}
            aria-hidden
            className="inline-block"
            style={{
              animation: `textWave 2.2s ease-in-out ${delay + i * 0.07}s infinite`,
              whiteSpace: char === " " ? "pre" : undefined,
            }}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    );
  }

  // words mode — chaque mot slide-up en décalé
  const words = text.split(" ");
  return (
    <span className={`inline ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block"
          style={{ animation: `slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * 0.1}s both` }}
        >
          {word}
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
