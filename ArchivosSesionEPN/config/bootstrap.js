/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    cb();
    (
        function () {
            var usuario = { //crea un objeto
                nombre: 'Andres',
                usuario: 'andres',
                password: '123456'
            }
            Usuarios.create(usuario).exec(function (err, created) { //ejecuta el callback con los parametros
                if (err) {
                    sails.log.error('Error', err);
                } else {
                    sails.log.info('Usuario: ' + JSON.stringify(created));

                    /*Pokemons.create({
                        nombre: 'pikachu',
                        dueno: created.id
                    }).exec(function (err, createdPokemon) {
                        if (err) {
                            sails.log.error('Error', err);
                        } else {
                            sails.log.info('Pokemon: ' + JSON.stringify(createdPokemon));
                        }
                    })*/
                    //pokemon 2
                  /*Pokemons.create({
                    nombre: 'charmander',
                    dueno: created.id
                  }).exec(function (err, createdPokemon) {
                    if (err) {
                      sails.log.error('Error', err);
                    } else {
                      sails.log.info('Pokemon: ' + JSON.stringify(createdPokemon));
                    }
                  })
                  //fin pokemon 2
                  //pokemon 3
                  Pokemons.create({
                    nombre: 'volvasor',
                    dueno: created.id
                  }).exec(function (err, createdPokemon) {
                    if (err) {
                      sails.log.error('Error', err);
                    } else {
                      sails.log.info('Pokemon: ' + JSON.stringify(createdPokemon));
                    }
                  })
                  //fin pokemon 3*/
                }
            });
            //tambien se lo puede definir asi
            /*User.create({nombre: 'Andres',
                        usuario: 'andres',
                        password: '123456'});

                    */

        }
    )();
};
