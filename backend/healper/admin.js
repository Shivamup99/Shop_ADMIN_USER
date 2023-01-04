function admin (req,res,next){
    //console.log(req.user.isAdmin)
    try {
        if (req.user.isAdmin === false) {
            return res.status(400).json({ message: "Access denied" });
        }
        next();
    } catch (e) {
        return res.status(500).json({ message: "An error has occured" });
    }
}

export default admin;