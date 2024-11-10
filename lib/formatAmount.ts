export function formatAmount(number: number) {
  const numStr = String(number);

  const parts = numStr.split(".");
  let integerPart = parts[0];
  const decimalPart = parts[1] || "";

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const formattedNumber = decimalPart
    ? `${integerPart}.${decimalPart}`
    : integerPart;

  return formattedNumber;
}
