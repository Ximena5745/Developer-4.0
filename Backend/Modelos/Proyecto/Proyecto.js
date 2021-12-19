import mongoose from 'mongoose';
import { ObjectiveModel } from '../objective.js';
import { UserModel } from '../usuario/usuario.js';
const { Schema, model } = mongoose;

const projectSchema = new Schema({
      nameproject: {
        type: String,
        unique:true,
        required: true,
      },
      objective: [
        {
        description:{
          type: String,
          required: true,
        },
        tipo: {
          type: String,
          enum: ['GENERAL', 'ESPECIFICO'],
          required: true,
        },
      },
    ],
 
      budget: {
        type: Number,
        required: true,
      },
      stardate: {
        type: Date,
        required: true,
      },
      enddate: {
        type: Date,
        required: true,
      },
      leader: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:UserModel,
      },
      status: {
        type: String,
        enum: ['ACTIVO', 'INACTIVO'],
        default:"INACTIVO",
      },
      phase: {
        type: String,
        enum: ['INICIADO', 'DESARROLLO', 'TERMINADO', 'NULO'],
        default: 'NULO'
      },
    },

{
  toJSON: { virtuals: true }, 
  toObject: { virtuals: true }, 

}
);


projectSchema.virtual('avances', {
  ref: 'Avance',
  localField: '_id',
  foreignField: 'Proyecto',
}),

projectSchema.virtual('inscripciones', {
  ref: 'Inscripcion',
  localField: '_id',
  foreignField: 'Proyecto',
});

const Projectm = model('Proyecto', projectSchema);

export { Projectm};