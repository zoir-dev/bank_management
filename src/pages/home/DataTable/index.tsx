import { Button, Input, Pagination, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react"
import { Edit2, Trash2 } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import AddModal from "./AddModal"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTable = ({ data, loading }: { data: any[], loading: boolean }) => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [des, setDes] = useState<SortDescriptor>()
    const [index, setIndex] = useState(-1)
    const [isLoading, setIsLoading] = useState(false)
    const { isOpen, onClose, onOpen } = useDisclosure()

    const { t } = useTranslation()

    const filteredData = () => {
        if (search) return data.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
        return data
    }


    const sortedData = () => {
        if (des && des.column === 'count') {
            return des.direction === 'descending' ? filteredData().sort((a, b) => a.count - b.count) : filteredData().sort((a, b) => b.count - a.count)
        } else if (des?.column === 'name') {
            return des.direction === 'descending' ? filteredData().sort((a, b) => b.name.localeCompare(a.name)) : filteredData().sort((a, b) => a.name.localeCompare(b.name))
        }
        return filteredData()
    }

    const sortRow = (e: SortDescriptor) => {
        if (e) {
            setDes(e)
            sortedData()
        }
    }

    const deleteRow = async (id: number) => {
        setIndex(id)
        setIsLoading(true)
    }

    return (
        <div className="max-w-[700px] flex flex-col gap-2 mx-auto">
            <div className="flex items-center justify-between gap-4">
                <Input placeholder={t('Search') + '...'} value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-80" />
                <Button color="success" onClick={onOpen} >
                    {t('Add')}
                </Button>
            </div>
            <div className="w-full overflow-x-auto">
                <Table aria-label="Fixed values" className="min-w-[400px]"
                    classNames={{
                        table: "min-h-[300]",
                    }}
                    sortDescriptor={des}
                    onSortChange={(e) => sortRow(e)}
                    bottomContent={
                        !loading && data.length !== 0 && <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="success"
                                page={page}
                                total={Math.ceil(filteredData().length / 10)}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }

                >
                    <TableHeader>
                        <TableColumn key='name' allowsSorting>{t("Name")}</TableColumn>
                        <TableColumn key='count' allowsSorting>{t("Count")}</TableColumn>
                        <TableColumn className="pl-6"> </TableColumn>
                    </TableHeader>
                    <TableBody isLoading={loading} loadingContent={<Spinner color="success" />} emptyContent={"No data"}>
                        {sortedData()?.slice((page - 1) * 10, page * 10).map(d => (
                            <TableRow key={d.id}>
                                <TableCell width='70%' key='name'>
                                    {d.name}
                                </TableCell>
                                <TableCell width='30%' key='count'>
                                    {d.count}
                                </TableCell>
                                <TableCell className="w-28 flex justify-end pr-0">
                                    <Button isIconOnly color="success" variant="light"
                                        onClick={() => { setIndex(d.id), onOpen() }} isDisabled={isLoading}>
                                        <Edit2 width={20} />
                                    </Button>
                                    <Button isIconOnly color="danger" variant="light" onClick={() => deleteRow(d.id)}
                                        isLoading={index === d.id && isLoading}
                                        isDisabled={isLoading}
                                    >
                                        <Trash2 width={20} />
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
