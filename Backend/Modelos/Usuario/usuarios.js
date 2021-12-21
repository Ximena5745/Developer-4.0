import mongoose from 'mongoose';
import { UserModel } from '../Usuario/usuarios';

const { Schema, model } = mongoose;


const userSchema = new Schema({
    

    fullname: {
        type: String,
        required: true,
    },
    identification: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //validator: (email) => {
            //return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            //message: 'El formato del correo electrónico no es correcto.',
        },
    password: { 
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['ESTUDIANTE', 'LIDER', 'ADMINISTRADOR'],
    },
    status: {
        type: String,
        required: true,
        enum: ['PENDIENTE', 'AUTORIZADO', 'NO_AUTORIZADO'],
        default: 'PENDIENTE',
    }
});

userSchema.virtual('proyectosLiderados', {
    ref: 'Proyecto',
    localField: '_id',
    foreignField: 'lider',
  });
  
  userSchema.virtual('avancesCreados', {
    ref: 'Avance',
    localField: '_id',
    foreignField: 'creadoPor',
  });
  
  userSchema.virtual('inscripciones', {
    ref: 'Inscripcion',
    localField: '_id',
    foreignField: 'estudiante',
  });
  
  const UserModel = model('User', userSchema, 'Usuarios');
  
  export { UserModel };
  
