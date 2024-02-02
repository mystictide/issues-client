export function readCookie(cookieStore, name) {
  const cookie = cookieStore.get(name) ? cookieStore.get(name)?.value : null;
  const res = cookie ? JSON.parse(cookie) : null;
  return res;
}

export function setExpirationDate(days) {
  var date = new Date(Date.now());
  date.setDate(date.getDate() + days);
  return date;
}

export function formatDate(date) {
  var options = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  let returnDate = new Date(date);
  return returnDate.toLocaleTimeString("en-GB", options);
}

export function formatPrettyURL(url) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return (
    url
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, "-and-") // Replace & with 'and'
      // .replace(/[^\w-]+/g, "") // Remove all non-word characters
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, "")
  ); // Trim - from end of text
}

export function decodeURL(url) {
  return url.toString().replaceAll("-", " ");
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  const ls = localStorage.getItem(key);
  return ls !== null ? JSON.parse(ls) : null;
}