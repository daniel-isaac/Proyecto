const express = require('express');
const router = express.Router();

const Juego = require('../models/videojuegos')

router.get('/', async (req, res) => {
    
    try {
        
        const arrayJuegos = await Juego.find()

        res.render("juegos", {
            arrayvideojuegos: arrayJuegos
        })

    } catch (error) {
        console.log(error)
    }

    
})

router.get('/crear', (req,res)=>{
    res.render('crear');
});

router.post('/', async (req, res) => {
    const body = req.body;
    try {
        await Juego.create(body);
        res.redirect('/juegos');
    } catch (error) {
        console.log('error',error);
    }
});

router.get('/:id', async(req, res)=>{
    const id = req.params.id;

    try {
        const juegoDB = await Juego.findOne({_id: id});
        res.render('editar',{ juego:juegoDB,
        error:false });
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', async(req, res) =>{
    const id = req.params.id;
    try {
        const juegoDB = await Juego.findByIdAndDelete({_id:id});
        if(juegoDB){
            res.json({estado: true, mensaje:'eliminado'});
        } else{

            res.json({estado: false, mensaje:'fallo eliminar'})
        }

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;