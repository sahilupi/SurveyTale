import { Modal } from "@formbricks/ui/Modal";
import { ResponsiveVideo } from "@formbricks/ui/ResponsiveVideo";

interface VideoWalkThroughProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export const VideoWalkThrough: React.FC<VideoWalkThroughProps> = ({ open, setOpen }) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="mt-5">
        <ResponsiveVideo src="/videos/walkthrough-v1.mp4" />
      </div>
    </Modal>
  );
};
