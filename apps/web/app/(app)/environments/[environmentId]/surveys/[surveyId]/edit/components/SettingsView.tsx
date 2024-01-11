import { TActionClass } from "@formbricks/types/actionClasses";
import { TAttributeClass } from "@formbricks/types/attributeClasses";
import { TEnvironment } from "@formbricks/types/environment";
import { TMembershipRole } from "@formbricks/types/memberships";
import { TSurvey } from "@formbricks/types/surveys";

import HowToSendCard from "./HowToSendCard";
import RecontactOptionsCard from "./RecontactOptionsCard";
import ResponseOptionsCard from "./ResponseOptionsCard";
import StylingCard from "./StylingCard";
import WhenToSendCard from "./WhenToSendCard";
import WhoToSendCard from "./WhoToSendCard";

interface SettingsViewProps {
  environment: TEnvironment;
  localSurvey: TSurvey;
  setLocalSurvey: (survey: TSurvey) => void;
  actionClasses: TActionClass[];
  attributeClasses: TAttributeClass[];
  responseCount: number;
  membershipRole?: TMembershipRole;
  colours: string[];
}

export default function SettingsView({
  environment,
  localSurvey,
  setLocalSurvey,
  actionClasses,
  attributeClasses,
  responseCount,
  membershipRole,
  colours,
}: SettingsViewProps) {
  return (
    <div className="mt-12 space-y-3 p-5">
      <HowToSendCard localSurvey={localSurvey} setLocalSurvey={setLocalSurvey} environment={environment} />

      <WhoToSendCard
        localSurvey={localSurvey}
        setLocalSurvey={setLocalSurvey}
        environmentId={environment.id}
        attributeClasses={attributeClasses}
      />

      <WhenToSendCard
        localSurvey={localSurvey}
        setLocalSurvey={setLocalSurvey}
        environmentId={environment.id}
        actionClasses={actionClasses}
        membershipRole={membershipRole}
      />

      <ResponseOptionsCard
        localSurvey={localSurvey}
        setLocalSurvey={setLocalSurvey}
        responseCount={responseCount}
      />

      <RecontactOptionsCard
        localSurvey={localSurvey}
        setLocalSurvey={setLocalSurvey}
        environmentId={environment.id}
      />

      <StylingCard localSurvey={localSurvey} setLocalSurvey={setLocalSurvey} colours={colours} />
    </div>
  );
}
