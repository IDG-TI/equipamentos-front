
import NotFoundStyle from "@styles/notfound.module.css";

const Custom404 = () => {

    return (
        <div className={NotFoundStyle["notfound-container"]}>
            <img src="blogo.png" alt="logo idg" className={NotFoundStyle["notfound-logo"]} />
            <div>
                <h1 className={NotFoundStyle["notfound"]}>Oops!</h1>
                <p className={NotFoundStyle["notfound-paragraph"]}>Desculpe, a página que você está procurando não foi encontrada.</p>
                <p className={NotFoundStyle["notfound-paragraph"]}>
                    Volte para <a href="/">a página inicial</a> ou entre em contato conosco.
                </p>

                <p className={NotFoundStyle["notfound-paragraph"]}>Aqui estão alguns links úteis:</p>
                <ul className={NotFoundStyle["notfound-util-links"]}>
                    <li>
                        <a href="http://apontamento.info">Apontamento</a>
                    </li>
                    <li>
                        <a href="http://gestao-projetos.info">Sistema de Projetos</a>
                    </li>
                    <li>
                        <a href="http://intranet.info">Intranet</a>
                    </li>
                </ul>
            </div>
            <footer className={NotFoundStyle["notfound-footer"]}>
                Nos contate em<a href="mailto:ti@idg-eng.com">ti@idg-eng.com</a>
            </footer>
        </div>
    );
};

export default Custom404;