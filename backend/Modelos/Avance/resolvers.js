import { Projectmodel } from '../Proyecto/proyecto.js';
import { ModeloAvance } from './avances.js';

const resolversAvance = {
  Query: {
    Avances: async (parent, args) => {
      let filter = {};
      if (args.project) {
        filter = { ...args };
      }
      const avances = await ModeloAvance.find(filter).populate('project').populate('usuario');
      return avances;
    },
    filtrarAvance: async (parents, args) => {
      const avanceFiltrado = await ModeloAvance.find({ project: args._id })
        .populate('project')
        .populate('usuario');
      return avanceFiltrado;
    },
  },
  Mutation: {
    crearAvance: async (parents, args) => {
      const avanceCreado = await ModeloAvance.create({
        date: args.date,
        description: args.description,
        project: args.project,
        usuario: args.usuario,
        observaciones:args.observaciones
      });

      const avances = await ModeloAvance.find({ proyecto: avanceCreado.project });

      if (avances.length === 1) {
        const proyectoModificado = await Projectmodel.findOneAndUpdate(
          { _id: avanceCreado.project },
          {
            fase: 'DESARROLLO',
          }
        );
        console.log('proy modificado', proyectoModificado);
      }

      return avanceCreado;
    },
  },
};

export { resolversAvance };
