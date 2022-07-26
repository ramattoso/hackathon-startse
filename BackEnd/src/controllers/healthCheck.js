const  healthCheck = {
    health: (req,res)=> {
        res.sendStatus(200);
    }
};

export default healthCheck