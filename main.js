class ClickerGame {
  constructor() {
    this.gems = parseFloat(document.querySelector(".gem-cost").innerHTML);
    this.gemsPerClick = 1;
    this.gemsPerSecond = 0;

    this.clickerCost = parseFloat(
      document.querySelector(".clicker-cost").innerHTML
    );
    this.clickerIncreaseElem = document.querySelector(".clicker-increase");
    this.clickerLevelElem = document.querySelector(".clicker-level");
    this.clickerCostElem = document.querySelector(".clicker-cost");
    this.clickerLevel = 0;

    this.pickaxeCost = parseFloat(
      document.querySelector(".pickaxe-cost").innerHTML
    );
    this.pickaxeLevel = parseInt(
      document.querySelector(".pickaxe-level").innerHTML
    );
    this.pickaxeIncrease = parseFloat(
      document.querySelector(".pickaxe-increase").innerHTML
    );
    this.pickaxeLevelElem = document.querySelector(".pickaxe-level");
    this.pickaxeIncreaseElem = document.querySelector(".pickaxe-increase");
    this.pickaxeCostElem = document.querySelector(".pickaxe-cost");

    this.drillCost = parseFloat(
      document.querySelector(".drill-cost").innerHTML
    );
    this.drillLevel = parseInt(
      document.querySelector(".drill-level").innerHTML
    );
    this.drillIncrease = parseFloat(
      document.querySelector(".drill-increase").innerHTML
    );
    this.drillLevelElem = document.querySelector(".drill-level");
    this.drillIncreaseElem = document.querySelector(".drill-increase");
    this.drillCostElem = document.querySelector(".drill-cost");

    this.gemElem = document.querySelector(".gem-cost");

    document
      .querySelector(".gem-image")
      .addEventListener("click", () => this.incrementGem());
    document
      .querySelector(".clicker-upgrade")
      .addEventListener("click", () => this.buyClicker());
    document
      .querySelector(".pickaxe-upgrade")
      .addEventListener("click", () => this.buyPickaxe());
    document
      .querySelector(".drill-upgrade")
      .addEventListener("click", () => this.buyDrill());

    setInterval(() => this.generateGems(), 100);
  }

  updateGemsDisplay() {
    this.gemElem.innerHTML = Math.round(this.gems);
    this.clickerCostElem.innerHTML = Math.round(this.clickerCost);
    this.pickaxeCostElem.innerHTML = Math.round(this.pickaxeCost);
    this.drillCostElem.innerHTML = Math.round(this.drillCost);
  }

  incrementGem() {
    this.gems += this.gemsPerClick;
    this.updateGemsDisplay();
  }

  buyClicker() {
    if (this.gems >= this.clickerCost) {
      this.gems -= this.clickerCost;
      this.clickerLevel++;
      this.gemsPerClick = 1 + this.clickerLevel;
      this.clickerIncreaseElem.innerHTML = this.gemsPerClick;
      this.clickerLevelElem.innerHTML = this.clickerLevel;
      this.clickerCost = this.clickerCost * 1.3;
      this.clickerCostElem.innerHTML = this.clickerCost;
      this.updateGemsDisplay();
    }
  }

  buyPickaxe() {
    if (this.gems >= this.pickaxeCost) {
      this.gems -= this.pickaxeCost;
      this.pickaxeLevel++;
      this.pickaxeIncrease = 4 * this.pickaxeLevel;
      this.pickaxeIncreaseElem.innerHTML = this.pickaxeIncrease;
      this.pickaxeLevelElem.innerHTML = this.pickaxeLevel;
      this.gemsPerSecond = this.pickaxeIncrease + this.drillIncrease;
      this.pickaxeCost = this.pickaxeCost * 1.3;
      this.pickaxeCostElem.innerHTML = this.pickaxeCost;
      this.updateGemsDisplay();
    }
  }

  buyDrill() {
    if (this.gems >= this.drillCost) {
      this.gems -= this.drillCost;
      this.drillLevel++;
      this.drillIncrease = 12 * this.drillLevel;
      this.drillIncreaseElem.innerHTML = this.drillIncrease;
      this.drillLevelElem.innerHTML = this.drillLevel;
      this.gemsPerSecond = this.pickaxeIncrease + this.drillIncrease;
      this.drillCost = this.drillCost * 1.3;
      this.drillCostElem.innerHTML = this.drillCost;
      this.updateGemsDisplay();
    }
  }

  generateGems() {
    this.gems += this.gemsPerSecond / 10;
    this.updateGemsDisplay();
  }
}

new ClickerGame();
