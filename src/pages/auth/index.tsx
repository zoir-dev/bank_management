import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layouts/layout";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { http } from "../../utils/http";

const Auth = () => {
    const [loading, setLoading] = useState(false);
    const [passwordHide, setPasswordHide] = useState(true);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ userId: "", password: "" });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            await http.post('sign-in', formData).then(d => localStorage.setItem('token', d.data.token));
            navigate('/');
            toast.success(t("Sign-in successful!"));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.response?.data?.error || error?.message)
        } finally {
            setLoading(false);
        }
    };

    const getIcon = () => {
        return !passwordHide ? (
            <EyeOff
                onClick={() => setPasswordHide(!passwordHide)}
                className="w-5 cursor-pointer text-foreground-500"
            />
        ) : (
            <Eye
                onClick={() => setPasswordHide(!passwordHide)}
                className="w-5 cursor-pointer text-foreground-500"
            />
        );
    };

    return (
        <Layout>
            <div className="flex items-center justify-center h-[80vh] w-full">
                <Card className="max-w-full w-[340px] pb-2">
                    <CardBody className="overflow-hidden">
                        <h2 className="pb-3 sm:pb-5 text-center text-lg sm:text-2xl">
                            {t("Login")}
                        </h2>
                        <form className="flex flex-col gap-4" onSubmit={login}>
                            <Input
                                isRequired
                                label={t("Id")}
                                type="string"
                                classNames={{
                                    input: "text-base",
                                }}
                                isDisabled={loading}
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                            />
                            <Input
                                isRequired
                                label={t("Password")}
                                type={passwordHide ? "password" : "string"}
                                className=""
                                endContent={getIcon()}
                                isDisabled={loading}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <div className="flex gap-2 justify-end">
                                <Button
                                    fullWidth
                                    color="success"
                                    type="submit"
                                    isLoading={loading}
                                    className="text-white text-base"
                                >
                                    {t("Login")}
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </Layout>
    );
};

export default Auth;
