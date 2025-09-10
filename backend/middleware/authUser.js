import jwt from 'jsonwebtoken';

// user auth middleware
const authUser = async (req, res, next) => {

    // const { token } = req.headers;
     const token = req.cookies.token; 
    //  console.log(token);

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(token_decode);
        req.body.userId = token_decode.id;
        next();
        
    } catch (error) {

        console.error(error);
        res.clearCookie('token');

        res.json({ success: false, message: error.message });
    }
}

export default authUser;
