import { UserModel } from './usuarios.js';
import bcrypt from 'bcrypt';
import { InscriptionModel } from '../Inscripcion/inscripcion.js';

const resolversUsuario = {
  Usuario: {
    inscripciones: async (parent, args, context) => {
      return InscriptionModel.find({ usuario: parent._id });
    },
  },
  Query: {
    Usuarios: async (parent, args, context) => {
      const usuarios = await UserModel.find({ ...args.filtro });
      return usuarios;
    },
    Usuario: async (parent, args) => {
      const usuario = await UserModel.findOne({ _id: args._id });
      return usuario;
    },
  },
  Mutation: {
    crearUsuario: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const usuarioCreado = await UserModel.create({
        fullname: args.fullname,
        identification: args.identification,
        email: args.email,
        role: args.role,
        password: hashedPassword,
      });

      if (Object.keys(args).includes('status')) {
        usuarioCreado.estado = args.status;
      }

      return usuarioCreado;
    },
    editarUsuario: async (parent, args) => {
      const usuarioEditado = await UserModel.findByIdAndUpdate(
        args._id,
        {
            fullname: args.fullname,
            identification: args.identification,
            email: args.email,
            role: args.role,
            status: args.status,
        },
        { new: true }
      );

      return usuarioEditado;
    },
    editarPerfil: async (parent, args) => {
      const usuarioEditado = await UserModel.findOneAndUpdate(
        args._id,
        { ...args.campos },
        { new: true }
      );
      return usuarioEditado;
    },
    eliminarUsuario: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const usuarioEliminado = await UserModel.findOneAndDelete({ _id: args._id });
        return usuarioEliminado;
      } else if (Object.keys(args).includes('email')) {
        const usuarioEliminado = await UserModel.findOneAndDelete({ email: args.email });
        return usuarioEliminado;
      }
    },
  },
};

export { resolversUsuario };
