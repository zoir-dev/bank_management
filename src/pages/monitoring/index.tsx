import { useEffect } from "react"
import Layout from "../../layouts/layout"
import DataTable from "./DataTable"
import { data } from "./DataTable/data"
import { http } from "../../utils/http"
import toast from "react-hot-toast"

const Monitoring = () => {

    useEffect(() => {
        const fetchData = async () => {
            try {
                await http.get('daily-data').then(res => console.log(res.data))
            } catch (error: any) {
                toast.error(error?.response?.data?.error || error?.message)
                // console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <Layout>
            <DataTable data={data} loading={false} />
        </Layout>
    )
}

export default Monitoring