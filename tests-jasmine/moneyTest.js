import {formatCurrency} from "../scripts/utils/money.js";

describe("test suite: formatCurrency", () => {
  it('should converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });
  
  it('should works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });
  
  it('should rounds up to the nearest cent up', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
  
  it('should rounds up to the nearest cent down', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });
});
