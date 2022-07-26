export default (req,res, next) => {
    console.log(`O IP: ${req.ip} acesou a rota: ${req.originalUrl} `);
    next();
};