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

export function buildFilter(filterData) {
  let filter = {
    id: filterData.id ? filterData.id : 0,
    keyword: filterData.keyword ? filterData.keyword : null,
    page: filterData.page ?? 1,
    sortby: filterData.sortby ?? "desc",
    isActive: filterData.isActive ?? true,
    token: filterData.token,
  };
  return filter;
}

export function buildIssueFilter(filterData) {
  let filter = {
    id: filterData.id ? filterData.id : 0,
    keyword: filterData.keyword ? filterData.keyword : null,
    projectid: filterData.projectid ?? 0,
    type: filterData.type ?? 0,
    status: filterData.status ?? 0,
    priority: filterData.priority ?? 0,
    page: filterData.page ?? 1,
    sortby: filterData.sortby ?? "desc",
    isActive: filterData.isActive ?? true,
    token: filterData.token,
  };
  return filter;
}

export function buildFilterURL(params) {
  let url = "";
  if (params) {
    url += params.page ? `?page=${params.page}` : "?page=1";
    url += params.keyword ? `&keyword=${params.keyword}` : "&keyword=";
    url += params.sortby ? `&sortby=${params.sortby}` : "&sortby=";
  }
  return url;
}
