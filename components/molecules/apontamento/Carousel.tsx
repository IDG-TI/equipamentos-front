import { useEffect, useState } from "react";
import CarouselStyle from "@styles/carousel.module.css";
import formatMonth from "@util/formats/format_month";
import CarouselMonth from "@molecules/Carousel_Month";

export default function Carousel({ day, month, year, apontamentos }) {




    const [oldMonth, setOldMonth] = useState<number>(month[0]);
    const [oldYear, setOldYear] = useState<number>(year[0]);
    
    const [newMonth, setNewMonth] = useState<number>(new Date().getMonth());
    const [newYear, setNewYear] = useState<number>(new Date().getFullYear());
    const [isAnimatingLeft, setIsAnimatingLeft] = useState<boolean>(false);
    const [isAnimatingRight, setIsAnimatingRight] = useState<boolean>(false);


    function controlAnimation(fixedNewMonth: number, fixedNewYear: number){
        if(fixedNewYear!=oldYear){
            return fixedNewYear > oldYear ? setIsAnimatingLeft : setIsAnimatingRight;
        }
        return fixedNewMonth > oldMonth ? setIsAnimatingLeft : setIsAnimatingRight;
    }
    
    function updateMonth(monthSelected: number) {
        day[1](null);

        const [fixedNewMonth, fixedNewYear] = fixMonthAndYear(monthSelected, year[0]);
        const animation = controlAnimation(fixedNewMonth, fixedNewYear);
        
        animation(true);
        setNewMonth(fixedNewMonth);
        setNewYear(fixedNewYear);

        setOldMonth(fixedNewMonth);
        setOldYear(fixedNewYear);
        month[1](fixedNewMonth);
        year[1](fixedNewYear);
        
        setTimeout(() => {
            animation(false);
        }, 1000);
    }

    useEffect(function handleDateChange() {
        if (oldMonth != month[0]) {
            updateMonth(month[0]);
        }
    }, [month[0]])

    function fixMonthAndYear(month: number, year: number) {
        if (month > 11) {
            return [0, year + 1];
        } else if (month < 0) {
            return [11, year - 1];
        }
        return [month, year]
    }

    return (
        <>
            <div data-cy="dateCarouselHeader" className={CarouselStyle["carousel-header"]}>
                {day[0] ?? "-"}/{formatMonth(newMonth)}/{year[0]}
            </div>

            <div className={CarouselStyle["carousel-container"]}>
                <button
                    data-cy="carouselLeftButton"
                    className={CarouselStyle["carousel-button"]}
                    onClick={() => updateMonth(month[0] - 1)}>
                    <svg
                        className={CarouselStyle["carousel-svg-arrow"]}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512">
                        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                    </svg>
                </button>
                <div className={CarouselStyle["carousel"]} tabIndex={0}>
                    <CarouselMonth year={year[0]} day={day[0]} setDay={day[1]} month={month[0]} isAnimatingLeft={isAnimatingLeft} isAnimatingRight={isAnimatingRight} apontamentos={apontamentos} />
                    {(isAnimatingLeft || isAnimatingRight) ? <CarouselMonth year={newYear} month={newMonth} isNew={isAnimatingLeft || isAnimatingRight} isAnimatingLeft={isAnimatingLeft} isAnimatingRight={isAnimatingRight} apontamentos={[]} /> : null}
                </div>
                <button
                    data-cy="carouselRightButton"
                    className={CarouselStyle["carousel-button"]}
                    onClick={() => updateMonth(month[0] + 1)}>
                    <svg
                        className={CarouselStyle["carousel-svg-arrow"]}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512">
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                    </svg>
                </button>
            </div>
        </>
    )
}