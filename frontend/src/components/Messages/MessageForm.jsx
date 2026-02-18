import { Formik,  Form, Field } from 'formik'
import { useSelector } from 'react-redux'
import routes from '../../utils/routes'
import axios from 'axios'

const { messagesPath } = routes


const MessageForm = () => {
    const currentChannelId = useSelector(state => state.channels.currentChannelId)
    const username = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)

    return (
        <div className='mt-auto px-5 py-3'>
            <Formik
                initialValues={{text: ''}}
                onSubmit={async (values, {resetForm, setSubmitting}) => {
                    if (values.text.trim().length === 0) return 
                    const messageData = {
                        body: values.text,
                        channelId: currentChannelId,
                        username: username,
                    }
                    try {
                        await axios.post(messagesPath(), messageData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    resetForm()
                    }
                    catch (error) {
                        console.log('Ошибка отправки:', error)
                    }
                    finally {
                        setSubmitting(false)
                    }
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