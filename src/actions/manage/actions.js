"use server";

import axios from "axios";

const API_URL = "http://localhost:8484/";
// const API_URL = "https://issapi.herrguller.cc/";

export async function manageRole(reqData) {
  try {
    var config = {
      method: "post",
      url: API_URL + "manage/role",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + reqData.token,
      },
      data: reqData.entity,
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

export async function manageUser(reqData) {
  try {
    var config = {
      method: "post",
      url: API_URL + "manage/user",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + reqData.token,
      },
      data: JSON.stringify(reqData.User),
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
