import type { Colors } from "~/shared/engine/enums/Colors";
import type { Coords } from "~/shared/engine/types/Coords";

export type MessageSocketPayload = {
  myColor: Colors;
  from: Coords;
  to: Coords;
};
