/* import { createProducts } from '../utils/createProducts.js'
import { User } from "../models/User.js"
import passport from "passport"
import '../config/passport.js' */

const { createProducts } = require('../utils/createProducts.js')
const { User } = require('../models/User.js')
const passport = require('passport')
require('../config/passport.js')

// registrando usuario
const signup = async (req, res) => {
    const { email, password } = req.body

    // Comprobando que no existen el mail
    const userFound = await User.findOne({ email: email })
    if (userFound) {
        return res.redirect("/api/error-registro")
    }

    // Guardando el usuario
    const newUser = new User({ email, password })
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save()
    return res.redirect("/api/login")
};

// Logueando usuario
const signin = passport.authenticate('local', {
    successRedirect: "/api/productos-test",
    failureRedirect: "/api/error-login",
})

// deslogueando usuario
const logout = async (req, res, next) => {
    let idSession = await req.session.passport.user
    let userInfo = await User.findOne({ '_id': idSession })
    let email = userInfo.email
    await req.logout((err) => {
        if (err) return next(err)
        return res.render("saludo", { email })
    })
}

// comprobando autenticaicon
const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/api/login');
    }
}

// Funcion para obtener info del usuario
const sessionController = async (req, res) => {
    let infoProducts = createProducts()
    let idSession = await req.session.passport.user
    let userInfo = await User.findOne({ '_id': idSession })
    res.render('prodTable', { infoProducts, email: userInfo.email })
}

module.exports = {
    signup,
    signin,
    logout,
    auth,
    sessionController
}