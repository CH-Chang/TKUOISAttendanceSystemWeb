import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { notification } from "antd";

import logoTkuInfoCenter from "../../assets/img/logo/logoTkuInfoCenter.svg";
import { RSAEncrypt } from "../../utils/RSAHelper";
import {
  LoginWrapper,
  PartWrapper,
  LeftWrapper,
  RightWrapper,
  Logo,
  Slogan,
  OperationWrapper,
  OperationTitleBox,
  OperationTitle,
  FormBox,
  LoginForm,
  LoginFormItem,
  IdInput,
  PasswordInput,
  SubmitInput,
  ForgotLink,
} from "./style";
import { actionCreators } from "../../store/user";

class Index extends Component {
  constructor(props) {
    super(props);
    this.validateTKUGmsEmail = this.validateTKUGmsEmail.bind(this);
    this.submitLoginForm = this.submitLoginForm.bind(this);
  }
  render() {
    return (
      <LoginWrapper>
        <PartWrapper>
          <LeftWrapper span={12}>
            <Logo src={logoTkuInfoCenter} />
            <Slogan>
              創造最吸引人的
              <br />
              <span>大學資訊化校園</span>
            </Slogan>
          </LeftWrapper>
          <RightWrapper span={12}>
            <OperationWrapper>
              <OperationTitleBox>
                <OperationTitle>
                  Login <span>登入</span>
                </OperationTitle>
              </OperationTitleBox>
              <FormBox>
                <LoginForm onFinish={this.submitLoginForm}>
                  <LoginFormItem
                    name="account"
                    validateTrigger="onBlur"
                    validateFirst={true}
                    rules={[
                      {
                        required: true,
                        message: "請輸入您的帳號",
                      },
                      {
                        type: "email",
                        message: "請輸入正確的信箱格式",
                      },
                      {
                        validator: this.validateTKUGmsEmail,
                      },
                    ]}
                  >
                    <IdInput
                      prefix={<FontAwesomeIcon icon={fas.faUser} />}
                      placeholder="請輸入帳號"
                      autocomplete="off"
                    />
                  </LoginFormItem>
                  <LoginFormItem
                    name="password"
                    validateTrigger="onBlur"
                    validateFirst={true}
                    rules={[{ required: true, message: "請輸入您的密碼" }]}
                  >
                    <PasswordInput
                      prefix={<FontAwesomeIcon icon={fas.faLock} />}
                      placeholder="請輸入密碼"
                      type="password"
                      autocomplete="off"
                    />
                  </LoginFormItem>
                  <LoginFormItem>
                    <ForgotLink to="/forgot">忘記密碼？</ForgotLink>
                  </LoginFormItem>
                  <LoginFormItem>
                    <SubmitInput
                      type="primary"
                      htmlType="submit"
                      shape="round"
                      size="large"
                    >
                      登入
                    </SubmitInput>
                  </LoginFormItem>
                </LoginForm>
              </FormBox>
            </OperationWrapper>
          </RightWrapper>
        </PartWrapper>
      </LoginWrapper>
    );
  }

  validateTKUGmsEmail = (rule, value, callback) => {
    value = value.trim();
    const domain = value.slice(value.indexOf("@") + 1);

    if (domain !== "gms.tku.edu.tw") return callback("請輸入淡江大學Gmail信箱");
    else return callback();
  };

  submitLoginForm = (values) => {
    const { login, history } = this.props;

    login(RSAEncrypt(values.account), RSAEncrypt(values.password)).then(() => {
      const { isLogin, err } = this.props;
      if (isLogin) {
        history.push("/dashboard");
      } else {
        notification.open({
          message: "錯誤提示",
          description: err,
          duration: 3,
          type: "warning",
          placement: "topRight",
        });
      }
    });
  };
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.getIn(["User", "isLogin"]),
    err: state.getIn(["User", "err"]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login(account, password) {
      return dispatch(actionCreators.login(account, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
