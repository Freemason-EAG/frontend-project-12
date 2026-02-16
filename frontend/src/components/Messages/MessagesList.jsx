const MessagesList = () => {
    const messages = {
        id1: {
            author: 'admin',
            value: 'value1',
        },
        id2: {
            author: 'user',
            value: 'value2',
        },
    }

    if (!messages) return <div className='mt-auto px-5 py-3'></div>
    return (
        <div id="messagesList" className="chat-messages overflow-auto px-5">
                {
                    Object.values(messages).map(({author, value}) => (
                        <div 
                            key={value}
                            className="text-break mb-2">
                                <b>{author}:</b>
                                {value}
                        </div>
                    ))
                }
        </div>
    )
}

export default MessagesList