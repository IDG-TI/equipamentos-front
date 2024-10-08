import { SidebarProps, SidebarField } from "@/types"
import Sidebar from "@components/molecules/sidebar/Sidebar"
import { useMemo, useState } from "react"

const getDependencie = (field) => {
    switch (field.type) {
        case "input-search":
            return field.state[0];
        case "select":
            return field.stateSelect.selected;
        case "input":
            return field.state[0];
        case "hours-minutes":
            // testa ao
            return [field.stateHour[0], field.stateMinute[0]]
        case "custom-component":
            return field.dependencies;
    }
}
const buildSidebarDependencies = (fields: SidebarField[] | undefined) => {
    if (!fields) {
        return [];
    }
    let dependencies: any = [];
    for (let i = 0; i < fields.length; i++) {
        const dependencie: [] | any = getDependencie(fields[i]);
        if (dependencie instanceof Array) {
            dependencies = dependencies.concat(dependencie);
        } else {
            dependencies.push(dependencie);
        }
    }
    return dependencies;
}

export default function useSidebar({ name, fields, footerButtons, reloadFilter }: SidebarProps): JSX.Element {

    const dependencies = useMemo(() => buildSidebarDependencies(fields), [fields])
    const [key, setKey] = useState(0);

    const sidebar = useMemo(() => {
        setKey(key+1);
        return <Sidebar
            key={key}
            name={name}
            reloadFilter={reloadFilter}
            fields={fields}
            footerButtons={footerButtons}
        />
    }, dependencies);


    return sidebar;
}


