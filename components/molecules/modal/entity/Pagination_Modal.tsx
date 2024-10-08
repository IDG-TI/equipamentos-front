import { useState, useRef } from "react";
import PaginationStyle from "@styles/pagination.module.css";

export default function PaginationModal({
    totalElements,
    totalPages,
    actualPage,
    setPage,
    itemsPerPage,
    innerRef,
    numberOfElements
}: any) {

    const [searchPageInput, setSearchPageInput] = useState(actualPage + 1);
    const pageRef: any = useRef(null);

    // function handlePress(event: any) {
    //     if (event.key === 'Enter') {
    //         handlePageChange(searchPageInput - 1);
    //     }
    // }

    function handlePageChange(page: any) {
        if (page >= 0 && page <= (totalPages)) {
            setPage(page);
            setSearchPageInput(page + 1);
        }
    }

    function handleInputSearchChange(e: any) {
        if (Number(e.target.value) > totalPages) {
            setSearchPageInput(totalPages)
        }
        else if (Number(e.target.value) < 1) {
            setSearchPageInput('')
        }
        else {
            setSearchPageInput(e.target.value)
        }
    }

    function previusPage() {
        handlePageChange(actualPage - 1);
    }

    function nextPage() {
        handlePageChange(actualPage + 1);
    }

    function firstPage() {
        handlePageChange(0);
    }

    function lastPage() {
        handlePageChange(totalPages - 1);
    }

    function handlePress(event: any) {
        if (event.key === 'Enter') {
            handlePageChange(searchPageInput - 1);
        }
    }

    return (
        <nav className={PaginationStyle["pagination-container-pesquisa"]} >
            <ul className={PaginationStyle["pagination-pesquisa"]}>

                <li className={`${PaginationStyle["page-item"]} ${actualPage == 0 ? PaginationStyle["disabled"] : ""}`}>
                    <button
                        className={PaginationStyle["pagination-svg-button"]}
                        onClick={firstPage}
                        type="button"
                    >
                        <svg className={PaginationStyle["pagination-svg"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" /></svg>
                    </button>
                </li>
                <li className={`${PaginationStyle["page-item"]} ${actualPage == 0 ? PaginationStyle["disabled"] : ""}`}>
                    <button
                        className={PaginationStyle["pagination-svg-button"]}
                        onClick={previusPage}
                        type="button"
                    >
                        <svg className={PaginationStyle["pagination-svg"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                    </button>
                </li>

                <form onKeyDown={handlePress}>
                    <label className={PaginationStyle["pagination-search-label"]}>Página </label>
                    <input className={PaginationStyle["pagination-search-input"]} type="number" value={searchPageInput} onChange={(e) => handleInputSearchChange(e)} min={1} max={totalPages} />
                    <span className={PaginationStyle["pagination-search-span"]}> de {totalPages}</span>
                </form>

                <li className={`${PaginationStyle["page-item"]} ${actualPage + 1 >= totalPages ? PaginationStyle["disabled"] : ""}`}>
                    <button
                        className={PaginationStyle["pagination-svg-button"]}
                        onClick={nextPage}
                        type="button"
                    >
                        <svg className={PaginationStyle["pagination-svg"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
                    </button>
                </li>

                <li className={`${PaginationStyle["page-item"]} ${actualPage + 1 >= totalPages ? PaginationStyle["disabled"] : ""}`}>
                    <button
                        className={PaginationStyle["pagination-svg-button"]}
                        onClick={lastPage}
                        type="button"
                    >
                        <svg className={PaginationStyle["pagination-svg"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" /></svg>
                    </button>
                </li>
                <div className={PaginationStyle["pagination-info-container"]}>
                    {totalElements > 0 ? `Itens ${actualPage * itemsPerPage + 1} - ${actualPage * itemsPerPage + numberOfElements} de ${totalElements} ` : ""}
                </div>
            </ul>
        </nav>
    )
}