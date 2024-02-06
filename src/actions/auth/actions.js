"use server";

import { setExpirationDate } from "@/assets/js/helpers";
import axios from "axios";
import { cookies } from "next/headers";

const API_URL = "http://localhost:8484/";
// const API_URL = "https://issapi.herrguller.cc/";

export async function addUser(reqData) {
  try {
    var config = {
      method: "post",
      url: API_URL + "auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(reqData),
    };
    var result = await axios(config)
      .then(function (response) {
        let user = JSON.stringify(response.data);
        cookies().set("auth", user, {
          expires: setExpirationDate(88),
        });
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

export async function adminRegister(reqData) {
  try {
    var config = {
      method: "post",
      url: API_URL + "auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(reqData),
    };
    var result = await axios(config)
      .then(function (response) {
        let admin = JSON.stringify(response.data);
        cookies().set("admin", admin, {
          expires: setExpirationDate(1),
        });
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

export async function adminLogin(reqData) {
  try {
    var config = {
      method: "post",
      url: API_URL + "auth/alogin",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(reqData),
    };
    var result = await axios(config)
      .then(function (response) {
        let admin = JSON.stringify(response.data);
        cookies().set("admin", admin, {
          expires: setExpirationDate(1),
        });
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

export async function login(reqData) {
  try {
    var config = {
      method: "post",
      url: API_URL + "auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(reqData),
    };
    var result = await axios(config)
      .then(function (response) {
        cookies().set("auth", JSON.stringify(response.data), {
          expires: setExpirationDate(9),
        });
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

export async function logout() {
  cookies().delete("admin");
  cookies().delete("auth");
  return true;
}

export async function checkExistingEmail(reqData) {
  try {
    var config = {
      method: "post",
      url: API_URL + "auth/cmail",
      headers: {
        "Content-Type": "application/json",
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
