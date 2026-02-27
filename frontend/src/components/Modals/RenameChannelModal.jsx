import { Modal, Button, Form as BootstrapForm } from 'react-bootstrap'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { fetchEditChannel } from '../../store/slices/channelsSlice'
import { selectors as channelsSelector } from '../../store/slices/channelsSlice'
import { channelNameValidationSchema } from '../../utils/validationSchemas'
import { useRef } from 'react'
import { toast } from 'react-toastify'


const RenameChannelModal = ({ show, onClose, channelId }) => {

    const { t } = useTranslation()

    const dispatch = useDispatch()
    const channels = useSelector(channelsSelector.selectAll)

    const inputRef = useRef(null)

    if (!show) return null

    return (

        <Modal show={show} onHide={onClose} onEntered={() => inputRef.current.focus()}>
            <Modal.Header closeButton>
                <Modal.Title>{t('modals.renameChannel.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik 
                    initialValues={{name: ''}}
                    validationSchema={channelNameValidationSchema(t)}
                    onSubmit={async (values, { resetForm, setSubmitting, setFieldError }) => {
                        if (values.name.trim().length === 0) return
                        const channelNames = channels.map(channel => channel.name)
                        if (channelNames.includes(values.name)) {
                            setFieldError('name', t('modals.renameChannel.existError')) // передаем ошибку в ErrorMessage
                            return
                        }

                        try {
                            await dispatch(fetchEditChannel({id: channelId, name: values.name})).unwrap() // unwrapp() пробрасывает ошибки в catch !!!
                            toast.success(t('toasts.renameChannelSuccess'))
                            onClose()
                            resetForm()
                        }
                        catch (error) {
                            console.log('Rename channel error:', error)
                            // toast.error(t('toasts.renameChannelError'))
                        }
                        finally {
                            setSubmitting(false)
                        }
                    }}
                    className="modal-body"
                    >
                        {({ errors, touched, isSubmitting }) => (
                        <FormikForm>
                            <BootstrapForm.Group>
                                <BootstrapForm.Label 
                                htmlFor='name'
                                className='visually-hidden'>
                                    {t('modals.renameChannel.label')}
                                </BootstrapForm.Label>
                                
                                <Field name="name">
                                
                                {({ field }) => (
                                    <BootstrapForm.Control 
                                        {...field}
                                        id='name'
                                        aria-label={t('modals.renameChannel.label')}
                                        placeholder={t('modals.renameChannel.placeholder')}

                                        isInvalid={touched.name && !!errors.name}
                                        ref={inputRef}
                                    />
                                )}

                                </Field> 
                                <ErrorMessage 
                                name="name"
                                component="div"
                                className="invalid-feedback d-block" />
                            </BootstrapForm.Group>

                                <div className="d-flex justify-content-end mt-2">
                                    <Button onClick={onClose} variant='secondary' className="me-2">{t('modals.renameChannel.canselButton')}</Button>
                                    <Button type="submit" variant='primary' className="me-2" disabled={isSubmitting}>{t('modals.renameChannel.renameButton')}</Button>
                                </div>
                        </FormikForm>
                        )}
                        </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default RenameChannelModal
