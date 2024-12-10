import React from "react";
import { Form, Button } from "react-bootstrap";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const LoginForm = ({
    email,
    setEmail,
    password,
    setPassword,
    passwordVisible,
    setPasswordVisible,
    loading,
    handleSubmit,
    keepLoggedIn,
    setKeepLoggedIn,
    setShowForgotPassword
}) => {

    const { t } = useTranslation();
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{t("login.enterEmail")}</Form.Label>
                <Form.Control
                    type="email"
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
                    <a href="" onClick={() => setShowForgotPassword(true)}>
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
                <span>{loading ? t("login.loggingIn") : t("login.loginButton")}</span>
                <FaArrowRight />
            </Button>
        </Form>
    );
};

export default LoginForm;
