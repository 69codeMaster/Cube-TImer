import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

export default function CustomConfetti() {
  const { width, height } = useWindowSize();

  return (
    <Confetti
      numberOfPieces={200}
      gravity={0.05}
      width={width}
      height={height}
      recycle={false}
      tweenDuration={2000}
    />
  );
}
