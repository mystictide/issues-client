"use server";

import axios from "axios";

const API_URL = "http://localhost:8484/";
// const API_URL = "https://issapi.herrguller.cc/";

export async function getRole(reqData) {
  try {
    if (reqData) {
      var config = {
        method: "get",
        url: API_URL + "get/role?id=" + reqData.ID,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + reqData.token,
        },
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
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
}

export async function getRoles(token) {
  try {
    if (token) {
      var config = {
        method: "get",
        url: API_URL + "get/roles",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
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
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
}

export async function getUser(reqData) {
  try {
    var config = {
      method: "get",
      url: API_URL + "get/user?id=" + reqData.ID,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + reqData.token,
      },
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

export async function getUsers(token) {
  try {
    var config = {
      method: "get",
      url: API_URL + "get/users",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
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

export async function getProject(reqData) {
  try {
    var config = {
      method: "get",
      url: API_URL + "get/project?id=" + reqData.ID,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + reqData.token,
      },
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

export async function getProjects(token, limit) {
  try {
    var config = {
      method: "get",
      url: API_URL + "get/projects?limit=" + limit,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
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

export async function getIssue(reqData) {
  try {
    var config = {
      method: "get",
      url: API_URL + "get/issue?id=" + reqData.ID,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + reqData.token,
      },
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

export async function getIssues(token, limit) {
  try {
    var config = {
      method: "get",
      url: API_URL + "get/issues?limit=" + limit,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
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

export async function getIssueStats(token) {
  try {
    var config = {
      method: "get",
      url: API_URL + "get/stats/issues",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
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

export async function getProjectStats(token) {
  try {
    var config = {
      method: "get",
      url: API_URL + "get/stats/projects",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
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