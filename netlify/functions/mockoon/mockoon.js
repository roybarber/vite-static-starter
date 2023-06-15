const mockoon = require('@mockoon/serverless')
const mockEnv = require('../../../api/api.json')
const serverless = require('serverless-http')
const mockoonServerless = new mockoon.MockoonServerless(mockEnv)

exports.handler = serverless(mockoonServerless.firebaseApp())
