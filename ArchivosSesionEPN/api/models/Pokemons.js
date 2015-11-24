/**
 * Pokemons.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        //Many to one
        dueno: {
            model: 'Usuarios' //es el modelo q tiene relacion con el pokemon. Tiene q tener el mismo nombre del q se encuentra en la carpeta models
        },
        nombre: {
            type: 'string'
        },
        fotoUrl: {
            type: 'string'
            //unique: true
        },
        fotoFd: {
            type: 'string'
            //unique: true
        },
        url: {
            type: 'string'
            //unique: true
        }
    }
};
