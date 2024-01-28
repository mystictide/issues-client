"use server";
import { setExpirationDate } from "@/assets/js/helpers";
import { User } from "@/models/users/user";
import axios from "axios";
import { cookies } from "next/headers";

const API_URL = "http://localhost:8484/";
// const API_URL = "https://issapi.herrguller.cc/";

export async function register(reqData) {
  const UserModel = new User(reqData);
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
        return error;
      });
    return result;
  } catch (error) {
    return true;
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
          expires: setExpirationDate(88),
        });
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
    return result;
  } catch (error) {
    return true;
  }
}

export async function logout() {
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
    var result =
      (await axios) <
      boolean >
      config
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          return error;
        });
    return result;
  } catch (error) {
    return true;
  }
}
