import { ProgramType } from "./ProgramType";

export interface BroadcasterType {
  name: string;
  icon: string;
  slogan: string;
  programs: ProgramType[];
  initialContent?: number;
  related: number[];
}
