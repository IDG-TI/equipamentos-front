import RelatorioStyle from "@styles/relatorio.module.css";


const getGroup = (options: string[]) => {
    const size = options.length;
    switch (size) {
        case 0:
            return null;
        case 1:
            return <li data-cy="recursiveViewFirstItem" className={RelatorioStyle["recursive-grouper"]}>{options[0]}</li>;
        default:
            let firstElement = options[0];
            return <ul data-cy="recursiveViewInnerUl" className={RelatorioStyle["recursive-grouper"]}>
                <li data-cy="recursiveViewInnerLi" className={RelatorioStyle["recursive-list-item"]} >{firstElement}</li>
                <ul data-cy="recursiveViewInnerUl" className={RelatorioStyle["recursive-list"]}>{getGroup(options.slice(1))}</ul>
            </ul>;
    }
}
export default function FilterTabRecursiveView({ options, componentDatacy }) {

    return (
        <ul data-cy={componentDatacy}>
            {getGroup(options)}
        </ul>
    )
}