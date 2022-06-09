const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // console.log(__dirname)
    res.render("index", {titulo : "mi titulo dinámico"})
})

router.get('/descarga', function(req, res){
    const file = `${__dirname}/../Proyecto.zip`;
    res.download(file); 
});

module.exports = router;