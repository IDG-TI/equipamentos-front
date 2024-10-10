"use client";

import containsRole from "@util/contains_role";
import HeaderDropdown from "@molecules/Header_Dropdown";
import HeaderStyle from "@styles/header.module.css";
import { useEffect, useState } from "react";
import TabStyle from "@styles/tabs.module.css";
import Principal from "@organisms/Principal";
import { CURRENT_VERSION, ReleaseNotes } from "@organisms/Release_Notes";
import { setCookie } from "nookies";
import VerEquipamentos from "./VerEquipamentos";
import CadastrarEquipamento from "./CadastrarEquipamento";
import RegistrarEmprestimoCalibracao from "@components/organism/RegistrarEmprestimoCalibracao";
import TermosCompromisso from "./TermosCompromisso";
import VerRegistrosEmprestimosCalibracao from "./VerRegistrosEmprestimosCalibracao";
export default function HeaderNavbar({ roles, userAlreadyViewedReleaseNotes }) {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState<any>([
    {
      title: "Principal",
      component: <Principal />,
    },
  ]);

  const switchTab = (index: number) => {
    setActiveTab(index);
  };

  async function addTab(item: any) {
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].title === item.title) {
        setActiveTab(i);
        return;
      }
    }
    setTabs((prevTabs) => [...prevTabs, item]);
    setActiveTab(tabs.length);
  }

  async function closeTab(deleteIndex: number) {
    if (deleteIndex < activeTab) {
      setActiveTab(activeTab - 1);
    } else if (deleteIndex == activeTab) {
      if (tabs.length == 2) {
        setActiveTab(0);
      } else if (tabs.length > 2 && activeTab == 1) {
        setActiveTab(deleteIndex);
      } else {
        setActiveTab(deleteIndex - 1);
      }
    }
    setTabs((prevTabs: any) =>
      prevTabs.filter((e: any, i: number) => i != deleteIndex)
    );
  }

  function handleMouseDown(e: any, index: number) {
    if (e.button === 1 && index !== 0) {
      closeTab(index);
    }
  }

  const RELEASE_NOTES_TAB = {
    title: `Notas da Versão ${CURRENT_VERSION}`,
    component: <ReleaseNotes />,
    datacy: "relaseNotes",
  };

  useEffect(function openReleaseNotesIfUserNotSaw() {
    if (!userAlreadyViewedReleaseNotes) {
      setCookie(null, "user-version", CURRENT_VERSION, {
        expires: new Date("9999-12-31"),
      });
      addTab(RELEASE_NOTES_TAB);
    }
  }, []);

  return (
    <>
      <nav className={HeaderStyle["header-navbar"]}>
        <ul className={HeaderStyle["header-navbar-list"]}>
          {containsRole(roles, "GERENCIA_EQUIPAMENTOS") && ( // Role para gestão de equipamentos
            <HeaderDropdown
              name="Equipamentos"
              roles={roles}
              itens={[
                {
                  role: "VER_EQUIPAMENTOS", // Role para ver equipamentos
                  title: "Ver Equipamentos",
                  component: <VerEquipamentos />, // Altere para o componente correspondente
                  datacy: "verEquipamentos",
                },
                {
                  role: "CADASTRAR_EQUIPAMENTO", // Role para cadastrar equipamento
                  title: "Cadastrar Equipamento",
                  component: <CadastrarEquipamento />, // Altere para o componente correspondente
                  datacy: "cadastrarEquipamento",
                },
                {
                  role: "TERMOS_COMPROMISSO", // Role para acessar termos de compromisso
                  title: "Termos de Compromisso",
                  component: <TermosCompromisso />, // Altere para o componente correspondente
                  datacy: "termosCompromisso",
                },
              ]}
              addTab={addTab}
            />
          )}
          {containsRole(roles, "GERENCIA_REGISTROS") && ( // Role para gerenciar registros de empréstimos e calibrações
            <HeaderDropdown
              name="Registros"
              roles={roles}
              itens={[
                {
                  role: "VER_REGISTROS", // Role para ver registros
                  title: "Ver Registros de Empréstimos/Calibração",
                  component: <VerRegistrosEmprestimosCalibracao />, // Altere para o componente correspondente
                  datacy: "verRegistrosEmprestimosCalibracao",
                },
                {
                  role: "REGISTRAR_EMPRESTIMO_CALIBRACAO", // Role para registrar empréstimos ou calibrações
                  title: "Registrar Empréstimo ou Calibração",
                  component: <RegistrarEmprestimoCalibracao />, // Altere para o componente correspondente
                  datacy: "registrarEmprestimoCalibracao",
                },
              ]}
              addTab={addTab}
            />
          )}
        </ul>
      </nav>
      <ul className={TabStyle["tab-container"]}>
        {tabs.map((tab: any, index: number) => (
          <li onMouseDown={(e) => handleMouseDown(e, index)} key={index}>
            <div
              className={`${TabStyle["tab-item"]} ${
                index === activeTab ? TabStyle["tab-active"] : null
              }`}
            >
              <span
                className={TabStyle["tab-title"]}
                onClick={() => switchTab(index)}
              >
                {tab.title}
              </span>
              {index === 0 ? (
                ""
              ) : (
                <svg
                  onClick={() => closeTab(index)}
                  className={TabStyle["tab-close-svg"]}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                </svg>
              )}
            </div>
          </li>
        ))}
      </ul>
      {tabs.map((tab: any, index: number) => (
        <div
          key={index}
          className={
            TabStyle[index === activeTab ? "tab--revealed" : "tab--hidden"]
          }
          style={{ display: index === activeTab ? "block" : "none" }}
        >
          {tab.component}
        </div>
      ))}
    </>
  );
}
