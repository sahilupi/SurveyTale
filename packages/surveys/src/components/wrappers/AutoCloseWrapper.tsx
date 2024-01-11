import { useEffect, useRef, useState } from "preact/hooks";

import { TSurvey } from "@formbricks/types/surveys";

import Progress from "../general/Progress";

interface AutoCloseProps {
  survey: TSurvey;
  onClose: () => void;
  children: any;
}

export function AutoCloseWrapper({ survey, onClose, children }: AutoCloseProps) {
  const [countdownProgress, setCountdownProgress] = useState(100);
  const [countdownStop, setCountdownStop] = useState(false);
  const startRef = useRef(performance.now());
  const frameRef = useRef<number | null>(null);

  const handleStopCountdown = () => {
    if (frameRef.current !== null) {
      setCountdownStop(true);
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  };

  useEffect(() => {
    if (!survey.autoClose) return;

    const updateCountdown = () => {
      const timeout = survey.autoClose! * 1000;
      const elapsed = performance.now() - startRef.current;
      const remaining = Math.max(0, timeout - elapsed);

      setCountdownProgress(remaining / timeout);

      if (remaining > 0) {
        frameRef.current = requestAnimationFrame(updateCountdown);
      } else {
        handleStopCountdown();
        onClose();
      }
    };

    setCountdownProgress(1);
    frameRef.current = requestAnimationFrame(updateCountdown);

    return () => handleStopCountdown();
  }, [survey.autoClose, onClose]);

  return (
    <>
      {!countdownStop && survey.autoClose && <Progress progress={countdownProgress} />}
      <div onClick={handleStopCountdown} onMouseOver={handleStopCountdown} className="h-full w-full">
        {children}
      </div>
    </>
  );
}
