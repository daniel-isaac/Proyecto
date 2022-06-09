const express = require('express');
const res = require('express/lib/response');
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

    
});

router.get('/crear', (req,res)=>{
    res.render('crear');
});

router.post('/buscar', async(req,res)=>{
    console.log(req.body.input)
    try {
        
        const arrayJuegos = await Juego.find({descripcion : { "$regex": req.body.input, "$options": "i" }})
        console.log(arrayJuegos.length);

        res.render("juegos", {
            arrayvideojuegos: arrayJuegos
        })

    } catch (error) {
        console.log(error)
    }

    //res.render('buscar',{})
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


router.put('/:id', async(req,res) =>{
    const id = req.params.id;
    const body = req.body;
    try {
        const juegoDB = await Juego.findByIdAndUpdate(id, body, {useFindAndModify: false});
        console.log(juegoDB);
        res.json({
            estado: true,
            mensaje: 'Editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Fallamos'
        })
    }
});



module.exports = router;
