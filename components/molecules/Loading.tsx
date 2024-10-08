import LoadingStyle from '@styles/loading.module.css';

export default function Loading({
    contextClass = '',
    isLoading
}) {
    return (
        <>
            {
                isLoading ?
                    <div className={`${LoadingStyle["loader-container"]} ${contextClass}`}>
                        <span className={LoadingStyle["loader"]}></span>
                    </div> : null
            }
        </>
    );
}