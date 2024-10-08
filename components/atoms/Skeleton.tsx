import SkeletonStyle from "@styles/skeleton.module.css";

/**
 * 
 * @param style Objeto com as propriedades de estilo 
 * 
 * @returns 
 */

export default function Skeleton(style : any){
    return <div style={{...style}} className={SkeletonStyle["skeleton"]}></div>
}