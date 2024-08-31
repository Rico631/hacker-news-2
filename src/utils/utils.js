export function unixToDate(unixTime) {
  const date = new Date(unixTime * 1000);
  return date.toLocaleString("ru-RU");
  // return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${(
  //   "0" + date.getHours()
  // ).slice(-2)}:${date.getMinutes()}`;
}

export function domainToHostName(url) {
  const domain = new URL(url);
  return domain.hostname;
}
