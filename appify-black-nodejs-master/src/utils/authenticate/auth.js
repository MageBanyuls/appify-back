import jwt from "jsonwebtoken"
function authenticateToken(req, res, next) {
    // Obtener el token del encabezado de la solicitud
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer Token
    if (token == null) {
        return res.sendStatus(401); // Si no hay token, retorna un error 401 Unauthorized
    }
    // Verificar el token
    jwt.verify(token, process.env.SECRET_KEY_LOGIN, (err) => {
        if (err) {
            return res.sendStatus(403); // Retorna un error 403 Forbidden si el token no es válido
        }
        next(); // Pasar el control al siguiente middleware
    });
}

export default authenticateToken
