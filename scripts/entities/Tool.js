import { CONFIG } from "../config.js";

export class Tool {
  constructor(name) {
    this.name = name;
    this.level = 0;
    this.increasePerTick = this.getIncreasePerTick();
    this.cost = this.getCost();
  }

  getIncreasePerTick() {
    switch (this.name.toUpperCase()) {
      case "CLICKER": 
        return CONFIG.CLICKER_INCREASE_FACTOR + this.level;
      case "PICKAXE": 
        return CONFIG.PICKAXE_INCREASE_FACTOR * this.level;
      case "DRILL": 
        return CONFIG.DRILL_INCREASE_FACTOR * this.level;
      default: 
        return 1;
    }
  }

  getCost() {
    const initialCost = CONFIG[`${this.name.toUpperCase()}_INITIAL_COST`] || 10;
    return Math.round(initialCost * Math.pow(CONFIG.COST_GROWTH_FACTOR, this.level));
  }

  levelUp() {
    const cost = this.getCost();
    this.level++;
    this.increasePerTick = this.getIncreasePerTick();
    this.cost = this.getCost();
    return cost;
  }
}
