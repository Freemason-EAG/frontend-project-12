import { Modal, Button, Form as BootstrapForm } from 'react-bootstrap'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddChannel } from '../../store/slices/channelsSlice'
import { selectors as channelsSelector } from '../../store/slices/channelsSlice'
import { channelNameValidationSchema } from '../../utils/validationSchemas'

const AddChannelModal = ({ show, onClose }) => {

    const dispatch = useDispatch()
    const channels = useSelector(channelsSelector.selectAll)

    if (!show) return null

    return (

        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add channel</Modal.Title>
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
                            await dispatch(fetchAddChannel(values.name)).unwrap() // unwrapp() пробрасывает ошибки в catch !!!
                            onClose()
                            resetForm()
                        }
                        catch (error) {
                            console.log('Creating channel error:', error)
                        }
                        finally {
                            setSubmitting(false)
                        }
                    }}
                    className="modal-body"
                    >
                        {({ errors, touched }) => (
                        <FormikForm>
                            <BootstrapForm.Group>
                                <BootstrapForm.Label className='visually-hidden'>
                                    Channel name
                                </BootstrapForm.Label>
                                <Field 
                                name="name" 
                                id="name"
                                as={BootstrapForm.Control}
                                placeholder="Channel name" 
                                isInvalid={touched.name && !!errors.name}
                                />
                                <ErrorMessage 
                                name="name"
                                component="div"
                                className="invalid-feedback d-block" />
                            </BootstrapForm.Group>

                                <div className="d-flex justify-content-end mt-2">
                                    <Button onClick={onClose} variant='secondary' className="me-2">Cansel</Button>
                                    <Button type="submit" variant='primary' className="me-2">Add</Button>
                                </div>
                        </FormikForm>
                        )}
                        </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default AddChannelModal


        // <div onClick={onClose} role="dialog" aria-modal="true" className="fade modal show" style={{ display: show ? 'block' : 'none' }}> 
        //     <div onClick={(e) => e.stopPropagation()} className="modal-dialog modal-dialog-centered">
        //         <div className="modal-content">
        //            <div className="modal-header">
        //                 <div className="modal-title h4">Add channel</div>
        //                 <button onClick={onClose} type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close"></button>
        //             </div>
        //             <Formik 
        //             initialValues={{name: ''}}
        //             validationSchema={channelNameValidationSchema}
        //             onSubmit={async (values, { resetForm, setSubmitting, setFieldError }) => {
        //                 if (values.name.trim().length === 0) return
        //                 const channelNames = channels.map(channel => channel.name)
        //                 if (channelNames.includes(values.name)) {
        //                     setFieldError('name', 'Channel with this name already exists') // передаем ошибку в ErrorMessage
        //                     return
        //                 }

        //                 try {
        //                     await dispatch(fetchAddChannel(values.name)).unwrap() // unwrapp() пробрасывает ошибки в catch !!!
        //                     onClose()
        //                     resetForm()
        //                 }
        //                 catch (error) {
        //                     console.log('Creating channel error:', error)
        //                 }
        //                 finally {
        //                     setSubmitting(false)
        //                 }
        //             }}
        //             className="modal-body"
        //             >
        //                 <Form className="">
        //                     <div>
        //                         <Field 
        //                         name="name" 
        //                         id="name" 
        //                         className="mb-2 form-control" 
        //                         />
        //                         <label className="visually-hidden" htmlFor="name">Channel name</label>
        //                         <ErrorMessage 
        //                         name="name"
        //                         component="div"
        //                         className="invalid-feedback d-block" />
        //                         <div className="d-flex justify-content-end">
        //                             <button onClick={onClose} type="button" className="me-2 btn btn-secondary">Cansel</button>
        //                             <button type="submit" className="btn btn-primary">Send</button>
        //                         </div>
        //                     </div>
        //                 </Form>
        //             </Formik>
        //         </div>
        //     </div>
        // </div>