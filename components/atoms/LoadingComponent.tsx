import Skeleton from "@atoms/Skeleton";

export default function LoadingComponent({ isLoading, component, skeletonProps }) {

    return (
        <>
            {isLoading ? <Skeleton {...skeletonProps} /> : component}
        </>
    )
}