import { useEffect, useState } from "react"
import Layout from "../../layouts/layout"
import DataTable from "./DataTable"
import { http } from "../../utils/http"
import toast from "react-hot-toast"

const Admins = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                await http.get('users').then(res => setData(res.data))
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error(error?.response?.data?.error || error?.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <Layout>
            <DataTable data={data} loading={loading} />
        </Layout>
    )
}

export default Admins
