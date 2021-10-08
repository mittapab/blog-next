exports.time = (req , res) => {
    res.json({
        date: Date().toString() ,
        data: 'I am server'
    })
}