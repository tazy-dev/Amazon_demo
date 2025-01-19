import { formatCurrency } from "../scripts/utils/money.js";

console.log("Test Suite : formatCurrency");
console.log("Test case 1 : convert 1000 cents to $10.00");
if (formatCurrency(1000) === "10.00") {
    console.log("Pass");
}else{
    console.log("Fail");
}
console.log("Tset case 2 : convert 0 cents to $0.00");
if (formatCurrency(0) === "0.00") {
    console.log("Pass");
}else{
    console.log("Fail");
}
console.log("Tset case 3 : convert 2000.5 cents to $20.01");
if (formatCurrency(2000.5) === "20.01") {
    console.log("Pass");
}else{
    console.log("Fail");
}
