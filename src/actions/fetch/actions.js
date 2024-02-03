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
