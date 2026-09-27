"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

type AuthForm = "login" | "signup" | "recovery";

type FormMessage = {
  text: string;
  tone: "error" | "success";
};

export default function LoginPage() {
  const router = useRouter();
  const [activeForm, setActiveForm] = useState<AuthForm>("login");
  const [loginMessage, setLoginMessage] = useState<FormMessage | null>(null);
  const [signupMessage, setSignupMessage] = useState<FormMessage | null>(null);
  const [recoveryMessage, setRecoveryMessage] = useState<FormMessage | null>(
    null,
  );
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!redirecting) return;

    const timeoutId = window.setTimeout(() => router.push("/dashboard"), 700);
    return () => window.clearTimeout(timeoutId);
  }, [redirecting, router]);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginMessage({
      text: "AUTHENTICATION ACCEPTED...",
      tone: "success",
    });
    setRedirecting(true);
  }

  function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmation = formData.get("confirm");

    if (password !== confirmation) {
      setSignupMessage({
        text: "ERROR: ACCESS KEYS DO NOT MATCH.",
        tone: "error",
      });
      return;
    }

    setSignupMessage({
      text: "OPERATOR ACCOUNT CREATED.",
      tone: "success",
    });
  }

  function handleRecovery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRecoveryMessage({
      text: "RESET REQUEST QUEUED. CHECK REGISTERED CONTACT.",
      tone: "success",
    });
  }

  function switchForm(form: AuthForm) {
    setActiveForm(form);
    setLoginMessage(null);
    setSignupMessage(null);
    setRecoveryMessage(null);
  }

  return (
    <>
      <div className="crt-overlay" aria-hidden="true" />
      <main className="login-page">
        <div className="login-container">
          <section className="login-info">
            <div className="brand-large">
              <div className="brand-mark">
                <Image
                  src="/assets/logo.svg"
                  alt="FumeTrix air quality mark"
                  width={58}
                  height={58}
                  priority
                />
              </div>
              <div>
                <h1>FumeTrix</h1>
                <span>AIR QUALITY GUARD</span>
              </div>
            </div>

            <div className="system-description">
              <p className="terminal-label">WORKSTATION MONITORING SYSTEM</p>
              <h2>
                SOLDER FUME
                <br />
                EXPOSURE CONTROL
              </h2>
              <p>
                Real-time monitoring of particulate matter, VOC concentration,
                temperature, and extractor airflow performance.
              </p>
            </div>

            <div className="system-check">
              <div className="check-title">SYSTEM INITIALIZATION</div>
              {["PM2.5 SENSOR", "VOC SENSOR", "TEMPERATURE", "AIRFLOW"].map(
                (sensor) => (
                  <div className="check-row" key={sensor}>
                    <span>{sensor}</span>
                    <strong className="online">ONLINE</strong>
                  </div>
                ),
              )}
            </div>
          </section>

          <section className="login-panel" aria-label="System access">
            <div className="panel-header">
              <span>SYSTEM ACCESS</span>
              <span>FMX-01</span>
            </div>

            <div className="login-tabs" role="tablist" aria-label="Account">
              <button
                className={`login-tab${activeForm === "login" ? " active" : ""}`}
                type="button"
                role="tab"
                aria-selected={activeForm === "login"}
                onClick={() => switchForm("login")}
              >
                LOGIN
              </button>
              <button
                className={`login-tab${activeForm === "signup" ? " active" : ""}`}
                type="button"
                role="tab"
                aria-selected={activeForm === "signup"}
                onClick={() => switchForm("signup")}
              >
                SIGN UP
              </button>
            </div>

            <form
              className={`auth-form${activeForm === "login" ? "" : " hidden"}`}
              onSubmit={handleLogin}
            >
              <label htmlFor="loginUsername">OPERATOR ID</label>
              <input
                id="loginUsername"
                name="username"
                type="text"
                placeholder="ENTER OPERATOR ID"
                autoComplete="username"
                required
              />
              <label htmlFor="loginPassword">ACCESS KEY</label>
              <input
                id="loginPassword"
                name="password"
                type="password"
                placeholder="ENTER ACCESS KEY"
                autoComplete="current-password"
                required
              />
              <button className="industrial-button" type="submit">
                ENTER SYSTEM
              </button>
              <p
                className={`form-message${loginMessage ? ` ${loginMessage.tone}` : ""}`}
                aria-live="polite"
              >
                {loginMessage?.text}
              </p>
              <button
                className="text-button"
                type="button"
                onClick={() => switchForm("recovery")}
              >
                FORGOT ACCESS KEY?
              </button>
            </form>

            <form
              className={`auth-form${activeForm === "signup" ? "" : " hidden"}`}
              onSubmit={handleSignup}
            >
              <label htmlFor="signupUsername">OPERATOR ID</label>
              <input
                id="signupUsername"
                name="username"
                type="text"
                placeholder="CREATE OPERATOR ID"
                autoComplete="username"
                required
              />
              <label htmlFor="signupPassword">ACCESS KEY</label>
              <input
                id="signupPassword"
                name="password"
                type="password"
                placeholder="CREATE ACCESS KEY"
                autoComplete="new-password"
                required
              />
              <label htmlFor="signupConfirm">CONFIRM ACCESS KEY</label>
              <input
                id="signupConfirm"
                name="confirm"
                type="password"
                placeholder="CONFIRM ACCESS KEY"
                autoComplete="new-password"
                required
              />
              <button className="industrial-button" type="submit">
                CREATE ACCOUNT
              </button>
              <p
                className={`form-message${signupMessage ? ` ${signupMessage.tone}` : ""}`}
                aria-live="polite"
              >
                {signupMessage?.text}
              </p>
            </form>

            <form
              className={`auth-form${activeForm === "recovery" ? "" : " hidden"}`}
              onSubmit={handleRecovery}
            >
              <div className="form-heading">
                <strong>ACCESS KEY RECOVERY</strong>
                <span>IDENTITY VERIFICATION REQUIRED</span>
              </div>
              <label htmlFor="recoveryUsername">OPERATOR ID</label>
              <input
                id="recoveryUsername"
                name="username"
                type="text"
                placeholder="ENTER OPERATOR ID"
                required
              />
              <label htmlFor="recoveryContact">REGISTERED CONTACT</label>
              <input
                id="recoveryContact"
                name="contact"
                type="email"
                placeholder="ENTER EMAIL ADDRESS"
                autoComplete="email"
                required
              />
              <button className="industrial-button" type="submit">
                REQUEST RESET LINK
              </button>
              <p
                className={`form-message${recoveryMessage ? ` ${recoveryMessage.tone}` : ""}`}
                aria-live="polite"
              >
                {recoveryMessage?.text}
              </p>
              <button
                className="text-button"
                type="button"
                onClick={() => switchForm("login")}
              >
                RETURN TO LOGIN
              </button>
            </form>

            <div className="login-footer">
              <span>SYSTEM STATUS</span>
              <span className="status-indicator">
                <i aria-hidden="true" /> READY
              </span>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
