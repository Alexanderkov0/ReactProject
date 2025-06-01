
export default function displayAmount(amount) {
  // amount is a number, e.g. 100 or -100
  const sign = amount < 0 ? "-" : "+";
  return `${sign}$${Math.abs(amount)}`;
}