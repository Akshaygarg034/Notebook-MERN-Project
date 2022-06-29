const express = require('express');
const router  = express.Router();

router.get('/', (req, res)=>{
    obj={
        name:'auth'
    }
    res.json(obj);
})

module.exports = router