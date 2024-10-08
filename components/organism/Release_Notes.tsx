export const CURRENT_VERSION = "1.0.0";
import ReleaseNotesSection from "@molecules/Release_Notes_Section";
import ReleaseStyle from "@styles/release_notes.module.css";


export function ReleaseNotes() {
    return <div className={ReleaseStyle.container}>
        <h1 className={ReleaseStyle["container-title"]}>Notas da versão {CURRENT_VERSION}</h1>
        <p className={ReleaseStyle["introduction"]}>
            &#128075; Olá a todos! Estamos animados em anunciar o lançamento da versão 1.0 do nosso Sistema de Apontamento de Horas! Esta versão traz uma série de novos recursos e melhorias destinadas a facilitar o acompanhamento e registro preciso das horas trabalhadas. Abaixo estão os destaques:
        </p>
        <ReleaseNotesSection title="&#128204; Funcionalidades Novas"
            options={[
                {
                    name: "Notificações",
                    details: "Eventos no sistema irão gerar notificações, auxiliando na gestão e controle de horas dos gestores e colaboradores"
                },
                {
                    name: "Dashboards",
                    details: "Para o RH, será possível gerar dashboards dos apontamentos de horas, agrupando por seção, valor, projeto e por competência",
                },
                {
                    name: "Painel de Administrador",
                    details: "Usuário com esta permissão consegue controlar o limite de horas apontadas, limite de atraso no apontamento e outras configurações"
                },
                {
                    name: "Importar para o RM",
                    details: "Para colaboradores do administrativo, a funcionalidade IMRM será incorporada em uma tela atualizada. Nesta funcionalidade, o usuário poderá marcar uma medição como 'pronta para subir'. Dessa forma, quando o usuário clicar no botão importar em lote, todas as medições irão subir para o RM de forma automática e com os rateios feitos automaticamente"
                }
            ]}
        />

        <ReleaseNotesSection title="&#128204; Funcionalidades Removidas"
            options={[
                {
                    name: "Regra de aprovação",
                    details: "Essa funcionalidade foi incoporada no RM"
                },
                {
                    name: "Apontamento individual"
                },
            ]}
        />
        <ReleaseNotesSection title="&#x1F4AC; Considerações"
            options={[
                {
                    name: "Possíveis erros",
                    details: "O sistema foi testado e validado por usuários de teste, porém podem ocorrer erros que não estamos esperando. Qualquer inconsistência, reporte ao seu gestor, para que ele contate a equipe de desenvolvimento"
                },
                {
                    name: "Apontamentos com hora de entrada e saída",
                    details: "Esta funcionalidade precisa que a seção tenha sido marcada como do tipo de jornada específica, no sistema de gestão de projetos, se o seu apontamento precisa definir esses dados, contate ao seu gestor para que essa alteração seja feita no sistema."
                }
            ]}
        />
    </div >
}