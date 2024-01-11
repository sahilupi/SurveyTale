import { SurveyInline } from "@/components/general/SurveyInline";
import { SurveyModal } from "@/components/general/SurveyModal";
import { addCustomThemeToDom, addStylesToDom } from "@/lib/styles";
import { SurveyInlineProps, SurveyModalProps } from "@/types/props";
import { h, render } from "preact";

export const renderSurveyInline = (props: SurveyInlineProps & { brandColor: string }) => {
  addStylesToDom();
  addCustomThemeToDom({ brandColor: props.brandColor });

  const { containerId, ...surveyProps } = props;
  const element = document.getElementById(containerId);
  if (!element) {
    throw new Error(`renderSurvey: Element with id ${containerId} not found.`);
  }
  render(h(SurveyInline, surveyProps), element);
};

export const renderSurveyModal = (props: SurveyModalProps & { brandColor: string }) => {
  addStylesToDom();
  addCustomThemeToDom({ brandColor: props.brandColor });

  // add container element to DOM
  const element = document.createElement("div");
  element.id = "formbricks-modal-container";
  document.body.appendChild(element);
  render(h(SurveyModal, props), element);
};
