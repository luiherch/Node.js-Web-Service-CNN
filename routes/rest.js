const express = require('express');
const router = express.Router();
const {check} = require('express-validator/check');

const restController = require('../controllers/restController');

const auth = require('../services/autenticacion');

/**
 * @swagger
 * tags:
 *  name: Auth
 */

/**
 * @swagger
 * /api/login:
 *  post:
 *      summary: Authentication
 *      tags: [Auth]
 *      description: Route to log in with the credentials
 *      consumes:
 *       - application/x-www-form-urlencoded
 *      parameters:
 *       - in: formData
 *         name: email
 *         type: string 
 *       - in: formData
 *         name: pw
 *         type: string
 *      responses:
 *          '200':
 *              description: Authentication succesful
 *          '400':
 *              description: User not found
 *          '401':
 *              description: Wrong password
 *          '422':
 *              description: Validation issue
 * 
 */
router.post('/api/login', check('email').isEmail(), restController.restLogin);


/**
 * @swagger
 * tags:
 *  name: Separation
 */


/**
 * @swagger
 * /api/separate:
 *  post:
 *      summary: Track separation
 *      tags: [Separation]
 *      description: Upload files to get file separation. Remember you need to pass the jwt to header['access-token']
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - in: formData
 *          name: audio_track
 *          type: file
 *          description: The audio file to separate
 *          required: true
 *        - in: formData
 *          name: stems
 *          type: string
 *        - in: formData
 *          name: bitrate
 *        - in: formData
 *          name: codec
 *      responses:
 *          '200':
 *              description: Success
 *          '401':
 *              description: No authenticated
 *          '422': 
 *              description: Unprocessable entity
 * 
 */
router.post('/api/separate', auth.validateToken, restController.restSpleeter);

module.exports = router;