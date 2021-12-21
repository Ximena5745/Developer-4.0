import mongoose from 'mongoose';
import { ProjectModel } from '../proyecto/proyecto.js';
import { UserModel } from '../usuario/usuario.js';



const {Schema, model}= mongoose

const AdvanceProject =new Schema({
    
    project_id: {
        type: String,
        // required: true, 
    },
    date: {
        type:Date,  
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },
    observaciones: {
        type: String,
        required: true,
        },

    project: {
        type: Schema.Types.ObjectId,
        ref: ProjectModel,
        required: true,
      },

    });
    
    const ModeloAvance = model('Avance', AdvanceProject, 'Avances');

    export { ModeloAvance };
    