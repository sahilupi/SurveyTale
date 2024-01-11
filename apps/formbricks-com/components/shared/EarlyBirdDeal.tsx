import EarlyBird from "@/images/early bird deal for open source jotform alternative typeform and surveymonkey_v2.svg";
import { usePlausible } from "next-plausible";
import Image from "next/image";

import { Button } from "@formbricks/ui/Button";

export default function EarlyBirdDeal() {
  const plausible = usePlausible();
  return (
    <div className="bg-brand-dark relative mx-4 max-w-7xl overflow-hidden rounded-xl p-6 pb-16 sm:p-8 sm:pb-16 md:px-12 md:py-8 lg:mx-0 lg:flex lg:items-center">
      <div className="lg:w-0 lg:flex-1 ">
        <h2
          className="mb-1 text-2xl font-bold tracking-tight text-white sm:text-2xl"
          id="newsletter-headline">
          50% off for Early Birds.
        </h2>
        <h2 className="text-xl font-semibold tracking-tight text-slate-200 sm:text-lg">
          Limited deal: Only{" "}
          <span className="bg- rounded-sm bg-slate-200/40 px-2 py-0.5 text-slate-100">14</span> left.
        </h2>

        <div className="mt-6">
          <Button
            variant="secondary"
            className="dark:bg-slate-200 dark:text-slate-700 dark:hover:bg-slate-300"
            onClick={() => {
              plausible("Pricing_CTA_EarlyBird");
              window.open("https://app.formbricks.com/auth/signup", "_blank")?.focus();
            }}>
            Get Early Bird deal
          </Button>
        </div>
        <p className="mb-24 mt-2 max-w-3xl text-xs tracking-tight text-slate-200 md:mb-0 md:max-w-sm lg:max-w-none">
          This saves you $588 every year.
        </p>
        <div className="absolute -bottom-36 -right-20 mx-auto h-96 w-96 scale-75 sm:-right-10">
          <Image src={EarlyBird} fill alt="formbricks favicon open source forms typeform alternative" />
        </div>
      </div>
    </div>
  );
}
