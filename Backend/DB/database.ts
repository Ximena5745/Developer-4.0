import { connect } from 'mongoose';

//const mongoose = require('moongoose');

const conectarBD = async () => {
    return await connect(
      'mongodb+srv://Ximena6745:adminproyectos@developers.iy3pj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

    )
      //.connect(process.env.DATABASE_URL)
      .then(() => {
        console.log('Conexion exitosa');
      })
      .catch((e) => {
        console.error('Error conectando a la bd', e);
      });
  };
  

  
  export default conectarBD;