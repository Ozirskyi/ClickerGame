import { Tool } from "./Tool.js";

export class AutoTool extends Tool {
  constructor(name) {
    super(name);
  }

  tick() {
    return this.increasePerTick; 
  }
}
