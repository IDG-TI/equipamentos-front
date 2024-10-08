import DayBox from "@atoms/Day_Box";
import CarouselStyle from "@styles/carousel.module.css";
import { useEffect, useState } from "react";
import formatNumber from "@formats/format_Number";
import { CarouselProps } from "@/types";


export default function CarouselMonth({ year,
    month,
    day,
    setDay,
    isAnimatingLeft,
    isAnimatingRight,
    isNew,
    apontamentos
}: CarouselProps) {

    const [days, setDays] = useState<any>([]);


    const getDay = (year: number, month: number, day: number) => {
        const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
        const date = new Date(year, month, day);

        const dayFormated = formatNumber(day, 2)

        return { name: days[date.getDay()], value: dayFormated, hasApontamento: apontamentos.hasOwnProperty(dayFormated) };
    }

    const getDaysInMonth = (year: number, month: number): number => new Date(year, month + 1, 0).getDate();
    const getMonthDays = (year: number, month: number) => new Array(getDaysInMonth(year, month)).fill(null).map((_: undefined, index: number) => getDay(year, month, index + 1));

    useEffect(() => {
        setDays(getMonthDays(year, month))
    }, [year, month, apontamentos])

    const getAnimationClassName = () => {
        if (isNew) {
            return isAnimatingLeft ? CarouselStyle["carousel-month-new--left"] : CarouselStyle["carousel-month-new--right"];
        }
        if (isAnimatingLeft || isAnimatingRight) {
            return isAnimatingLeft ? CarouselStyle["carousel-month--left"] : CarouselStyle["carousel-month--right"];
        }

    }
    return (
        <div data-cy="carouselMonth" className={`${CarouselStyle["carousel-month"]} ${getAnimationClassName()}`}>
            {days.map((dayRendered: any, index: number) => <DayBox {...dayRendered} isSelected={day === dayRendered.value} key={index} onClick={setDay ? () => setDay(dayRendered.value) : null} />)}
        </div>
    )
}
