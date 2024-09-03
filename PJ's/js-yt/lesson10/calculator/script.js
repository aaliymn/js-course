let calculation = localStorage.getItem("calculation") || "0";
console.log(calculation);
updateResult();
function updateCalculation(val) {
  if (calculation === "0") {
    calculation = "";
    calculation += val;
    updateResult();
    console.log(calculation);
  } else {
    calculation += val;
    updateResult();
    console.log(calculation);
  }
}
function saveCalculation() {
  localStorage.setItem("calculation", calculation);
}
function updateResult() {
  document.querySelector(".js-result").innerText = calculation;
}