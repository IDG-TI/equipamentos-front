import React, { useState, useEffect, useRef, useMemo } from 'react'
import { TableModel, TableOption, PageProps } from '@types'
import TableStyle from '@styles/table.module.css'
import TabStyle from "@styles/tabs.module.css"
import { flexRender, ColumnResizeMode, getCoreRowModel, useReactTable, Cell } from '@tanstack/react-table';
import Pagination from '@molecules/Pagination'
import Loading from '@molecules/Loading'
import TableOptions from '@molecules/Table_Options';
import Skeleton from '@components/atoms/Skeleton';

const getCleanPageProps = () => ({
    data: [],
    actualPage: 0,
    totalPages: 0,
    totalElements: 0,
    numberOfElements: 0,
    loading: false,
    sortedBy: undefined
})

export default function Table<T>(
    {
        baseUrl,
        columns,
        apiFilter,
        itemsPerPage = 30,
        reloadFilter = false,
        setReloadFilter = () => null,
        loadOnOpen = true,
        options,
        multipleSelect = false,
        apiCall,
        identifier = "id",
        customSortOption,
        getCustomClass,
        loadSortOptions,
        acculumativeFields,
        hiddenCells
    }: TableModel<T>) {

    const [elementSelected, setElementSelected] = useState<any>(multipleSelect ? {} : null);
    const paginationRef: any = useRef(null);
    const [pageProps, setPageProps] = useState<PageProps<T>>(getCleanPageProps());
    const [operatedLine, setOperatedLine] = useState<any>(null);
    const [columnsStatus, setColumnsStatus] = useState({});
    const [sortOptions, setSortOptions] = useState<string[]>([]);
    const [sortedBy, setSortedBy] = useState(null);
    const showValue = useState(Array.isArray(hiddenCells) ? false : undefined);

    console.log(elementSelected)

    const keysToHideValue: any = hiddenCells ? hiddenCells.reduce((acc, key) => {
        acc[key] = true;
        return acc;
    }, {}) : {};

    useEffect(() => {
        if (loadOnOpen) {
            loadLines(pageProps.actualPage);
        }

        if (loadSortOptions) {
            loadSortOptions(setSortOptions)
        }
    }, [])

    useEffect(function reloadWithNewSortOption() {
        if (sortedBy) {
            loadLines(pageProps.actualPage);
        }
    }, [sortedBy])


    function loadLines(page: number) {
        setPageProps({ ...pageProps, data: [], loading: true });
        setElementSelected(multipleSelect ? {} : null);

        let url = `${baseUrl}`;

        try {
            apiCall.request({
                path: url,
                method: "GET",
                onSuccess: (data: any) => {
                    if (!data) {
                        setPageProps(getCleanPageProps())
                        return;
                    }
                    setPageProps({
                        data: data.content,
                        actualPage: data.page,
                        totalPages: data.totalPages,
                        totalElements: data.totalElements,
                        numberOfElements: data.size,
                        sortedBy: data.sortedBy,
                        loading: false
                    })
                },
                onError: () => setPageProps(getCleanPageProps()),
                params: { page, size: itemsPerPage, ...apiFilter },
                actionName: "Listar",
                sortBy: sortedBy
            })
        } catch (err) {
            setPageProps(getCleanPageProps())
        }
    }

    useEffect(function reloadTableWhenFilterChanges() {
        if (reloadFilter) {
            loadLines(0);
            setReloadFilter(false);
        }
    }, [reloadFilter])

    useEffect(() => {
        if (operatedLine) {
            const timeout = setTimeout(() => setOperatedLine(null),
                1250);
            return () => clearTimeout(timeout);
        }
    }, [operatedLine])

    const [columnResizeMode, setColumnResizeMode] = React.useState<ColumnResizeMode>('onChange');

    const table = useReactTable({
        data: pageProps.data,
        columns,
        columnResizeMode,
        state: { columnVisibility: columnsStatus },
        onColumnVisibilityChange: setColumnsStatus,
        getCoreRowModel: getCoreRowModel(),
    })

    const columnsDropdown = useMemo(() => table.getAllLeafColumns().map((column,index) => {
        const clickable = table.getVisibleLeafColumns().length > 1 || !column.getIsVisible();
        return (
            <li key={index} className={TableStyle["table-dropdown-navbar-clickable"]}>
                <label className={TableStyle["clickable-label"]}>
                    <input
                        className={TabStyle["dropdown-checkbox"]}
                        {...{
                            type: 'checkbox',
                            checked: column.getIsVisible(),
                            onChange: clickable ? column.getToggleVisibilityHandler() : () => null,
                        }}
                    />{''}
                    {String(column.columnDef.header)}
                </label>
            </li>
        )
    }), [table.getVisibleLeafColumns()])

    function checkIsLineOperated(line: any) {
        if (operatedLine) {
            return line[identifier] === operatedLine[identifier];
        }
        return false
    }

    function checkIsLineSelected(line: any) {
        if (multipleSelect) {
            return elementSelected.hasOwnProperty(line[identifier]);
        }
        if (elementSelected) {
            return elementSelected[identifier] === line[identifier];
        }
    }

    function selectLine(element: any) {
        if (multipleSelect) {
            if (elementSelected[element[identifier]]) {
                delete elementSelected[element[identifier]];
                setElementSelected({ ...elementSelected });
            } else {
                setElementSelected({ ...elementSelected, [element[identifier]]: element });
            }
        } else {
            if (elementSelected && elementSelected[identifier] === element[identifier]) {
                setElementSelected(null);
            } else {
                setElementSelected(element);
            }
        }
    }

    function getTdTitle(cell: any) {
        switch (typeof cell.getValue()) {
            case 'string':
                return cell.getValue();
            case 'object':
                return getTdObjectTitle(cell);
            case 'number':
                return cell.getValue().toString();
            default:
                return "-";
        }
    }

    function getTdObjectTitle(cell: any) {
        if (cell.getValue() === null) {
            return "-";
        }
        let resultado = "";
        for (const chave in cell.getValue()) {
            const valor = cell.getValue()[chave];
            resultado += `${chave}: ${valor}, \n`;
        }
        return resultado;
    }
    const getDoubleClickAction = (element: T) => {
        const optionsSorted = Array.from(options).sort((a, b) => +!!a.condition - +!!b.condition)
        const isValidInOptionCondition = (option: TableOption, element) => option.condition != null ? option.condition(element) : true;
        const doubleClickCanditates = optionsSorted.filter((option) => option.doubleClickAction && isValidInOptionCondition(option, element));
        if (doubleClickCanditates.length > 0) {
            return doubleClickCanditates[0].action;
        }
    }

    function handleDoubleClick(element: any) {

        const doubleClickAction = getDoubleClickAction(element);
        if (doubleClickAction) {
            doubleClickAction(element);
        }
    }

    const acculumativeFieldsValues = useMemo(() => {
        if (!acculumativeFields) {
            return {};
        }
        const acculumativeFieldsValues = acculumativeFields.reduce((acc, field) => {
            acc[field.name] = field.formatter(pageProps.data.reduce((acc, line) => acc + line[field.name], 0));
            return acc;
        }, {});
        return acculumativeFieldsValues;
    }, [pageProps.data])


    const columnCanBeViewed = (column: string) => showValue[0] || (!showValue[0] && !keysToHideValue[column]);
    function renderCell(cell: Cell<any, any>) {
        if (columnCanBeViewed(cell.column.id)) {
            return flexRender(cell.column.columnDef.cell, cell.getContext());
        }
        return <Skeleton width={"100%"} height={15} />

    }
    function renderTfoot() {
        if (!acculumativeFields) {
            return null;
        }
        return (
            <tfoot>
                <tr className={`${TableStyle["table-row"]} ${TableStyle["clickable-row"]}`}>
                    {!pageProps.loading && table && table.getVisibleLeafColumns().map((column, index) => {
                        if (index === 0) {
                            return <td key={index} className={TableStyle["total-td"]}><div className={`${TableStyle["table-div"]} ${TableStyle["total-text"]}`}>TOTAL:</div></td>
                        }
                        if (acculumativeFields.some(field => field.name === column.id)) {
                            return <td
                                key={index}
                                style={{ maxWidth: 0 }}
                            >
                                <div className={TableStyle["table-div"]}>{columnCanBeViewed(column.id) ?
                                    acculumativeFieldsValues[column.id] :
                                    <Skeleton width={"100%"} height={15} />}
                                </div>
                            </td>
                        }
                        return <td className={TableStyle["total-td"]} key={index}></td>
                    })}
                </tr>
            </tfoot>
        )
    }
    return (
        <div className={TabStyle["table-tab-component"]} data-cy="tableComponent">

            <TableOptions
                elementSelected={elementSelected}
                options={options}
                loadLines={() => loadLines(pageProps.actualPage)}
                sortOptions={sortOptions}
                sortedBy={sortedBy}
                showValue={showValue}
                setSortedBy={setSortedBy}
            />

            <table className={TableStyle["table"]}>
                <thead className={TableStyle["table-head"]}>
                    {table && table.getHeaderGroups().map((headerGroup, index) => (
                        <tr className={`${TableStyle["table-row"]}`} key={index}>
                            {multipleSelect ? <th></th> : null}
                            {headerGroup.headers.map((header, index) => {
                                return <th key={index} colSpan={header.colSpan} style={{
                                    width: header.getSize(),
                                }
                                }>
                                    <div className={TableStyle["head-inner-content"]}>
                                        {header.isPlaceholder ? null : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        <nav className={TableStyle["table-dropdown-navbar"]}>
                                            <li>
                                                <button className={`${TableStyle["header-svg-button"]}`}>
                                                    <svg className={`${TableStyle["header-svg"]}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                                                </button>
                                                <ul className={TableStyle["table-dropdown-content-container"]}>
                                                    {columnsDropdown}
                                                </ul>
                                            </li>
                                        </nav>
                                    </div>
                                    <div
                                        {...{
                                            onMouseDown: header.getResizeHandler(),
                                            onTouchStart: header.getResizeHandler(),
                                            className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''
                                                }`,
                                            style: {
                                                transform:
                                                    columnResizeMode === 'onEnd' &&
                                                        header.column.getIsResizing()
                                                        ? `translateX(${table.getState().columnSizingInfo.deltaOffset
                                                        }px)`
                                                        : '',
                                            },
                                        }}
                                    />
                                </th>
                            }
                            )}
                        </tr>
                    ))}
                </thead>
                <tbody className={TableStyle["table-body"]}>
                    {table && table.getRowModel().rows.map((row, index) => (
                        <tr key={index} className={`${TableStyle["table-row"]} ${TableStyle["clickable-row"]} ${checkIsLineSelected(row.original) ? TableStyle["line-selected"] : null} ${checkIsLineOperated(row.original) ? TableStyle["line-operated"] : null} ${getCustomClass ? getCustomClass(row.original) : ""}`} 
                            onClick={(event) => {
                                if (multipleSelect) {
                                    if (event.ctrlKey) {
                                        selectLine(row.original);
                                    }
                                    return
                                }
                                selectLine(row.original);
                            }}
                            onDoubleClick={() => handleDoubleClick(row.original)}
                        >
                            {multipleSelect ? <td> <input name='tableCollumnCheckbox' className={TableStyle["multiple-selection-checkbox"]} type="checkbox" checked={checkIsLineSelected(row.original)} onChange={() => selectLine(row.original)}  /></td> : null}
                            {row.getVisibleCells().map((cell, index) => (
                                <td id='tableTd' key={index} style={{ maxWidth: 0 }} title={columnCanBeViewed(cell.column.id)? getTdTitle(cell): ""}>
                                    <div className={TableStyle["table-div"]}>
                                        {renderCell(cell)}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                {renderTfoot()}
            </table>

            <Loading isLoading={pageProps.loading} />

            <Pagination
                totalPages={pageProps.totalPages}
                actualPage={pageProps.actualPage}
                totalElements={pageProps.totalElements}
                numberOfElements={pageProps.numberOfElements}
                setPage={(page: number) => {
                    loadLines(page)
                }}
                itemsPerPage={itemsPerPage}
                innerRef={paginationRef}
            />

        </div>

    )
}

export function TableDivider() {
    return <div className={TableStyle["table-divider"]} />
}

