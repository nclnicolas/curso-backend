import session from "express-session"
import MongoStore from 'connect-mongo'
import { dbsConfig } from './dbsConnect.js'

export default session({
    store: MongoStore.create({ 
        mongoUrl: dbsConfig.mongodbAtlas.uri,
        mongoOptions: dbsConfig.mongodbAtlas.options
    }),
    secret: 'mongoSecret',
    resave: false ,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000
    }
})