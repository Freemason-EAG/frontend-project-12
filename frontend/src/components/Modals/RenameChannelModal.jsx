import { Modal, Button, Form as BootstrapForm } from 'react-bootstrap'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEditChannel } from '../../store/slices/channelsSlice'
import { selectors as channelsSelector } from '../../store/slices/channelsSlice'
import { channelNameValidationSchema } from '../../utils/validationSchemas'
import { useRef } from 'react'


const RenameChannelModal = ({ show, onClose, channelId }) => {

    const dispatch = useDispatch()
    const channels = useSelector(channelsSelector.selectAll)

    const inputRef = useRef(null)

    if (!show) return 

    return (

        <Modal show={show} onHide={onClose} onEntered={() => inputRef.current.focus()}>
            <Modal.Header closeButton>
                <Modal.Title>Rename channel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik 
                    initialValues={{name: ''}}
                    validationSchema={channelNameValidationSchema}
                    onSubmit={async (values, { resetForm, setSubmitting, setFieldError }) => {
                        if (values.name.trim().length === 0) return
                        const channelNames = channels.map(channel => channel.name)
                        if (channelNames.includes(values.name)) {
                            setFieldError('name', 'Channel with this name already exists') // передаем ошибку в ErrorMessage
                            return
                        }

                        try {
                            await dispatch(fetchEditChannel({id: channelId, name: values.name})).unwrap() // unwrapp() пробрасывает ошибки в catch !!!
                            onClose()
                            resetForm()
                        }
                        catch (error) {
                            console.log('Rename channel error:', error)
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
                                    Current name
                                </BootstrapForm.Label>
                                <Field name="name">
                                
                                {({ field }) => (
                                    <BootstrapForm.Control 
                                        {...field}
                                        id='name'
                                        placeholder='New channel name'
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
                                    <Button onClick={onClose} variant='secondary' className="me-2">Cansel</Button>
                                    <Button type="submit" variant='primary' className="me-2" disabled={isSubmitting}>Send</Button>
                                </div>
                        </FormikForm>
                        )}
                        </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default RenameChannelModal
