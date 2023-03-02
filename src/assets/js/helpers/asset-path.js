var assetPath = ''
if (process.env.NODE_ENV === 'development') {
    assetPath = '/assets'
}
export default assetPath
