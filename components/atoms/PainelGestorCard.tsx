
import PainelGestorStyle from '@styles/painel_gestor.module.css'
import PainelIcons from '@assets/PainelIcons'
import { Skeleton } from '@mui/material';

export default function PainelGestorCard({ name, value, format, icon, customClass, periodo, isLoading }: {
    name: string,
    value: any,
    format?: Function
    icon: string,
    customClass?: string,
    periodo?: string,
    isLoading?: boolean
}) {
    const cardValue = format ? format(value) : value;

    return (
        <div className={`${PainelGestorStyle["container-card"]} ${customClass ?? ""}`}>
            {isLoading ? (
                <>
                    <span className={PainelGestorStyle["span-painel-gestor"]}>
                        <p className={PainelGestorStyle["tittle-card"]}>{periodo}</p>
                        <Skeleton variant="rounded" width={150} height={20} animation="wave"/>
                        <Skeleton variant="rounded" width={80} height={10} animation="wave"/>
                    </span>
                    <Skeleton variant="circular" width={35} height={35} animation="wave"/>
                </>
            ) :
                <>
                    <span className={PainelGestorStyle["span-painel-gestor"]}>
                        <p className={PainelGestorStyle["tittle-card"]}>{name}:</p>
                        <p className={PainelGestorStyle["text-card"]}>{cardValue}
                        </p>
                    </span>
                    {PainelIcons[icon]}
                </>
            }

        </div >
    )
}

