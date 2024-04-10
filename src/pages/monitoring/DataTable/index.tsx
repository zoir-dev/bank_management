import { Button, Input, Pagination, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react"
import { Edit2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import AddModal from "./AddModal"
const DataTable = ({ data, loading }: { data: Data[], loading: boolean }) => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [des, setDes] = useState<SortDescriptor>()
    const [index, setIndex] = useState(-1)
    const [isLoading, setIsLoading] = useState(false)
    const { isOpen, onClose, onOpen } = useDisclosure()

    const { t } = useTranslation()

    useEffect(() => {
        setIsLoading(false)
    }, [])

    const filteredData = () => {
        if (search) return data.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
        return data
    }

    const sortedData = () => {
        if (des && des.column === 'count') {
            return des.direction === 'descending' ? filteredData().sort((a, b) => a.count - b.count) : filteredData().sort((a, b) => b.count - a.count)
        } else if (des?.column === 'name') {
            return des.direction === 'descending' ? filteredData().sort((a, b) => b.name.localeCompare(a.name)) : filteredData().sort((a, b) => a.name.localeCompare(b.name))
        } else if (des && des.column === 'using') {
            return des.direction === 'descending' ? filteredData().sort((a, b) => a.using - b.using) : filteredData().sort((a, b) => b.using - a.using)
        }
        return filteredData()
    }

    const sortRow = (e: SortDescriptor) => {
        if (e) {
            setDes(e)
            sortedData()
        }
    }


    return (
        <div className="max-w-[700px] flex flex-col gap-2 mx-auto">
            <div className="flex items-center justify-between gap-4">
                <Input placeholder={t('Search') + '...'} size="sm" value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-80" />
            </div>
            <div className="w-full overflow-x-auto">
                <Table aria-label="Fixed values" className="min-w-[400px]"
                    sortDescriptor={des}
                    onSortChange={(e) => sortRow(e)}
                    bottomContent={
                        <div className="flex items-center gap-6 w-full justify-between">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="success"
                                page={page}
                                total={Math.ceil(filteredData().length / 10)}
                                onChange={(page) => setPage(page)}
                            />
                            <Button color="success" isDisabled={true}>
                                {t("Save")}
                            </Button>
                        </div>
                    }
                >
                    <TableHeader>
                        <TableColumn key='name' allowsSorting>{t("Name")}</TableColumn>
                        <TableColumn key='count' allowsSorting>{t("Count")}</TableColumn>
                        <TableColumn key='using' allowsSorting>{t("Using")}</TableColumn>
                        <TableColumn className="pl-6"> </TableColumn>
                    </TableHeader>
                    <TableBody isLoading={loading} loadingContent={<Spinner color="success" />}>
                        {sortedData().slice((page - 1) * 10, page * 10).map(d => (
                            <TableRow key={d.id}>
                                <TableCell width='65%' key='name'>
                                    {d.name}
                                </TableCell>
                                <TableCell width='15%' key='count'>
                                    {d.count}
                                </TableCell>
                                <TableCell width='20%' key='count'>
                                    {d.using} / {Math.round(d.using * 100 / d.count)}%
                                </TableCell>
                                <TableCell className="w-16 flex justify-end pr-0">
                                    <Button isIconOnly color="success" variant="light"
                                        onClick={() => { setIndex(d.id), onOpen() }} isDisabled={isLoading}>
                                        <Edit2 width={20} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <AddModal isOpen={isOpen} onClose={() => { onClose(), setIndex(-1) }} data={data.find(f => f.id === index)} />
        </div>
    )
}

export default DataTable


interface Data {
    id: number,
    name: string,
    count: number,
    using: number
}