import { Button, Col, Form, Input, notification, Row } from "antd";
import logo from "../../assets/images/onex_logo_open.svg";
import background from "../../assets/images/login-background.png";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../hooks/sign-in/useAuth";
import { auth } from "../../services/auth";

export default function SignIn() {
  const [api, contextHolder] = notification.useNotification();
  const { setLoading, setAuth, setUser } = useContext(AuthContext);
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: auth.login,
    onSuccess: ({ data }) => {
      localStorage.setItem("token", data?.token);
      localStorage.setItem(
        "permissions",
        JSON.stringify(data?.user?.role?.[0]?.permissions)
      );
      localStorage.setItem("user", JSON.stringify(data?.user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${data?.token}`;
      setAuth(true);
      setUser(data?.user);
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
      api.error({
        message: "Error !",
        description: "Email or Password is incorrect!",
        placement: "topRight",
      });
    },
  });
  return (
    <>
      {contextHolder}
      <Row>
        <Col lg={10} className="bg-white">
          <div className="flex flex-col  justify-center h-[100vh] px-[80px]">
            <img
              className="mb-[160px]"
              src={logo}
              alt=""
              style={{ width: 150 }}
            />
            <Form
              name="login-form"
              onFinish={(values) => {
                setLoading(true);
                mutate(values);
              }}
              layout="vertical"
            >
              <h1 className="text-green-500 text-[20px] ">
                Log in to your account
              </h1>
              <h2 className="text-black text-[30px] font-[500] my-[24px]">
                Please enter your details.
              </h2>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter your email" className="p-[11px]" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                  {
                    min: 8,
                    message: "Minimum 8 characters",
                  },
                ]}
                label="Password"
              >
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="p-[11px]"
                />
              </Form.Item>

              <Button
                htmlType="submit"
                type="primary"
                className="mb-[16px] h-[35px] w-full"
              >
                Sign in
              </Button>
            </Form>
          </div>
        </Col>
        <Col lg={14}>
          <div
            className="w-full h-[100vh]"
            style={{ backgroundImage: `url(${background})` }}
          ></div>
        </Col>
      </Row>
    </>
  );
}
