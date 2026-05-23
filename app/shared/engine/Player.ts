import type { Color } from "./enums/Color";

export default class Player {
  constructor(
    public name: string,
    public color: Color,
  ) {}
}
