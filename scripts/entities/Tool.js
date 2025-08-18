import { CONFIG } from "../config.js";

export class Tool {
  constructor(name, game) {
    this.name = name;
    this.level = 0;
    this.increasePerTick = this.getIncreasePerTick();
    this.cost = this.getCost();
    this.game = game;

    this.levelElem = document.querySelector(`.${this.name}-level`);
    this.increaseElem = document.querySelector(`.${this.name}-increase`);
    this.costElem = document.querySelector(`.${this.name}-cost`);

    this.upgradeBtn = document.querySelector(`.${this.name}-upgrade`);
    
    if (this.upgradeBtn) {
      this.upgradeBtn.addEventListener("click", () => this.game.buyTool(this));
    }

    if (this.name === "clicker") {
      document.querySelector(".gem-image")
        .addEventListener("click", () => this.game.incrementGem());
    }
  }

  getIncreasePerTick() {
    switch (`${this.name}`) {
      case "clicker":
        return CONFIG.CLICKER_INCREASE_FACTOR + this.level;
      case "pickaxe":
        return CONFIG.PICKAXE_INCREASE_FACTOR * this.level;
      case "drill":
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

  updateDisplay() {
    this.levelElem.innerText = this.level;
    this.increaseElem.innerText = this.increasePerTick;
    this.costElem.innerText = this.cost;
  }
}