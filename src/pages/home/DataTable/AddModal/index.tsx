import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { http } from "../../../../utils/http"
import toast from "react-hot-toast"

const AddModal = ({ isOpen, onClose, data }: thisProps) => {
    const [loading, setLoading] = useState<boolean>(false)

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Form>()

    const onSubmit = async (form: Form) => {
        try {
            setLoading(true)
            if (data) {
                await http.put('/save/fixed-data/100')
            } else {
                await http.post('save/fixed-data/100', form).then(res => console.log(res.data))
                toast.success(t('Successfully added'))
            }
            reset()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.response?.data?.error || error?.message)
        } finally {
            setLoading(false)
        }
    }

    const { t } = useTranslation()
    return (
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} isDismissable={false}
            motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            ease: "easeIn",
                        },
                    },
                }
            }}
        >
            <ModalContent>
                <ModalHeader className="text-foreground">{data ? t('Edit') : t('Add')}</ModalHeader>
                <ModalBody className="pb-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <Input
                            placeholder={t('Name')}
                            label={t('Name')}
                            labelPlacement='outside'
                            {...register('name', { required: t('Enter a name') })}
                            isInvalid={!!errors.name}
                            errorMessage={errors.name && errors.name?.message}
                            defaultValue={data?.name}
                            isDisabled={loading}
                        />
                        <Input
                            placeholder={t('Count')}
                            label={t('Count')}
                            labelPlacement='outside'
                            {...register('count', { required: t('Enter a count'), valueAsNumber: true })}
                            isInvalid={!!errors.count}
                            errorMessage={errors.count && errors.name?.message}
                            defaultValue={data && `${data?.count}`}
                            isDisabled={loading}
                        />
                        <div className="flex gap-4">
                            <Button variant="bordered" fullWidth onClick={onClose} isDisabled={loading}>
                                {t('Cancel')}
                            </Button>
                            <Button color="success" fullWidth type="submit" isLoading={loading}>
                                {t('Save')}
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AddModal

interface Form { name: string, count: number }

interface thisProps {
    isOpen: boolean,
    onClose: () => void,
    data?: { id: number, name: string, count: number }
}