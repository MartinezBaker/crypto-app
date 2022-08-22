export const twentyFourHourFilter = (arry) => {
  return arry.filter((element) => arry.indexOf(element) % 8 === 0 )
}

export const valueCheck = (amount, symbol) => {
  if(!amount) {
    return " -"
  }else if(amount && symbol) {
    return `${amount} ${symbol}`
  }else {
    return `${amount}`
  }
}

export const formatTimePercent = (t) => {
  if (!t) {
    return "-";
  }else if (t.includes("-")) {
    return t.substring(1) + "%";
  } else {
    return t + "%";
  }
};

export const formatPercent = (t) => {
  if (!t) {
    return "-";
  } else if (t?.includes("-")) {
    return t?.slice(1, 6) + "%";
  } else {
    return t?.slice(0, 8) + "%";
  }
};

export const formatNum = (n) => {
  if (n < 1e3) return n?.toFixed(0);
  if (n === null) return <span>&infin;</span>;
  if (n >= 1e3 && n < 1e6) return parseFloat((n / 1e3).toFixed(2)) + "K";
  if (n >= 1e6 && n < 1e9) return parseFloat((n / 1e6).toFixed(2)) + "M";
  if (n >= 1e9 && n < 1e12) return parseFloat((n / 1e9).toFixed(2)) + "B";
  if (n >= 1e12 && n < 1e15) return parseFloat((n / 1e12).toFixed(2)) + "T";
  if (n >= 1e15) return parseFloat((n / 1e15).toFixed(2)) + "QD";
  if ("-") return; 
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

export const sortList = (sortValue, key) => {
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

export const formatDate = (x) => {
  const date = new Date(x);
  const month = (`${date.getMonth() + 1}`).toString().padStart(2, "0")
  const altMonth = (`${date.getMonth() + 2}`).toString().padStart(2, "0");
  const day = (`${date.getDate() + 1}`).toString().padStart(2, "0")
  const formatedDate = `${day}` > 31 ? `${altMonth}-01-${date.getFullYear()}` :`${month}-${day}-${date.getFullYear()}`
  return formatedDate
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

export const formatLink = (link) => {
  if(link?.charAt(link?.length-1) === "/") {
    return link?.slice(8, link?.length-1) 
  }else{
    return link?.slice(8)
  }
}