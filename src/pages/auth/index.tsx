
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { lazy } from "../../utils/lazy";
import Layout from "../../layouts/layout";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
const Auth = () => {
    const [loading, setLoading] = useState(false)
    const [passwordHide, setPasswordHide] = useState(true);
    const navigate = useNavigate()
    const { t } = useTranslation()

    const login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            await lazy()
            localStorage.setItem('token', 'smth')
            navigate('/')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    const getIcon = () => {
        return !passwordHide ? <EyeOff onClick={() => setPasswordHide(!passwordHide)} className="w-5 cursor-pointer text-foreground-500" /> : <Eye onClick={() => setPasswordHide(!passwordHide)} className="w-5 cursor-pointer text-foreground-500" />;
    };

    return (
        <Layout>
            <div className="flex items-center justify-center h-full w-full">
                <Card className="max-w-full w-[340px]">
                    <CardBody className="overflow-hidden">
                        <h2 className="pb-3 sm:pb-5 text-center text-lg sm:text-2xl">{t("Login")}</h2>
                        <form className="flex flex-col gap-4" onSubmit={login}>
                            <Input isRequired label={t("Id")} type="string"
                                classNames={{
                                    'input': 'text-base'
                                }}
                                isDisabled={loading}
                            />
                            <Input
                                isRequired
                                label={t("Password")}
                                type={passwordHide ? "password" : 'string'}
                                className=""
                                endContent={getIcon()}
                                isDisabled={loading}
                            />
                            <div className="flex gap-2 justify-end">
                                <Button fullWidth color="success" type="submit" isLoading={loading} className="text-white text-base">
                                    {!loading && t('Login')}
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </Layout>
    )
}

export default Auth