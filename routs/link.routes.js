const {Router} = require('express')
const router = Router()
const shortid = require('shortid')
const Link = require('../Models/Link')
const config = require("config");
const auth = require("../middleware/auth.middleware");

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body
        const code = shortid.generate()

        const existing = await Link.findOne({from})
        if (existing) {
            return res.json({link: existing})
        }
        const to = baseUrl + '/t/' + code
        const link = new Link({
            from, to, code, owner: req.user.userId
        })
        await link.save()
        res.status(201).json({link})
    } catch (e) {
        res.status(500).json({e})
    }
})
router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'что то пошло не так...'})
    }
})
router.get('/:id', auth, async (req, res) => {
    try {
        const links = await Link.findById(req.params.id)
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'что то пошло не так...'})
    }
})
module.exports = router