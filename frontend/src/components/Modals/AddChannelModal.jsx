import { Modal, Button, Form as BootstrapForm } from 'react-bootstrap'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchAddChannel, setCurrentChannel } from '../../store/slices/channelsSlice'
import { selectors as channelsSelector } from '../../store/slices/channelsSlice'
import { channelNameValidationSchema } from '../../utils/validationSchemas'
import { toast } from 'react-toastify'
import filter from 'leo-profanity'

const AddChannelModal = ({ show, onClose }) => {

    const { t } = useTranslation()

    const dispatch = useDispatch()
    const channels = useSelector(channelsSelector.selectAll)

    const inputRef = useRef(null)

    // if (!show) return null

    const notifyAdd = () => toast.success(`${t('toasts.addChannelSuccess')}`)

    return (

        <Modal show={show} onHide={onClose} onEntered={() => inputRef.current.focus()}> {/*onEntered - событие, кот срабатывает при открытии модалки и завершении анимации */}
            <Modal.Header closeButton>
                <Modal.Title>{t('modals.addChannel.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik 
                    initialValues={{name: ''}}
                    validationSchema={channelNameValidationSchema(t)}
                    onSubmit={async (values, { resetForm, setSubmitting, setFieldError }) => {
                        const filteredName = filter.clean(values.name)
                        if (filteredName.trim().length === 0) return
                        const channelNames = channels.map(channel => channel.name)
                        if (channelNames.includes(filteredName)) {
                            setFieldError('name', t('modals.addChannel.existError')) // передаем ошибку в ErrorMessage
                            return
                        }

                        try {
                            const result = await dispatch(fetchAddChannel(filteredName)).unwrap() // unwrapp() пробрасывает ошибки в catch !!!
                            notifyAdd()
                            console.log('Toast:', t('toasts.addChannelSuccess'))
                            dispatch(setCurrentChannel(result.id))
                            onClose()
                            resetForm()
                        }
                        catch (error) {
                            console.log('Creating channel error:', error)
                            // toast.error(t('toasts.addChannelError'))
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
                                <BootstrapForm.Label className='visually-hidden'>
                                    {t('modals.addChannel.label')}
                                </BootstrapForm.Label>
                                <Field name="name">
                                {({ field }) => (
                                    <BootstrapForm.Control 
                                        {...field}
                                        id='name'
                                        placeholder={t('modals.addChannel.placeholder')}
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
                                    <Button onClick={onClose} variant='secondary' className="me-2">{t('modals.addChannel.canselButton')}</Button>
                                    <Button type="submit" variant='primary' className="me-2" disabled={isSubmitting}>{t('modals.addChannel.addButton')}</Button>
                                </div>
                        </FormikForm>
                        )}
                        </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default AddChannelModal



