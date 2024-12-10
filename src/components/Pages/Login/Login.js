import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/authApi";
import { toast } from "react-toastify";
import { AppPaths } from "../../../constants/appPaths";
import { forgotPassword } from "../../../api/forgotPasswordApi";
import { resetPassword } from "../../../api/resetPasswordApi";
import { useTranslation } from "react-i18next";
import "./style.scss";

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [token, setToken] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate(AppPaths.dashboard);
    }
    // eslint-disable-next-line
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error(t("login.pleaseEnterEmailAndPassword"));
      return;
    }
    setLoading(true);
    try {
      await login(email, password, dispatch);
      navigate(AppPaths.dashboard);
    } catch (err) {
      toast.error(t("login.invalidEmailOrPassword"));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      toast.error(t("login.pleaseEnterEmailAddress"));
      return;
    }

    try {
      await forgotPassword(forgotPasswordEmail);
      toast.success(t("login.pleaseCheckYourEmail"));
      setForgotPasswordEmail("");
      setShowForgotPassword(false);
      toast.info(t("login.checkYourEmailForResetLink"));
      setToken("123456");
      setEmail(forgotPasswordEmail);
      setShowForgotPassword(true);
    } catch (error) {
      toast.error(error.message || t("login.invalidEmailOrPassword"));
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email || !token || !password || !password_confirmation) {
      toast.error(t("login.pleaseEnterEmailAndPassword"));
      return;
    }
    if (password !== password_confirmation) {
      toast.error(t("login.passwordsDoNotMatch"));
      return;
    }
    setLoading(true);

    try {
      await resetPassword(email, token, password, password_confirmation);
      toast.success(t("login.passwordResetSuccess"));
      setShowForgotPassword(false);
    } catch (error) {
      toast.error(error.message || t("login.invalidEmailOrPassword"));
    } finally {
      setLoading(false);
    }
  };

  const formTitle =
    showForgotPassword && !token
      ? t("login.forgotPassword")
      : showForgotPassword && token
        ? t("login.resetPassword")
        : t("login.welcome");

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url('/assets/images/auth-bg.jpg')` }}
    >
      <div className="login-card">
        <div className="login-form">
          <div className="form-content">
            <div className="form-header">
              <h4 className="form-subtitle">{formTitle}</h4>
              <h1 className="form-title">
                {formTitle === t("login.welcome")
                  ? t("login.loginWithEmail")
                  : formTitle === t("login.forgotPassword")
                    ? t("login.enterEmailForReset")
                    : t("login.enterResetTokenAndNewPassword")}
              </h1>
            </div>
            <div className="form-body">
              {!showForgotPassword ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>{t("login.enterEmail")}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("login.enterEmail")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>{t("login.enterPassword")}</Form.Label>
                    <div className="password-input-container">
                      <Form.Control
                        type={passwordVisible ? "text" : "password"}
                        placeholder={t("login.enterPassword")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div
                        className="password-toggle-icon"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      label={t("login.keepMeLoggedIn")}
                      checked={keepLoggedIn}
                      onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    />
                    <div className="forgot-password-link">
                      <a href="#" onClick={() => setShowForgotPassword(true)}>
                        {t("login.forgotPasswordLink")}
                      </a>
                    </div>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    className="submit-button w-100"
                    disabled={loading}
                  >
                    <span>
                      {loading ? t("login.loggingIn") : t("login.loginButton")}
                    </span>
                    <FaArrowRight />
                  </Button>
                </Form>
              ) : showForgotPassword && !token ? (
                <Form>
                  <Form.Group className="mb-3" controlId="forgotPasswordEmail">
                    <Form.Label>{t("login.enterEmail")}</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder={t("login.enterEmail")}
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={handleForgotPassword}
                  >
                    {t("login.sendResetLink")}
                  </Button>
                </Form>
              ) : (
                <Form>
                  <Form.Group className="mb-3" controlId="resetEmail">
                    <Form.Label>{t("login.enterEmail")}</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder={t("login.enterEmail")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="resetToken">
                    <Form.Label>
                      {t("login.enterResetTokenAndNewPassword")}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("login.enterResetTokenAndNewPassword")}
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="newPassword">
                    <Form.Label>{t("login.newPassword")}</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder={t("login.newPassword")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>{t("login.confirmNewPassword")}</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder={t("login.confirmNewPassword")}
                      value={password_confirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={handleResetPassword}
                  >
                    {t("login.resetPasswordButton")}
                  </Button>
                </Form>
              )}
            </div>
          </div>
        </div>
        <div
          className="login-image"
          style={{
            backgroundImage: `url('/assets/images/login.png')`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
