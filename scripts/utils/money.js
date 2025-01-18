export function formatCurrency(priceInCentes) {
    return (Math.round(priceInCentes) /100).toFixed(2);
}