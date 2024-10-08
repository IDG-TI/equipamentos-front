'use client'

import CarouselStyle from "@styles/carousel.module.css";

export default function DayBox({ value, name,onClick, isSelected, hasApontamento }: any) {
    return (
        <div data-cy="dayBox" className={`${CarouselStyle["day-box-container"]} ${isSelected ? CarouselStyle["day-box--selected"] : ''} ${hasApontamento ? CarouselStyle["day-box--apontamento-selected"] : ''}`} onClick={onClick}>
            <div className={CarouselStyle["day-box"]}>
                <span className={CarouselStyle["day-box-day"]}>{value}</span>
                <span className={CarouselStyle["day-box-name"]}>{name}</span>
            </div>
        </div>
    )
}