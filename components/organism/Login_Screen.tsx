"use client";

import { useState, useEffect } from "react";
import LoginStyle from "@styles/login.module.css";
import inputStyle from "@styles/inputs.module.css";
import InputLogin from "@atoms/Input_Login";
import signIn from "@util/sign_In";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginScreen() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showUserPassword, setShowUserPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  function moveBackground(event: any) {
    const sensitivity = 20;
    const { clientX, clientY } = event;
    setX((clientX / window.innerWidth) * sensitivity);
    setY((clientY / window.innerHeight) * sensitivity);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    setIsLoading(true);
    await signIn(userId, userPassword);
    setIsLoading(false);
  }

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <>
      <div
        className={`${LoginStyle["container-loginscreen"]}`}
        onMouseMove={moveBackground}
        style={{ backgroundPosition: `${x}% ${y}%` }}
      >
        <div className={LoginStyle["molecule-login"]}>
          <picture className={LoginStyle["container-loginscreen-picture"]}>
            <img src="logo.png" className={LoginStyle["loginscreen-picture"]} />
          </picture>

          <form
            onSubmit={handleSubmit}
            className={LoginStyle["loginscreen-form"]}
          >
            <InputLogin
              name="user"
              datacy="userId"
              type="text"
              placeholder="ID de Rede"
              stateValue={userId}
              setStateValue={setUserId}
              icon={
                <svg
                  className={inputStyle["loginscreen-svgicon"]}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
              }
              maxLength={7}
            />

            <InputLogin
              name="password"
              datacy="userPassword"
              type={showUserPassword ? "text" : "password"}
              placeholder="Senha de Rede"
              stateValue={userPassword}
              setStateValue={setUserPassword}
              handleSvgClick={(): any => setShowUserPassword(!showUserPassword)}
              icon={
                showUserPassword ? (
                  <svg
                    className={`${inputStyle["loginscreen-svgicon"]} ${inputStyle["loginscreen-svgicon--lock"]}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z" />
                  </svg>
                ) : (
                  <svg
                    className={`${inputStyle["loginscreen-svgicon"]} ${inputStyle["loginscreen-svgicon--lock"]}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                  </svg>
                )
              }
            />

            <button
              name="submitLogin"
              data-cy="submitLogin"
              type="submit"
              disabled={isLoading}
              className={LoginStyle["loginscreen-button"]}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>

      {isLoading ? (
        <div className={`${LoginStyle["loading-loader-container"]}`}>
          <span className={LoginStyle["loading-loader"]}></span>
        </div>
      ) : null}

      <ToastContainer />
    </>
  );
}
