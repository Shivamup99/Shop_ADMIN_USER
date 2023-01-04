import  expressjwt  from 'express-jwt'



function authJwt(){
    const secret = process.env.JWT_SECRET;
    //const {jwt} = expressJwt
    return expressjwt({
        secret:secret,
        algorithms:['HS256']
    }).unless({
        path:[
            // {url:/\/api\/products(.*)/,methods:['GET','OPTIONS']},
            // {url:/\/api\/category(.*)/,methods:['GET','OPTIONS']},
            '/api/user/login',
            '/api/user/register'
        ]
    })
}

export default authJwt;