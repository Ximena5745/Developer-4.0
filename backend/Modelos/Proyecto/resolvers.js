import { InscriptionModel } from '../Inscripcion/inscripcion.js';
import { UserModel } from '../Usuario/usuarios.js';
import { ProjectModel } from './proyecto.js';

const resolversProyecto = {
  Proyecto: {
    lider: async (parent, args, context) => {
      const usr = await UserModel.findOne({
        _id: parent.lider.toString(),
      });
      return usr;
    },
    inscripciones: async (parent, args, context) => {
      const inscripciones = await InscriptionModel.find({
        project: parent._id,
      });
      return inscripciones;
    },
  },
  Query: {
    Proyectos: async (parent, args, context) => {
      if (context.userData) {
        if (context.userData.rol === 'LIDER') {
          const proyectos = await ProjectModel.find({ leader: context.userData._id });
          return proyectos;
        } else if (context.userData.rol === 'LIDER') {
          // const proyectos = await ProjectModel.find({ lider: context.userData._id });
          // return proyectos;
        }
      }
      const proyectos = await ProjectModel.find();
      return proyectos;
    },
  },
  Mutation: {
    crearProyecto: async (parent, args, context) => {
      const proyectoCreado = await ProjectModel.create({
        nameproject: args.nameproject,
        stardate: args.stardate,
        enddate: args.enddate,
        budget: args.budget,
        leader: args.leader,
        objective: args.objective,
      });
      return proyectoCreado;
    },
    editarProyecto: async (parent, args) => {
      const proyectoEditado = await ProjectModel.findByIdAndUpdate(
        args._id,
        { ...args.campos },
        { new: true }
      );

      return proyectoEditado;
    },
    crearObjetivo: async (parent, args) => {
      const proyectoConObjetivo = await ProjectModel.findByIdAndUpdate(
        args.idProject,
        {
          $addToSet: {
            objetivos: { ...args.campos },
          },
        },
        { new: true }
      );

      return proyectoConObjetivo;
    },
    editarObjetivo: async (parent, args) => {
      const proyectoEditado = await ProjectModel.findByIdAndUpdate(
        args.idProject,
        {
          $set: {
            [`objetivos.${args.indexObjetivo}.description`]: args.campos.description,
            [`objetivos.${args.indexObjetivo}.tipo`]: args.campos.tipo,
          },
        },
        { new: true }
      );
      return proyectoEditado;
    },
    eliminarObjetivo: async (parent, args) => {
      const proyectoObjetivo = await ProjectModel.findByIdAndUpdate(
        { _id: args.idProject },
        {
          $pull: {
            objetivos: {
              _id: args.idObjetivo,
            },
          },
        },
        { new: true }
      );
      return proyectoObjetivo;
    },
  },
};

export { resolversProyecto };
