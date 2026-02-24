import { Formik,  Form, Field } from 'formik'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import routes from '../../utils/routes'
import axios from 'axios'
import filter from 'leo-profanity'


const { messagesPath } = routes


const MessageForm = () => {

    const { t } = useTranslation()

    const currentChannelId = useSelector(state => state.channels.currentChannelId)
    const username = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)

    return (
        <div className='mt-auto px-5 py-3'>
            <Formik
                initialValues={{text: ''}}
                onSubmit={async (values, {resetForm, setSubmitting}) => {
                    const filteredMessage = filter.clean(values.text)
                    if (filteredMessage.trim().length === 0) return 
                    const messageData = {
                        body: filteredMessage,
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
                        console.log('Send error:', error)
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
                        aria-label={t('messages.formAriaLabel')} 
                        placeholder={t('messages.formPlaceholder')}
                        autoFocus 
                        className='border-0 p-0 ps-2 form-control'
                        />
                        <button type='submit' className='btn btn-group-vertical'>
                            <span>{t('messages.formSend')}</span>
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default MessageForm