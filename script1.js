class Calc {
  constructor(pOperandEle, cOperandEle) {
    this.pOperandEle = pOperandEle;
    this.cOperandEle = cOperandEle;
    this.clear();
  }
  runOperation(operation) {
    if (this.currOperand === "") return;
    if (this.prevOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = "";
  }
  compute() {
    let computaion = 0;

    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currOperand);
    if (isNaN(prev) || isNaN(current)) {
      return;
    }
    switch (this.operation) {
      case "+":
        computaion = prev + current;
        break;
      case "-":
        computaion = prev - current;
        break;
      case "X":
        computaion = prev * current;
        break;
      case "/":
        computaion = prev / current;
        break;
      default:
        return;
    }

    this.currOperand = computaion;
    this.operation = undefined;
    this.prevOperand = "";
  }
  clear() {
    this.currOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
  }

  displayOperand() {
    this.cOperandEle.innerText = this.currOperand;
    if (this.operation != null) {
      this.pOperandEle.innerText = this.prevOperand + this.operation;
    } else {
      this.pOperandEle.innerText = "";
    }
  }
  appendNum(num) {
    if (num === "." && this.currOperand.includes(".")) {
      return;
    }
    this.currOperand = this.currOperand.toString() + num.toString();
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }
}

const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const deleteBtn = document.querySelector("[data-delete]");
const equalsBtn = document.querySelector("[data-equals]");
const allClearBtn = document.querySelector("[data-all-clear]");
const pOperandEle = document.querySelector("[data-p-operand]");
const cOperandEle = document.querySelector("[data-c-operand]");
const calculator = new Calc(pOperandEle, cOperandEle);

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appendNum(btn.innerHTML);
    calculator.displayOperand();
  });
});

operationBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.runOperation(btn.innerHTML);
    calculator.displayOperand();
  });
});

deleteBtn.addEventListener("click", (e) => {
  calculator.delete();
  calculator.displayOperand();
});
equalsBtn.addEventListener("click", (e) => {
  calculator.compute();
  calculator.displayOperand();
});

allClearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.displayOperand();
});
