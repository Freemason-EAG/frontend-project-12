import { Formik,  Form, Field } from 'formik'

const MessageForm = () => {

    return (
        <div className='mt-auto px-5 py-3'>
            <Formik
                initialValues={{text: ''}}
                onSubmit={(values, {resetForm, setSubmitting}) => {
                    console.log(values.text)
                    resetForm()
                    setSubmitting(false)
                    }}
                >
                <Form noValidate className='py-1 border rounded-2'>
                    <div className='input-group has-validation'>
                        <Field 
                        name='text' 
                        aria-label='New message' 
                        placeholder='Enter a new message...' 
                        autoFocus 
                        className='border-0 p-0 ps-2 form-control' 
                        />
                        <button type='submit' className='btn btn-group-vertical'>
                            <span>Send</span>
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default MessageForm