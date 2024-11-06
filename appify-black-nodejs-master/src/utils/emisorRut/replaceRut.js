export const cleanRut = (rut)=>{
    const regex = /-.*/g;
    return rut.replace(regex, '');
}