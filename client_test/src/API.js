import axios from "axios";
import React from "react";
import { Redirect } from "react-router-dom";
const headers = {
  "content-type": "application/json"
};
export default {
  getTestFile: function () {
    return axios.get('/testFile',{headers:headers});
  },
  sendData: function (data) {
    return axios.post('/data',data,{headers:headers});
  },
  redirect: function (url) {
    console.log(url);
    return <Redirect to={url} />;
  }
};
