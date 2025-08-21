import { Tool } from "./entities/Tool.js";
import { CONFIG } from "./config.js";

class ClickerGame {
  constructor() {
    this.gems = CONFIG.STARTING_GEM_FACTOR;

    this.clicker = new Tool("clicker", this);
    this.pickaxe = new Tool("pickaxe", this);
    this.drill = new Tool("drill", this);

    this.tools = [this.clicker, this.pickaxe, this.drill];
    this.gemElem = document.querySelector(".gem-cost");

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
    for (const tool of this.tools) {
      if (CONFIG.AUTO_GEM_TOOLS.includes(tool.name)) {
        this.gems += tool.increasePerTick;
      }
    }
    this.updateDisplay();
  }

  updateDisplay() {
  this.gemElem.innerText = Math.floor(this.gems);

  this.tools.forEach(tool => {
    tool.levelElem.innerText = tool.level;
    tool.costElem.innerText = tool.cost;
    tool.increaseElem.innerText = tool.increasePerTick;
  });
  }
}

new ClickerGame();
