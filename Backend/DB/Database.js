const mongoose = require('mongoose');

const conectarBD = async () => {
    return await mongoose
      .connect(process.env.DATABASE_URL)
      .then(() => {
        console.log('Conexion exitosa');
      })
      .catch((e) => {
        console.error('Error conectando a la bd', e);
      });
  };
  

  mongodb+srv://Ximena6745:adminproyectos@developers.iy3pj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
  export default conectarBD;