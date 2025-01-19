import { formatCurrency } from "../../scripts/utils/money.js";

describe("Test Suite : formatCurrency", ()=>{
    it("converts 1000 cents to $10.00",()=>{
        expect(formatCurrency(1000)).toEqual("10.00");
    });
    it("converts  0 cents to $0.00",()=>{
        expect(formatCurrency(0)).toEqual("0.00");
    });
    it("converts 2000.5 cents to $20.01",()=>{
        expect(formatCurrency(2000.5)).toEqual("20.01");
    });
})

