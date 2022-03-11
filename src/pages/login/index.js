import style from "./style.less";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
// const style = require("./style.less");

export default function Login() {
  // console.log(style.login_form);
  const [userName, setUserName] = useState("");
  const [userPsd, setUserPsd] = useState("");
  function login() {
    // 使网页存储cookie
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:6000/api/users/login", {
        userName,
        userPsd,
      })
      .then((res) => {
        if (res.data.error_code === 1) {
          alert(res.data.msg);
        }
        // if (res.status === 201) {
        //   alert("恭喜成功登录！");
        // } else {
        //   alert("密码错误或用户名不存在请重新输入");
        // }
        console.log(res);
      })
      .catch((err) => console.log("Couldn't fetch data. Error: " + err));
  }
  return (
    <div>
      <img src="../../../public/dafaultAvatar.jpg" alt="" />
      <Form
        name="normal_login"
        className="login_form"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "请输入用户名！",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site_form_item_icon" />}
            placeholder="用户名"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site_form_item_icon" />}
            type="password"
            placeholder="密码"
            onChange={(e) => {
              setUserPsd(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login_form_button"
            onClick={login}
          >
            登录
          </Button>
          Or <a href="/register">去注册</a>
        </Form.Item>
      </Form>
    </div>
  );
}
