const {Router} = require('express')
const Link = require('../Models/Link')
const router = Router()

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({code: req.params.code})
        if (link) {
            link.click++
            await link.save()
            return res.redirect(link.from)
        }
        res.status(404).json({message: 'что то пошло не так...'})

    } catch (e) {
        res.status(500).json({message: 'что то пошло не так...'})
    }
})

module.exports = router
