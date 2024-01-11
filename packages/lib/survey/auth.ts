import { unstable_cache } from "next/cache";

import { ZId } from "@formbricks/types/environment";

import { SERVICES_REVALIDATION_INTERVAL } from "../constants";
import { hasUserEnvironmentAccess } from "../environment/auth";
import { getMembershipByUserIdTeamId } from "../membership/service";
import { getAccessFlags } from "../membership/utils";
import { getTeamByEnvironmentId } from "../team/service";
import { validateInputs } from "../utils/validate";
import { surveyCache } from "./cache";
import { getSurvey } from "./service";

export const canUserAccessSurvey = async (userId: string, surveyId: string): Promise<boolean> =>
  await unstable_cache(
    async () => {
      validateInputs([surveyId, ZId], [userId, ZId]);

      if (!userId) return false;

      const survey = await getSurvey(surveyId);
      if (!survey) throw new Error("Survey not found");

      const hasAccessToEnvironment = await hasUserEnvironmentAccess(userId, survey.environmentId);
      if (!hasAccessToEnvironment) return false;

      return true;
    },
    [`canUserAccessSurvey-${userId}-${surveyId}`],
    { revalidate: SERVICES_REVALIDATION_INTERVAL, tags: [surveyCache.tag.byId(surveyId)] }
  )();

export const verifyUserRoleAccess = async (
  environmentId: string,
  userId: string
): Promise<{
  hasCreateOrUpdateAccess: boolean;
  hasDeleteAccess: boolean;
}> => {
  const accessObject = {
    hasCreateOrUpdateAccess: true,
    hasDeleteAccess: true,
  };

  const team = await getTeamByEnvironmentId(environmentId);
  if (!team) {
    throw new Error("Team not found");
  }

  const currentUserMembership = await getMembershipByUserIdTeamId(userId, team.id);
  const { isViewer } = getAccessFlags(currentUserMembership?.role);

  if (isViewer) {
    accessObject.hasCreateOrUpdateAccess = false;
    accessObject.hasDeleteAccess = false;
  }

  return accessObject;
};
