import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";

export default function CustomConfetti() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowConfetti(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {showConfetti && (
        <Confetti
          numberOfPieces={200}
          width={width}
          height={height}
          recycle={false}
        />
      )}
    </div>
  );
}
