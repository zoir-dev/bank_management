import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"

const AddModal = ({ isOpen, onClose, data }: thisProps) => {
    const [loading, setLoading] = useState(false)

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Form>()

    const onSubmit = (form: Form) => {
        console.log(form)
        reset()
        setLoading(false)
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
                            placeholder={t('Admin name')}
                            label={t('Admin name')}
                            labelPlacement='outside'
                            {...register('name', { required: t('Enter a name') })}
                            isInvalid={!!errors.name}
                            errorMessage={errors.name && errors.name?.message}
                            defaultValue={data?.name}
                            isDisabled={loading}
                        />
                        <Input
                            placeholder={t('Password')}
                            label={t('Password')}
                            labelPlacement='outside'
                            {...register('password', { required: t('Enter a password') })}
                            isInvalid={!!errors.password}
                            errorMessage={errors.password && errors.name?.message}
                            defaultValue={data && `${data?.password}`}
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

interface Form { name: string, password: number }

interface thisProps {
    isOpen: boolean,
    onClose: () => void,
    data?: { id: number, name: string, password: string }
}