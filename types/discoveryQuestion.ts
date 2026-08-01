import type { AssessmentAnswerValue, AssessmentDomain } from "./discoveryAssessment";

export type DiscoveryQuestion = {
  id: string;
  domain: AssessmentDomain;
  domainLabelIndo: string;
  text: string;
  example: string;
  /** Lucide icon name (see components/discovery/domainIcon.tsx for the resolved map). */
  iconName: string;
};

export type AnswerOption = {
  value: AssessmentAnswerValue;
  label: string;
  description: string;
};
