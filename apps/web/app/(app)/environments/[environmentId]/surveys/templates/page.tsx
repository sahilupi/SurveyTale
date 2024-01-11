import { getServerSession } from "next-auth";

import { authOptions } from "@formbricks/lib/authOptions";
import { getEnvironment } from "@formbricks/lib/environment/service";
import { getProductByEnvironmentId } from "@formbricks/lib/product/service";

import TemplateContainerWithPreview from "./TemplateContainer";

export default async function SurveyTemplatesPage({ params }) {
  const session = await getServerSession(authOptions);
  const environmentId = params.environmentId;

  const [environment, product] = await Promise.all([
    getEnvironment(environmentId),
    getProductByEnvironmentId(environmentId),
  ]);

  if (!session) {
    throw new Error("Session not found");
  }

  if (!product) {
    throw new Error("Product not found");
  }

  if (!environment) {
    throw new Error("Environment not found");
  }

  return (
    <TemplateContainerWithPreview
      environmentId={environmentId}
      user={session.user}
      environment={environment}
      product={product}
    />
  );
}
