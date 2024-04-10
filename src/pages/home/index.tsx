import { useTranslation } from "react-i18next"
import Layout from "../../layouts/layout"
import DataTable from "./DataTable"
import { http } from "../../utils/http"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Select, SelectItem } from "@nextui-org/react"

const Home = () => {
    const { t } = useTranslation()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>([])
    const [dep, setDep] = useState([])
    const [info, setInfo] = useState()
    const [loading, setLoading] = useState(false)


    let idCounter = 0;
    console.log(info, t)
    useEffect(() => {
        setDep([])
        const fetchData = async () => {
            try {
                setLoading(true)
                await http.get('fixed-data/100').then((res) => {
                    const dataArray = Object.entries(res.data.data).map(([name, count]) => ({ id: idCounter++, name, count: count == null ? 0 : count }))
                    setData(dataArray)
                    setInfo(res.data)
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error(error?.response?.data?.error || error?.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dep])

    useEffect(() => {
        const fetchDep = () => {
            try {
                http.get('add-info').then(res => console.log(res.data))
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error(error?.response?.data?.error || error?.message)
            }
        }
        fetchDep()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Layout>
            <div className="max-w-[700px] mx-auto pb-6">
                <Select className="w-80">
                    <SelectItem key='1' value='1'>
                        1
                    </SelectItem>
                </Select>
            </div>
            <DataTable data={data} loading={loading} />
        </Layout >
    )
}

export default Home
