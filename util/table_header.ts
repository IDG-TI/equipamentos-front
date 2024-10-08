import { createColumnHelper } from '@tanstack/react-table';

export function TableAcessors(acessors: any)  {
    const columnHelper = createColumnHelper<any>();


    return acessors.map((acessor:any) =>  {
        return columnHelper.accessor(acessor.name,  {
            header:acessor.header,
            cell: acessor.cell,
        }
        )
    })
}