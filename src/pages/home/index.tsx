import { useTranslation } from "react-i18next"
import Layout from "../../layouts/layout"

const Home = () => {
    const { t } = useTranslation()
    return (
        <Layout>
            <div>
                <p>{t('test')}</p>
            </div>
        </Layout>
    )
}

export default Home