export function formatAmount(number: number) {
  let numStr = String(number);

  let parts = numStr.split(".");
  let integerPart = parts[0];
  let decimalPart = parts[1] || "";

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  let formattedNumber = decimalPart
    ? `${integerPart}.${decimalPart}`
    : integerPart;

  return formattedNumber;
}
