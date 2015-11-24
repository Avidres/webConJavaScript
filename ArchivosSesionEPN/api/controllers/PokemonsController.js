/**
 * PokemonsController
 *
 * @description :: Server-side logic for managing Pokemons
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	guardarPokemon:function (req, res) {
    var params = req.allParams();

    sails.log.info('Nombre: ', params.pokemon, ' FotoPokemon: ', params.fotoPokemon, ' Usuario:', req.session.user);

    if (params.pokemon === undefined) {
      sails.log.warn('Envio incorrecto de parametros.');
      return res.badRequest('Envio incorrecto de parametros.');

    } else {
      var deleteFd = 'E:\\EPN\\8vo semestre\\Web con js\\deberes\\TecWebJav_2015_B-Permisos\\ArchivosSesionEPN\\assets\\images\\';
      sails.log.info('FotoPokemon: ', params.fotoPokemon);

      req.file('fotoPokemon').upload({
        // don't allow the total upload size to exceed ~10MB
        dirname: '../../assets/images/',
        maxBytes: 10000000
      }, function whenDone(err, uploadedFiles) {
        if (err) {
          return res.negotiate(err);
        }

        // If no files were uploaded, respond with an error.
        if (uploadedFiles.length === 0) {
          return res.badRequest('No file was uploaded');
        }

        console.log(uploadedFiles[0]);
        var urlImagen = uploadedFiles[0].fd.replace(deleteFd, "");

        // Save the "fd" and the url where the avatar for a user can be accessed
        // Generate a unique URL where the avatar can be downloaded.
        var fotoUrl = require('util').format('%s/pokemon/%s/%s', sails.getBaseUrl(), req.session.user.id, req.session.me);
        // Grab the first file and use it's `fd` (file descriptor)
        var fotoUrlFd = uploadedFiles[0].fd;
        var url = urlImagen;

        sails.log.info("urlImagen ", urlImagen);

        Pokemons.create({
            nombre: params.pokemon,
            dueno: req.session.user.id,
            fotoUrl: fotoUrl,
            fotoUrlFd: fotoUrlFd,
            url: urlImagen
          })
          .exec(function (err, createdPokemon) {
            if (err) {
              return res.negotiate(err);
            }
            sails.log.info('Pokemon creado: ', createdPokemon);
            // Response code 200
            return res.ok('Satisfactorio :)');
          });
      });
    }
  },
  descargarFoto: function (req, res) {

    req.validate({
      id: 'string'
    });

    Usuarios.findOne(req.param('id')).exec(function (err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();

      // User has no avatar image uploaded.
      // (should have never have hit this endpoint and used the default image)
      if (!user.avatarFd) {
        return res.notFound();
      }

      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk( /* optional opts */ );

      // Stream the file down
      fileAdapter.read(user.avatarFd)
        .on('error', function (err) {
          return res.serverError(err);
        })
        .pipe(res);
    });
  }

};

