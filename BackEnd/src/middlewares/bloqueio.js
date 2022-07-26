export default (req,res,next) => {
    const {pass}=req.query;
    
    if(!pass || pass!=='123') {
        return res.status(400).json("errado");
    }

    next();
};