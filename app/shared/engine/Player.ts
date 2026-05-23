import type { Color } from "./enums/Colors";

export default class Player {
  constructor(
    public name: string,
    public color: Color,
  ) {}
}
