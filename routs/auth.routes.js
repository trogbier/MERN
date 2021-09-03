const {Router} = require('express')
const User = require('../Models/User')
const router = Router()
const bcryptjs = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

router.post(
    '/register',
    [
        check('email', 'Неправельный email').isEmail(),
        check('password', 'Неправельный password').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({errors:errors.array(),message: 'некоректые данные'})
            }
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'такой пользователь уже существует'})
            }
            const hashedPassword = await bcryptjs.hash(password, 8)
            const user = new User({email: email, password: hashedPassword})
            await user.save()

            res.status(201).json({message: 'пользователь создан'})

        } catch (e) {
            res.status(500).json({message: 'чтор то пошло не так...'})
        }
    })
router.post(
    '/login',
    [
        check('email', 'Неправельный email').isEmail(),
        check('password', 'Неправельный password').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({errors:errors.array(),message: 'некоректые данные'})
            }
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: 'пользователь не найден'})
            }
            const isMath = await bcryptjs.compare(password, user.password)
            if (!isMath) {
                return res.status(400).json({message: 'пароль не верный'})
            }
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id})
        } catch (e) {
            res.status(500).json({message: 'что топ пошло не так...'})
        }
    })


module.exports = router