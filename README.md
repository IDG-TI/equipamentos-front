# Sumário

- [Running](#running)
- [Descrição](#descrição)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Funcionalidades Propostas](#funcionalidades-propostas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Dependências](#dependências)

# Running

- **Link do Repositório:** [https://github.com/IDG-TI/apontamento-front](https://github.com/IDG-TI/apontamento-front)

Para executar o projeto em um ambiente de desenvolvimento, siga os passos abaixo:

1. Navegue até a pasta raiz do projeto.
2. Execute os comandos:

```bash
npm install
npm run dev
```

<!-- Link da aplicação em ambiente de produção: http://gestao-projetos-dev.id.eng.br/ -->

# Descrição

**Apontamento de Horas** é um sistema interno desenvolvido para a **IDG Engenharia e Consultoria** com o objetivo de controlar a apropriação de horas dos colaboradores, além de oferecer funcionalidades adicionais relacionadas ao gerenciamento de horas trabalhadas. De forma geral, o **Apontamento de Horas** traz novamente funcionalidades já presentes no **apontamento.info**, trazendo atualizações e melhorias em determinadas regras de negócios, bem como um visual atualizado e a utilização de tecnologias modernas.

# Estrutura de Pastas

A estrutura de pastas da aplicação **Apontamento de Horas** segue o padrão **Atomic Design**, que organiza os componentes de uma aplicação **React.js** em diferentes níveis de abstração, conforme a complexidade dos componentes:

- **Átomos:** Componentes básicos e indivisíveis, como botões, inputs, labels, etc.
- **Moléculas:** Componentes compostos por átomos, como formulários e modais.
- **Organismos:** Componentes mais complexos, formados por moléculas e átomos, que representam seções da aplicação.
- **Páginas:** Representam as páginas da aplicação, compostas por organismos, moléculas e átomos. Em aplicações **SPA (Single Page Application)**, as páginas são carregadas dinamicamente, sem a necessidade de recarregar toda a aplicação.

Abaixo, a estrutura de diretórios detalhada da aplicação:

```
- components/                # Componentes da aplicação
    - atoms/                 # Componentes atômicos, nível mais básico
    - molecules/             # Componentes moleculares, compostos por átomos
        - modal/             # Componentes modais da aplicação
    - organisms/             # Componentes orgânicos, compostos por moléculas e átomos
    - pages/                 # Componentes de nível de página, maior nível hierárquico
    - func/                  # Funções reutilizáveis

- cypress/                   # Testes de integração E2E
- hooks/                     # Hooks customizados
- infra/                     # Arquivos de deployment e serviços
- public/                    # Arquivos públicos (imagens, SVG, ícones)
- src/                       # Diretório principal da aplicação
    - app/                   # Arquivos raiz da aplicação
    - assets/                # Arquivos de assets (ícones, imagens)
    - pages/                 # Rotas da aplicação
        - api/               # APIs internas para chamadas server-side no Next.js
    - styles/                # Módulos CSS
```

![atomic-design](public/atomic-design.png)

# Funcionalidades Propostas

O sistema **Apontamento de Horas** oferece uma gama de funcionalidades para facilitar o gerenciamento e controle de horas trabalhadas pelos colaboradores. As principais funcionalidades propostas incluem:

- **Cadastro e Consulta de Apontamento de Horas:** Permite o registro e a visualização das horas trabalhadas pelos colaboradores.
  
- **Cadastro de Registro Extraordinário:** Funcionalidade para registrar horas extraordinárias, como horas extras e trabalho em feriados.

- **Gerenciamento de Colaboradores:** Administração dos dados dos colaboradores, incluindo atribuição de funções e permissões.

- **Rateio Fixo:** Configuração de rateio de horas ou custos fixos entre diferentes projetos ou centros de custo.

- **Solicitação de Aprovação:** Sistema para envio de solicitações de aprovação de horas registradas pelos colaboradores.

- **Aprovação:** Ferramenta para gestores revisarem e aprovarem ou rejeitarem as horas trabalhadas registradas.

- **Medição de Terceiros:** Controle e registro das horas trabalhadas por terceiros, permitindo a gestão integrada de equipes externas.

- **IMRM (Importar Medição para o RM):** Funcionalidade para substituir o atual painel do IMRM.

- **Relatório Geral:** Geração de relatórios consolidados de horas trabalhadas, aprovações, rateios e outros dados relevantes.

- **Painel de Gestor:** Interface personalizada para gestores, oferecendo uma visão abrangente das atividades e relatórios relacionados aos colaboradores sob sua supervisão.

- **Configurações de Admin:** Painel administrativo para configurar parâmetros globais do sistema, gerenciar acessos e definir políticas de uso.

# Tecnologias Utilizadas

A aplicação foi desenvolvida utilizando as seguintes tecnologias:

- **[HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML/HTML5):** Estruturação de conteúdo.
- **[CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS):** Estilização de componentes.
- **[JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript):** Lógica de programação do frontend.
- **[Node.js](https://nodejs.org/en/):** Ambiente de execução para JavaScript no backend.
- **[TypeScript](https://www.typescriptlang.org/):** Superset de JavaScript com tipagem estática.
- **[React](https://pt-br.reactjs.org/) 18:** Biblioteca para construção de interfaces de usuário.
- **[Next.js](https://nextjs.org/) 14:** Framework React para desenvolvimento de aplicações web com renderização do lado do servidor (SSR).

# Dependências

Abaixo estão listadas as principais dependências utilizadas no projeto:

- **[React Toastify](https://fkhadra.github.io/react-toastify/introduction/):** Biblioteca para notificações toast no React.
- **[Tanstack Table](https://tanstack.com/table/v8):** Biblioteca para criação e gerenciamento de tabelas.
- **[Cypress](https://www.cypress.io/):** Framework para testes E2E.
- **[Cypress-dotenv](https://www.npmjs.com/package/cypress-dotenv):** Plugin para uso de variáveis de ambiente no Cypress.
- **[Cypress-RealEvents](https://www.npmjs.com/package/cypress-real-events):** Plugin para simulação de eventos reais no Cypress.
- **[Cookies](https://www.npmjs.com/package/cookies):** Manipulação de cookies no Node.js.
- **[Nookies](https://www.npmjs.com/package/nookies):** Biblioteca para manipulação de cookies em aplicações Next.js.
- **[Recharts](https://recharts.org/en-US/):** Biblioteca de gráficos para React.

---
