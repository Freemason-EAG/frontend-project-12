const apiPath = '/api/v1'

export default {
    signupPath: () =>  [apiPath, 'signup'].join('/'),
    loginPath: () => [apiPath, 'login'].join('/'),
    channelsPath: () => [apiPath, 'channels'].join('/'),
    channelPath: (id) => [apiPath, 'channels', id].join('/'),
    messagesPath: () => [apiPath, 'messages'].join('/'),
    messagePath: (id) => [apiPath, 'messages', id].join('/'),
}