import RelatorioStyle from "@styles/relatorio.module.css";


const getGroup = (options: string[]) => {
    const size = options.length;
    switch (size) {
        case 0:
            return null;
        case 1:
            return <li className={RelatorioStyle["recursive-grouper"]}>{options[0]}</li>;
        default:
            let firstElement = options[0];
            return <li className={RelatorioStyle["recursive-grouper"]}>
                <li className={RelatorioStyle["recursive-list-item"]} >{firstElement}</li>
                <ul className={RelatorioStyle["recursive-list"]}>{getGroup(options.slice(1))}</ul>
            </li>;
    }
}
export default function FilterTabRecursiveView({ options }) {

    return (
        <ul>
            {getGroup(options)}
        </ul>
    )
}