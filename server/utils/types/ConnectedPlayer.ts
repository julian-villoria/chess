import { Colors } from "~/shared/engine/enums/Colors";

export type ConnectedPlayer = {
  role: Roles;
  peerId: string;
  color: Colors | null;
};
