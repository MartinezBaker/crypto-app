export const formatTimePercent = (t) => {
  if (!t) {
    return "-";
  }else if (t.includes("-")) {
    return t.slice(1, 5) + "%";
  } else {
    return t.slice(0, 4) + "%";
  }
};

export const formatPercent = (t) => {
  if (!t) {
    return "-";
  } else if (t.includes("-")) {
    return t.slice(1, 6) + "%";
  } else {
    return t.slice(0, 8) + "%";
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

export const sort = (sortValue, key) => {
  return (a, b) => {
    const A = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const B = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
    if (sortValue === true) {
     return A < B ? -1 : 1;
    }else if (sortValue === false) {
     return B < A ? -1 : 1;
    }else {
      return 0;
    }
  };
};

export const formatChartData = (arr, index) => {
  if(index === 0) {
    return arr.reduce((acc, element) => ([...acc, element[0]]), []).map((time) => {
      const date = new Date(time)
      return date.getDate();
    })
  }
  if(index === 1) {
    return arr.reduce((acc, element) => ([...acc, element[1]]), []);
  }
}

export const getTodaysDate = () => {
  return new Date().toString().split(" ").splice(1, 3).join(" ");
}

export const adjustBarThickness = (days) => {
  const daysObj = {
    1: 220,
    6: 50,
    29: 10,
    89: 4,
    179: 1,
    364: 0.5
  }
  Object.entries(daysObj).map((entry) => {
    const[key, value] = entry
    if(key === days) {
      return value
    }else {
      return null
    }
  })
}

export const topSort = (sortBy, sortValue, sortItem) => {
  return (a, b) => {
    if (sortBy === sortValue) {
     return b[sortItem] - a[sortItem];
    }
  };
};

export const formatDate = (unix) => {
  const date = new Date(unix);
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}

export const titleCallBack = (raw, arry) => {
  const filteredItem = arry
    .filter((element) => element[1] === raw)
    .map((element) => {
      const date = new Date(element[0]);
      return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    });
  return filteredItem;
}
