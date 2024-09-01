let boxes = document.querySelectorAll(".box");
let h2 = document.getElementById("h2");
let reset = document.querySelector(".resetButton");
let start = document.querySelector(".start");

let turnO = false; //the first player either 'X' or 'O'

const allWinningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let checkWinner = () => {
  let isDraw = true; //we Should declare initially draw true
  for (let pattern of allWinningPatterns) {
    let pval1 = boxes[pattern[0]].innerText;
    let pval2 = boxes[pattern[1]].innerText;
    let pval3 = boxes[pattern[2]].innerText;

    // To check that box should not be empty
    if (pval1 != "" && pval2 != "" && pval3 != "") {
      if (pval1 === pval2 && pval2 === pval3) {
        // console.log("Winner", pval1);
        showWinner(pval1);
        return;
      }
    }
  }

  boxes.forEach((box) => {
    if (box.innerText === "") {
      isDraw = false; // If any box is still empty, it's not a draw
    }
  });

  if (isDraw) {
    showDraw();
  }
};

let showWinner = (win) => {
  h2.innerText = `The Winner is ${win}`;
  h2.style.visibility = "visible";
  disableBoxes();
};

let showDraw = () => {
  h2.innerText = "It's a draw !!";
  h2.style.visibility = "visible";
  disableBoxes();
};

let disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

let Restart = () => {
  turnO = true;
  enableBoxes();
  h2.style.visibility = "hidden";
};

let enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

reset.addEventListener("click", Restart);

start.addEventListener("click", () => {
  h2.style.visibility = "hidden";
  start.style.visibility='hidden';
  turnO = false;
  enableBoxes();

  boxes.forEach((box) => {
    box.addEventListener("click", boxEventHandler);
  });
});


let boxEventHandler = (event) => {
  let box = event.target;
  // console.log(box);
  if (turnO) {
    box.innerText = "O"; //player O
    box.classList.add("O_style");
    turnO = false;
  } else {
    box.innerText = "X"; //player X
    box.classList.add("X_style");
    turnO = true;
  }
  box.disabled = true;
  checkWinner();
};

// Initially all boxes are disable
disableBoxes();
