import type { Session } from "next-auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@formbricks/lib/authOptions";
import { ONBOARDING_DISABLED } from "@formbricks/lib/constants";
import { getFirstEnvironmentByUserId } from "@formbricks/lib/environment/service";
import ClientLogout from "@formbricks/ui/ClientLogout";

export default async function Home() {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  if (!ONBOARDING_DISABLED && session?.user && !session?.user?.onboardingCompleted) {
    return redirect(`/onboarding`);
  }

  let environment;
  try {
    environment = await getFirstEnvironmentByUserId(session?.user.id);
    if (!environment) {
      throw new Error("No environment found");
    }
  } catch (error) {
    console.error("error getting environment", error);
  }

  if (!environment) {
    console.error("Failed to get first environment of user; signing out");
    return <ClientLogout />;
  }

  return redirect(`/environments/${environment.id}`);
}
