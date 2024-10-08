"use client";

import logout from "@util/logout";
import HeaderStyle from "@styles/header.module.css";
import TabStyle from "@styles/tabs.module.css";
import { Badge } from "@mui/material";
import { useEffect, useState } from "react";
import ApiApontamento from "@apis/api_apontamento";
import Skeleton from "@components/atoms/Skeleton";
import useModal from "@hooks/useModal";
import ModalLogout from "@molecules/modal/entity/Modal_Logout";

export default function Header({ name, module }: any) {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(false);
  const [deletedNotifications, setDeletedNotifications] = useState({});
  const modalLogout = useModal();

  const [modules, setModules] = useState<any>([]);
  const [selectedModule, setSelectedModule] = useState(module);

  useEffect(function loadModules() {
    ApiApontamento.request({
      path: "permission",
      method: "GET",
      onSuccess: (resp) => {
        setModules(resp.content);
      },
      actionName: "Listar",
    });
  }, []);

  useEffect(function loadNotificationsAndSetIntervalToReloadNotifications() {
    function loadNotifcations() {
      ApiApontamento.request({
        path: "notification",
        method: "GET",
        onSuccess: (resp) => {
          if (resp) {
            setNotifications(resp);
          }
        },
        showToastOnError: false,
        actionName: "Listar",
        name: "Notificações",
      });
    }
    const notificationInterval = setInterval(() => {
      loadNotifcations();
    }, 10000);
    return () => clearInterval(notificationInterval);
  }, []);

  function markAsViewed(id: number) {
    if (
      notifications.filter((item: any) => item.id === id && !item.viewed)
        .length > 0
    ) {
      ApiApontamento.request({
        path: `notification/${id}`,
        method: "PATCH",
        onSuccess: () => {
          setNotifications((prevNotificacoes: any) =>
            prevNotificacoes.map((item: any) =>
              item.id === id ? { ...item, viewed: true } : item
            )
          );
        },
        actionName: "Atualizar",
        name: "Notificação",
        disableSuccessToast: true,
      });
    }
  }

  function markAllAsViewed() {
    ApiApontamento.request({
      path: `notification`,
      method: "PATCH",
      onSuccess: () => {
        setNotifications((prevNotificacoes: any) =>
          prevNotificacoes.map((item: any) => ({ ...item, viewed: true }))
        );
      },
      actionName: "Atualizar",
      name: "Notificações",
    });
  }

  function deleteNotification(id: number) {
    ApiApontamento.request({
      path: `notification/${id}`,
      method: "DELETE",
      onSuccess: () => {
        setDeletedNotifications((prevDeletedNotifications: any) => ({
          ...prevDeletedNotifications,
          [id]: true,
        }));
        setTimeout(() => {
          setNotifications((prevNotificacoes: any) =>
            prevNotificacoes.filter((item: any) => item.id !== id)
          );
          setDeletedNotifications((prevDeletedNotifications: any) => ({
            ...prevDeletedNotifications,
            [id]: false,
          }));
        }, 500);
      },
      actionName: "Atualizar",
      name: "Notificação",
    });
  }

  function deleteAllNotifications() {
    ApiApontamento.request({
      path: `notification`,
      method: "DELETE",
      onSuccess: () => {
        notifications.forEach((item: any, index: number) => {
          setDeletedNotifications((prevDeletedNotifications: any) => ({
            ...prevDeletedNotifications,
            [item.id]: true,
          }));
          setTimeout(() => {
            setNotifications([]);
          }, 500);
        });
      },
      actionName: "Atualizar",
      name: "Notificações",
    });
  }

  const userAvatar = name ? (
    name + (module !== "USER" ? ` | ${module}` : "")
  ) : (
    <Skeleton width={200} height={20} />
  );

  function changeUserModule(modulo: string) {
    // ApiApontamento.update("permission", { module: modulo }, (modulo) => setSelectedModule(modulo.module))
    ApiApontamento.request({
      path: "permission/update",
      method: "PUT",
      body: { module: modulo },
      onSuccess: (modulo) => setSelectedModule(modulo.module),
      actionName: "Atualizar",
      name: "Módulo",
    });
    location.reload();
  }

  return (
    <>
      <header className={HeaderStyle["header"]}>
        <div className={HeaderStyle["header-content-container"]}>
          <div className={HeaderStyle["header-logo-container"]}>
            <picture>
              <img
                className={HeaderStyle["header-logo-img"]}
                src="logoIDG.png"
              />
            </picture>
            <h1 className={HeaderStyle["header-h1"]}>Equipamentos</h1>
          </div>
          <div className={HeaderStyle["header-user-container"]}>
            <span className={HeaderStyle["header-userName"]}>
              {userAvatar} |{" "}
              {
                <select
                  value={selectedModule}
                  onChange={(e) => changeUserModule(e.target.value)}
                >
                  {modules.map((modulo: any, index: number) => (
                    <option key={index} title={modulo.descricao}>
                      {modulo.nome}
                    </option>
                  ))}
                </select>
              }
            </span>

            <div className={HeaderStyle["header-notification-conteiner"]}>
              <Badge
                badgeContent={
                  notifications.filter((item: any) => !item.viewed).length
                }
                color="error"
              >
                <svg
                  className={`${HeaderStyle["header-svg-notification"]} ${
                    newNotification
                      ? HeaderStyle["header-svg-notification--shake"]
                      : null
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                </svg>
              </Badge>

              <div className={HeaderStyle["dropdown-notification-container"]}>
                <ul className={HeaderStyle["dropdown-notification-content"]}>
                  <div className={HeaderStyle["notification-header"]}>
                    <span
                      className={HeaderStyle["notification-header-item"]}
                      onClick={() => markAllAsViewed()}
                    >
                      MARCAR COMO VISTO
                    </span>
                    <span className={HeaderStyle["notification-header-item"]}>
                      |
                    </span>
                    <span
                      className={HeaderStyle["notification-header-item"]}
                      onClick={() => deleteAllNotifications()}
                    >
                      LIMPAR NOTIFICAÇÕES
                    </span>
                  </div>
                  {notifications.length > 0 ? (
                    notifications.map((item: any, index: number) => (
                      <li key={index}>
                        <div
                          onMouseEnter={() => markAsViewed(item.id)}
                          className={`${HeaderStyle["notification"]} ${
                            item.viewed
                              ? HeaderStyle["notification--viewed"]
                              : null
                          } ${
                            deletedNotifications[item.id]
                              ? HeaderStyle["notification--deleted"]
                              : null
                          }`}
                        >
                          <div
                            className={
                              HeaderStyle["notification-title-container"]
                            }
                          >
                            <h2 className={HeaderStyle["notification-title"]}>
                              {item.type}
                            </h2>
                            <svg
                              onClick={() => deleteNotification(item.id)}
                              className={TabStyle["tab-close-svg"]}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 384 512"
                            >
                              <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                            </svg>
                          </div>
                          <p className={HeaderStyle["notification-message"]}>
                            {item.message}
                          </p>
                          <p className={HeaderStyle["notification-date"]}>
                            {item.date}
                          </p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <picture>
                      <img src="email-capture-animate.svg" alt="" />
                      <span className={HeaderStyle["emoji-container"]}>
                        SEM NOTIFICAÇÕES NO MOMENTO &#128532;
                      </span>
                    </picture>
                  )}
                </ul>
              </div>
            </div>

            <svg
              onClick={() => modalLogout.open()}
              className={HeaderStyle["header-svg-logout"]}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
          </div>
        </div>
      </header>

      <ModalLogout controller={modalLogout} />
    </>
  );
}
