import { Timeline } from "./timeline";
import { Conversation } from "./conversation";

export interface Case {
  agencyPoc: string;
  assignedAgency: string;
  caseDesc: string;
  client: any;
  clientName: string;
  conversations: Conversation[];
  createdAt: Date;
  id: string;
  timelines: Timeline[];
  updatedAt: Date;
}
