"use client";

import {
  copyToOtherEnvironmentAction,
  deleteSurveyAction,
  duplicateSurveyAction,
} from "@/app/(app)/environments/[environmentId]/actions";
import {
  ArrowUpOnSquareStackIcon,
  DocumentDuplicateIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  LinkIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import type { TEnvironment } from "@formbricks/types/environment";
import type { TSurvey } from "@formbricks/types/surveys";
import { DeleteDialog } from "@formbricks/ui/DeleteDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@formbricks/ui/DropdownMenu";
import LoadingSpinner from "@formbricks/ui/LoadingSpinner";

interface SurveyDropDownMenuProps {
  environmentId: string;
  survey: TSurvey;
  environment: TEnvironment;
  otherEnvironment: TEnvironment;
  webAppUrl: string;
  singleUseId?: string;
  isSurveyCreationDeletionDisabled?: boolean;
}

export default function SurveyDropDownMenu({
  environmentId,
  survey,
  environment,
  otherEnvironment,
  webAppUrl,
  singleUseId,
  isSurveyCreationDeletionDisabled,
}: SurveyDropDownMenuProps) {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const surveyUrl = useMemo(() => webAppUrl + "/s/" + survey.id, [survey.id, webAppUrl]);

  const handleDeleteSurvey = async (survey) => {
    setLoading(true);
    try {
      await deleteSurveyAction(survey.id);
      router.refresh();
      setDeleteDialogOpen(false);
      toast.success("Survey deleted successfully.");
    } catch (error) {
      toast.error("An error occured while deleting survey");
    }
    setLoading(false);
  };

  const duplicateSurveyAndRefresh = async (surveyId) => {
    setLoading(true);
    try {
      await duplicateSurveyAction(environmentId, surveyId);
      router.refresh();
      toast.success("Survey duplicated successfully.");
    } catch (error) {
      toast.error("Failed to duplicate the survey.");
    }
    setLoading(false);
  };

  const copyToOtherEnvironment = async (surveyId) => {
    setLoading(true);
    try {
      await copyToOtherEnvironmentAction(environmentId, surveyId, otherEnvironment.id);
      if (otherEnvironment.type === "production") {
        toast.success("Survey copied to production env.");
      } else if (otherEnvironment.type === "development") {
        toast.success("Survey copied to development env.");
      }
      router.replace(`/environments/${otherEnvironment.id}`);
    } catch (error) {
      toast.error(`Failed to copy to ${otherEnvironment.type}`);
    }
    setLoading(false);
  };
  if (loading) {
    return (
      <div className="opacity-0.2 absolute left-0 top-0 h-full w-full bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="z-10 cursor-pointer" asChild>
          <div>
            <span className="sr-only">Open options</span>
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            {!isSurveyCreationDeletionDisabled && (
              <>
                <DropdownMenuItem>
                  <Link
                    className="flex w-full items-center"
                    href={`/environments/${environmentId}/surveys/${survey.id}/edit`}>
                    <PencilSquareIcon className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <button
                    className="flex w-full items-center"
                    onClick={async () => {
                      duplicateSurveyAndRefresh(survey.id);
                    }}>
                    <DocumentDuplicateIcon className="mr-2 h-4 w-4" />
                    Duplicate
                  </button>
                </DropdownMenuItem>
              </>
            )}
            {!isSurveyCreationDeletionDisabled && (
              <>
                {environment.type === "development" ? (
                  <DropdownMenuItem>
                    <button
                      className="flex w-full items-center"
                      onClick={() => {
                        copyToOtherEnvironment(survey.id);
                      }}>
                      <ArrowUpOnSquareStackIcon className="mr-2 h-4 w-4" />
                      Copy to Prod
                    </button>
                  </DropdownMenuItem>
                ) : environment.type === "production" ? (
                  <DropdownMenuItem>
                    <button
                      className="flex w-full items-center"
                      onClick={() => {
                        copyToOtherEnvironment(survey.id);
                      }}>
                      <ArrowUpOnSquareStackIcon className="mr-2 h-4 w-4" />
                      Copy to Dev
                    </button>
                  </DropdownMenuItem>
                ) : null}
              </>
            )}
            {survey.type === "link" && survey.status !== "draft" && (
              <>
                <DropdownMenuItem>
                  <Link
                    className="flex w-full items-center"
                    href={
                      singleUseId
                        ? `/s/${survey.id}?suId=${singleUseId}&preview=true`
                        : `/s/${survey.id}?preview=true`
                    }
                    target="_blank">
                    <EyeIcon className="mr-2 h-4 w-4" />
                    Preview Survey
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    className="flex w-full items-center"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        singleUseId ? `${surveyUrl}?suId=${singleUseId}` : surveyUrl
                      );
                      toast.success("Copied link to clipboard");
                      router.refresh();
                    }}>
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Copy Link
                  </button>
                </DropdownMenuItem>
              </>
            )}
            {!isSurveyCreationDeletionDisabled && (
              <DropdownMenuItem>
                <button
                  className="flex w-full  items-center"
                  onClick={() => {
                    setDeleteDialogOpen(true);
                  }}>
                  <TrashIcon className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {!isSurveyCreationDeletionDisabled && (
        <DeleteDialog
          deleteWhat="Survey"
          open={isDeleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          onDelete={() => handleDeleteSurvey(survey)}
          text="Are you sure you want to delete this survey and all of its responses? This action cannot be undone."
        />
      )}
    </>
  );
}
