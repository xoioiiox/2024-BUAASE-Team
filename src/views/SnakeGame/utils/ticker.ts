/*
 * @Description:帧循环
 */

let startTime = Date.now();
type Ticker = Function;
let tickers: Array<Ticker> = [];

const handleFrame = () => {
  tickers.forEach((ticker) => {
    ticker(Date.now() - startTime);
  });
  startTime = Date.now();
  requestAnimationFrame(handleFrame);
};

requestAnimationFrame(handleFrame);

export function addTicker(ticker: Ticker) {
  tickers.push(ticker);
}

export function stopTicker() {
  tickers = [];
}
