import ReleaseStyle from "@styles/release_notes.module.css";


interface ReleaseNotesSection {
    title: string;
    description?:string;
    options: ReleaseNotesSectionOption[];
}

interface ReleaseNotesSectionOption{
    name: string,
    details?: string
}
export default function ReleaseNotesSection({title,options}: ReleaseNotesSection){
    return <div className={ReleaseStyle.section}>
        <h3>{title}</h3>

        <ul className={ReleaseStyle["section-list"]}>
            {options.map((option, index)=>{
                return <li key={index}>
                    <span className={ReleaseStyle["section-list-option-name"]}>{option.name}</span>
                    {option.details? ": "+option.details:null}</li>
            })}
        </ul>
        <hr className={ReleaseStyle["section-divisor"]}/>
    </div>
}