import { Button } from "@formbricks/ui/Button";

declare global {
  interface Window {
    formbricks: any;
  }
}

export const FeedbackButton: React.FC = () => {
  return <Button variant="secondary">Open Feedback</Button>;
};

export default FeedbackButton;
