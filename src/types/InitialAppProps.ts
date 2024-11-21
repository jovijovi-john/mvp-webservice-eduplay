import { BroadcasterType } from "./BroadcasterType";
import { ProgramType } from "./ProgramType";

export interface InitialAppProps {
  program: ProgramType;
  broadcaster: BroadcasterType;
  broadcasterIndex: number;
}
