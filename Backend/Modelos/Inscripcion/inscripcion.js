import mongoose from 'mongoose';
import { Projectm } from '../Proyecto/Proyecto.js';
import { UserModel } from '../Usuario/usuario.js';

const { Schema, model } = mongoose;


const Registration =new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: Projectm,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
      },
      status: {
        type: String,
        enum: ['ACEPTADO', 'RECHAZADO', 'PENDIENTE'],
        default:'PENDIENTE',
        required: true,
      },
      enrollmentDate: {
        type: Date,
        required: true,
      },
      egressDate: {
        type: Date,
        required: true,
      }
    
})

const InscriptionModel = model('Inscripcion', Registration, 'Registros');

export { InscriptionModel };