var debugMode = false
// If Development Mode Set debug to true
if (process.env.NODE_ENV === 'development') {
    debugMode = true
}
exports.debugMode = debugMode
