import * as React from "react";
import axios from "axios";
import defaultAvatar from "./defaultAvatar.jpg";
import { Form, Input, Select } from "antd";
import { useState } from "react";
// import { useHistory } from "react-router-dom";
// import * as api from "../../services/api";
const style = require("./style.less");

export default function Register() {
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  function uploadFile() {
    axios.defaults.withCredentials = true;
    let formdata = new FormData();
    let file1 = document.querySelector("#input1").files[0];
    let file2 = document.querySelector("#input2").files[0];
    let file3 = document.querySelector("#input3").files[0];
    formdata.append(`file1`, file1);
    formdata.append(`file2`, file2);
    formdata.append(`file3`, file3);
    // console.log(formdata.get('files'));
    // formdata.append("file", file1);
    // console.log(formdata.get('files'));
    axios({
      url: "http://localhost:6000/file/saveAvatar",
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
      data: formdata,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // function saveAvatar() {
  //   axios.defaults.withCredentials = true;
  //   let formdata = new FormData();
  //   let file1 = document.querySelector("#input").files[0];

  //   formdata.append("files", file1);
  //   axios({
  //     url: "http://localhost:6000/file/saveAvatar",
  //     method: "post",
  //     headers: { "Content-Type": "multipart/form-data" },
  //     data: formdata,
  //   })
  //     .then((res) => {
  //       if (res.data.error_code === 1) {
  //         alert(res.data.msg);
  //       } else {
  //         alert("上传头像成功");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  // "proxy": "http://localhost:6000",
  function saveAvatar() {
    // axios.defaults.withCredentials = true;
    let formdata = new FormData();
    let file1 = document.querySelector("#input").files[0];
    formdata.append("smfile", file1);
    axios.post("https://sm.ms/api/v2/upload" , formdata)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function review() {
    // console.log(obj.files[0]);
    let file = document.querySelector("#input").files[0];
    // console.log(file);
    // var file = obj.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (ev) {
      // console.log(ev.target.result);
      document
        .querySelector("#reviewImg")
        .setAttribute("src", ev.target.result);
    };
    //  setComponentSize(34);
  }
  return (
    <div className="register">
      <div className="editAvatar">
        <img id="reviewImg" src="D:\computerLearnSource\graduateDesign\the recommendation of healthy food\websecond\src\pages\register\defaultAvatar.jpg" alt="点我改头像" />
        <input type="file" id="input" onChange={review}></input>
        <button onClick={saveAvatar}>确认修改头像</button>
      </div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="用户名">
          <Input />
        </Form.Item>
        <Form.Item label="密码">
          <Input />
        </Form.Item>
        <Form.Item label="身高（以厘米为单位）">
          <Input />
        </Form.Item>
        <Form.Item label="体重（以公斤千克为单位）">
          <Input />
        </Form.Item>
        <Form.Item label="运动量">
          <Select>
            <Select.Option value="demo">
              轻体力劳动者：75%时间坐或站立，25%时间站着活动，如从事办公室工作、修理电器、售货员等。
            </Select.Option>
            <Select.Option value="demo">
              中体力劳动者：25%时间坐或站立，75%时间特殊职业活动，如学生日常生活、机动车驾驶员、电工、安装人员、车床操作者、从事金属切割的人员等。
            </Select.Option>
            <Select.Option value="demo">
              重体力劳动者：40%时间坐或站立，60%时间特殊职业活动，如从事非机械化农业劳动，炼钢、舞蹈、体育活动、装卸、采矿等。
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
      {/* <img src="../defaultAvatar.jpg" alt="" /> */}
    </div>
  );
}
