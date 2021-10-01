export class receta {

    constructor(_id = "", id_creador = "", titulo = "", descripcion = "", 
    imagen = "", preparacion = "", ingrediente = "", nota = "",calificacion = 0) {
        this._id = _id;
        this.id_creador = id_creador;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.preparacion = preparacion;
        this.ingrediente = ingrediente;
        this.nota = nota;
        this.calificacion = calificacion;
      }
    _id:String;
    id_creador:String;
    titulo: String;
    descripcion: String;
    imagen: String;
    preparacion: String;
    ingrediente: String;
    nota: String;
    calificacion:Number
}
