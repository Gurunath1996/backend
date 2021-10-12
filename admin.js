module.exports = function(req,res,next){
    if(req.register.role==='employee') return res.status(403).send('Acess denied')
    next()
}