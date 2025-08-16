import { Tool } from "./entities/Tool.js";
import { CONFIG } from "./config.js";

class ClickerGame {
  constructor() {
    this.gems = CONFIG.STARTING_GEM_FACTOR;

    this.clicker = new Tool("clicker");
    this.pickaxe = new Tool("pickaxe");
    this.drill = new Tool("drill");

    this.tools = [this.clicker, this.pickaxe, this.drill];
    this.gemElem = document.querySelector(".gem-cost");

    document.querySelector(".gem-image")
      .addEventListener("click", () => this.incrementGem());

    document.querySelector(".clicker-upgrade")
      .addEventListener("click", () => this.buyTool(this.clicker));
    document.querySelector(".pickaxe-upgrade")
      .addEventListener("click", () => this.buyTool(this.pickaxe));
    document.querySelector(".drill-upgrade")
      .addEventListener("click", () => this.buyTool(this.drill));

    setInterval(() => this.generateGems(), CONFIG.AUTO_TICK_INTERVAL);
  }

  incrementGem() {
    this.gems += this.clicker.increasePerTick;
    this.updateDisplay();
  }

  buyTool(tool) {
    if (this.gems >= tool.cost) {
      this.gems -= tool.levelUp();
      this.updateDisplay();
    }
  }

  generateGems() {
    this.tools.forEach(tool => {
      if (tool.name !== "clicker") {
        this.gems += tool.increasePerTick;
      }
    });
    this.updateDisplay();
  }

  updateDisplay() {
    this.gemElem.innerText = Math.floor(this.gems);

    this.tools.forEach(tool => {
      document.querySelector(`.${tool.name}-level`).innerText = tool.level;
      document.querySelector(`.${tool.name}-increase`).innerText = tool.increasePerTick;
      document.querySelector(`.${tool.name}-cost`).innerText = tool.cost;
    });
  }
}

new ClickerGame();
