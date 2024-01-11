"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authOptions } from "@formbricks/lib/authOptions";
import { getResponses } from "@formbricks/lib/response/service";
import { canUserAccessSurvey } from "@formbricks/lib/survey/auth";
import { AuthorizationError } from "@formbricks/types/errors";
import { TResponse } from "@formbricks/types/responses";

export default async function revalidateSurveyIdPath(environmentId: string, surveyId: string) {
  revalidatePath(`/environments/${environmentId}/surveys/${surveyId}`);
}

export async function getMoreResponses(surveyId: string, page: number): Promise<TResponse[]> {
  const session = await getServerSession(authOptions);
  if (!session) throw new AuthorizationError("Not authorized");

  const isAuthorized = await canUserAccessSurvey(session.user.id, surveyId);
  if (!isAuthorized) throw new AuthorizationError("Not authorized");
  const responses = await getResponses(surveyId, page);
  return responses;
}
