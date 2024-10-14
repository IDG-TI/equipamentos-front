"use client";

import setUserName from "@util/set_user_name";
import Header from "@molecules/Header";
import HeaderNavbar from "@molecules/Header_Navbar";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserSession from "@hooks/useUserSession";
import ModalSessionInactive from "@molecules/modal/entity/Modal_Session_Inactive";
import showWarningToast from "@toasts/warning_toast";

export default function Application({
  roles,
  module,
  userAlreadyViewedReleaseNotes,
}) {
  const { isSessionCloseToFinish } = useUserSession();
  const [name, setName] = useState<any>(false);

  useEffect(function setUserNameInHeader() {
    setUserName(setName);
  }, []);

  return (
    <>
      <Header name={name} module={module} />
      <HeaderNavbar
        roles={roles}
        userAlreadyViewedReleaseNotes={userAlreadyViewedReleaseNotes}
      />
      <ToastContainer />
      {isSessionCloseToFinish && <ModalSessionInactive />}
    </>
  );
}
