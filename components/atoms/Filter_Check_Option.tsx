export default function FilterOption({ nome, check, checked }) {

    return (
        <>
            <input type="checkbox" onClick={check} value={checked} />
        </>
    )
}