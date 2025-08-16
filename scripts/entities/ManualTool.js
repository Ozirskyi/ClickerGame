import { Tool } from "./Tool.js";

export class ManualTool extends Tool {
  constructor(name) {
    super(name);
  }

  incrementForClick() {
    return this.increasePerTick;
  }
}
