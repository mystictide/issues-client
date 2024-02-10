"use server";

import axios from "axios";

const API_URL = "http://localhost:8484/";
// const API_URL = "https://issapi.herrguller.cc/";

export async function filterRoles(reqData) {
  try {
    var config = {
      method: "post",
      url: API_URL + "filter/roles",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + reqData.token,
      },
      data: JSON.stringify(reqData),
    };
    var result = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        if (error?.response) {
          return error?.response?.data;
        } else {
          throw "Server error.";
        }
      });
    return result;
  } catch (error) {
    return error;
  }
}

export async function filterUsers(reqData) {
  try {
    var config = {
      method: "post",
      url: API_URL + "filter/users",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + reqData.token,
      },
      data: JSON.stringify(reqData),
    };
    var result = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        if (error?.response) {
          return error?.response?.data;
        } else {
          throw "Server error.";
        }
      });
    return result;
  } catch (error) {
    return error;
  }
}

export async function filterProjects(reqData) {
  try {
    var config = {
      method: "post",
      url: API_URL + "filter/projects",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + reqData.token,
      },
      data: JSON.stringify(reqData),
    };
    var result = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        if (error?.response) {
          return error?.response?.data;
        } else {
          throw "Server error.";
        }
      });
    return result;
  } catch (error) {
    return error;
  }
}

export async function filterIssues(reqData) {
  try {
    var config = {
      method: "post",
      url: API_URL + "filter/issues",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + reqData.token,
      },
      data: JSON.stringify(reqData),
    };
    var result = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        if (error?.response) {
          return error?.response?.data;
        } else {
          throw "Server error.";
        }
      });
    return result;
  } catch (error) {
    return error;
  }
}

export async function filterComments(reqData) {
  try {
    var config = {
      method: "post",
      url: API_URL + "filter/comments",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + reqData.token,
      },
      data: JSON.stringify(reqData),
    };
    var result = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        if (error?.response) {
          return error?.response?.data;
        } else {
          throw "Server error.";
        }
      });
    return result;
  } catch (error) {
    return error;
  }
}
