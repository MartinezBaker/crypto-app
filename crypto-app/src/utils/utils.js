export const formatTimePercent = (t) => {
  if (!t) {
    return "-";
  }else if (t.includes("-")) {
    return t.slice(1, 5) + "%";
  } else {
    return t.slice(0, 4) + "%";
  }
};

export const formatNum = (n) => {
  if (n < 1e3) return n;
  if (n === null) return <span>&infin;</span>;
  if (n >= 1e3 && n < 1e6) return (n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e12 && n < 1e15) return (n / 1e12).toFixed(1) + "T";
  if (n >= 1e15) return (n / 1e15).toFixed(1) + "QD";
};

export function labelAlgo(arr, finalLength) {
  do {
    return [...arr, arr];
  } while (arr.length !== finalLength);
}

export function formatCoinName(name) {
  if(name.length > 9) {
    return name.slice(0, 9) + "...";
  }else{
    return name
  }
}

export function formatPrice(price) {
  if(price.includes("e")) {
    return price.slice(0, price.indexOf("e"))
  }else{
    return price
  }
} 

