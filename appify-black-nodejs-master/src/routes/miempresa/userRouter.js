import { Router } from 'express';
import { loginUser, 
    signUpSubUsuarioController, 
    updateSubUser,
    configPasswordSubUser,
    setpassForSubUser,
    getDataUserController,
    getAllUsersActController,
    getAllUsersInactController,
    testController,
    setpassForUser,
    getUserPrincipalValidation,
    sendMailController,
    signUpUsuarioBienvenidaController,
    returnTokenController
  } from '../../controllers/miempresa/userController.js';
import "dotenv/config";
import jwt from "jsonwebtoken";
const router = Router()


router.post('/login', loginUser);
router.get('/dataUser/:id', getDataUserController)
router.get('/allUsersAct/:userId', getAllUsersActController)
router.get('/allUsersInact/:userId', getAllUsersInactController)
router.post('/create-subuser', signUpSubUsuarioController)
router.put('/updUser/:userId', updateSubUser);
//esta ruta es para recibir el token y descifrarlo, se tiene que hacer en el lado del front, esta de example
router.get('/config-password', configPasswordSubUser)
//Ruta de seteo de contraseñas para usuario principal
router.put('/setPassForUser', setpassForUser)
//Seteo de contraseña para sub usuario
router.put('/set-password', setpassForSubUser)
//ENDPOINT PARA EL SOCKET, VALIDA EL SUPER USER
router.get('/validateSU/:id', getUserPrincipalValidation)
//ENDPOINT DE ENVIO DE MAIL
router.post('/send-mail', sendMailController)
router.post('/register', signUpUsuarioBienvenidaController)
router.post('/token', returnTokenController)
// HARCODEADO DE LA AGOS AL PALOOOOOOOOO CHANCHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

router.put('/editar-subusuario', async (req, res) => {
    const { permisos, user,data } = req.body;
    console.log(data)
    try {
      for (const permiso of permisos) {
        const { idPermiso, columnas } = permiso;
        
        for (const columna of columnas) {
          let sqlQuery = '';
  
          if (columna === "administrar") {
            await prisma.$queryRaw`UPDATE permisos_de_usuario SET ver = 0, administrar = 1, inactivo = 0 WHERE user = ${user} AND idPermiso = ${idPermiso}`;
          } else if (columna === "inactivo") {
            await prisma.$queryRaw`UPDATE permisos_de_usuario SET ver = 0, administrar = 0, inactivo = 1 WHERE user = ${user} AND idPermiso = ${idPermiso}`;
          } else if (columna === "ver") {
            await prisma.$queryRaw`UPDATE permisos_de_usuario SET ver = 1, administrar = 0, inactivo = 0 WHERE user = ${user} AND idPermiso = ${idPermiso}`;
          } else if (columna === "todo") {
            await prisma.$queryRaw`UPDATE permisos_de_usuario SET todo = 1, propietario = 0 WHERE user = ${user} AND idPermiso = ${idPermiso}`;
          } else if (columna === "propietario") {
            await prisma.$queryRaw`UPDATE permisos_de_usuario SET todo = 0, propietario = 1 WHERE user = ${user} AND idPermiso = ${idPermiso}`;
          }
        }
      }
      await prisma.subusuarios.update({
        where:{
          id: data.id,
          user: data.user
  
        },
        data:data
      })
      return res.status(200).json({ ok: true, message: 'permiso ingresado' });
    } catch (error) {
      console.error('Error al actualizar permiso:', error);
      return res.status(500).send('Error al actualizar permiso');
    }
  });


//ruta que es para testear
router.get('/setPassForToken/', testController)

//Middleware para verificar token y hay que cambiarlo a get en algun momento
const verifyToken = (req,res,next) =>{
  try{
    const token = req.body.tkn
    const validPayload = jwt.verify(token,process.env.SECRET_KEY_LOGIN)
    next()
  }catch(err){
    return res.status(401).json({ok:false,message:'invalid token', hola: token})
  }
}
//Funcion check auth
const checkAuth = async (req,res) =>{
  return res.status(200).json({ok:true,message:"auth token!"})
}

router.post('/api/check-auth',verifyToken,checkAuth)







export default router 


