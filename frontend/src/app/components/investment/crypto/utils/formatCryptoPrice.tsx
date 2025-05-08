export function formatCryptoPrice(price: number) {
  if (price >= 1) {
      return price.toFixed(2);
  } else {
      let priceStr = price.toString();
      let match = priceStr.match(/^0\.(0+)(\d+)/);
      
      if (match) {
          let zeroCount = match[1].length;
          let significantDigits = match[2];
          if (zeroCount > 4) {
              return `0.0(${zeroCount})${significantDigits}`;
          } else {
              return `0.${'0'.repeat(zeroCount)}${significantDigits.slice(0, 4)}`;
          }
      }
      
      return parseFloat(price.toFixed(4)).toString();
  }
}