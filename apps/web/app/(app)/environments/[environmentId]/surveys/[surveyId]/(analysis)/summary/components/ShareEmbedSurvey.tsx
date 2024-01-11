"use client";

import LinkSingleUseSurveyModal from "@/app/(app)/environments/[environmentId]/surveys/[surveyId]/(analysis)/summary/components/LinkSingleUseSurveyModal";
import { CodeBracketIcon, EnvelopeIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";

import { cn } from "@formbricks/lib/cn";
import { TProduct } from "@formbricks/types/product";
import { TSurvey } from "@formbricks/types/surveys";
import { TUser } from "@formbricks/types/user";
import { Button } from "@formbricks/ui/Button";
import { Dialog, DialogContent } from "@formbricks/ui/Dialog";

import EmailTab from "./shareEmbedTabs/EmailTab";
import LinkTab from "./shareEmbedTabs/LinkTab";
import WebpageTab from "./shareEmbedTabs/WebpageTab";

interface ShareEmbedSurveyProps {
  survey: TSurvey;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  webAppUrl: string;
  product: TProduct;
  user: TUser;
}
export default function ShareEmbedSurvey({
  survey,
  open,
  setOpen,
  webAppUrl,
  product,
  user,
}: ShareEmbedSurveyProps) {
  const surveyUrl = useMemo(() => webAppUrl + "/s/" + survey.id, [survey, webAppUrl]);
  const isSingleUseLinkSurvey = survey.singleUse?.enabled;
  const { email } = user;
  const { brandColor } = product;
  const surveyBrandColor = survey.productOverwrites?.brandColor || brandColor;

  const tabs = [
    { id: "link", label: `${isSingleUseLinkSurvey ? "Single Use Links" : "Share the Link"}`, icon: LinkIcon },
    { id: "email", label: "Embed in an Email", icon: EnvelopeIcon },
    { id: "webpage", label: "Embed in a Web Page", icon: CodeBracketIcon },
  ];

  const [activeId, setActiveId] = useState(tabs[0].id);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setActiveId(tabs[0].id);
        setOpen(open);
      }}>
      <DialogContent className="bottom-0 flex h-[95%] w-full flex-col gap-0 overflow-hidden rounded-2xl bg-white p-0 sm:max-w-none lg:bottom-auto lg:h-auto lg:w-[960px]">
        <div className="border-b border-gray-200 px-4 py-3 lg:px-6 lg:py-4 ">Share or embed your survey</div>
        <div className="flex grow overflow-x-hidden overflow-y-scroll">
          <div className="hidden basis-[326px] border-r border-gray-200 px-6 py-8 lg:block lg:shrink-0">
            <div className="flex w-max flex-col gap-3">
              {tabs.map((tab) => (
                <Button
                  StartIcon={tab.icon}
                  startIconClassName={cn("h-4 w-4")}
                  variant="minimal"
                  key={tab.id}
                  onClick={() => setActiveId(tab.id)}
                  className={cn(
                    "rounded-[4px] px-4 py-[6px] text-slate-600",
                    // "focus:ring-0 focus:ring-offset-0", // enable these classes to remove the focus rings on buttons
                    tab.id === activeId
                      ? " border border-gray-200 bg-slate-100 font-semibold text-slate-900"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  )}
                  aria-current={tab.id === activeId ? "page" : undefined}>
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex w-full grow flex-col gap-6 bg-gray-50 px-4 py-6 lg:p-6">
            <div className="flex h-full overflow-y-scroll lg:h-[590px] lg:overflow-y-visible">
              {isSingleUseLinkSurvey ? (
                <LinkSingleUseSurveyModal survey={survey} surveyBaseUrl={webAppUrl} />
              ) : activeId === "link" ? (
                <LinkTab surveyUrl={surveyUrl} survey={survey} brandColor={surveyBrandColor} />
              ) : activeId === "email" ? (
                <EmailTab surveyId={survey.id} email={email} />
              ) : activeId === "webpage" ? (
                <WebpageTab surveyUrl={surveyUrl} />
              ) : null}
            </div>
            <div className="mx-auto flex max-w-max rounded-md bg-slate-100 p-1 lg:hidden">
              {tabs.slice(0, 2).map((tab) => (
                <Button
                  variant="minimal"
                  key={tab.id}
                  onClick={() => setActiveId(tab.id)}
                  className={cn(
                    "rounded-sm px-3 py-[6px]",
                    tab.id === activeId
                      ? "bg-white text-slate-900"
                      : "border-transparent text-slate-700 hover:text-slate-900"
                  )}>
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
