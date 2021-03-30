//const tf = require('@tensorflow/tfjs-node');
const eController = require ('./errorController');

exports.serveCNN = (req, res, next) => {
    // const path;
    // const signatureKey;
    // const input;

    //segun doc oficial de tensorflow
    //const model = await tf.node.loadSavedModel(path, signatureKey);
    //const output = model.predict(input);

    const cargarDatos = () => {
        let flag = false;
        let loadModel = new Promise((resolve, reject) => {
            //cargar el modelo
            //const model = await tf.node.loadSavedModel(path, signatureKey);
            resolve('Todo bien');
        });
        let loadTrack = new Promise((resolve, reject) => {
            //cargar la pista de audio
            reject('La pista no se ha cargado');
        });
    
        Promise.all([loadModel, loadTrack]).then(values => {
                console.log(values);
                flag = true;
                console.log(flag);
                return flag;
            }).then(values => {
                console.log(flag);
                console.log('segundo then');
                //const output = model.predict(input);
                //return output;
            }).catch(e => {
                console.log(e);
                flag = false;
                console.log(flag);
                eController.e500(req, res, next);
            });
    }


    cargarDatos();
}

