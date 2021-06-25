const express = require('express');
const router = express.Router();

const restController = require('../controllers/restController');

const auth = require('../services/autenticacion');

/**
 * @swagger
 * /api/login:
 *  post:
 *      summary: Authentication
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
 *          '201':
 *              description: Authentication succesful
 *          '400':
 *              description: User not found
 *          '401':
 *              description: Wrong password
 * 
 */
router.post('/api/login', restController.restLogin);

/**
 * @swagger
 * /api/separate:
 *  post:
 *      summary: Track separation
 *      description: Upload files to get file separation
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
 *          '422': 
 *              description: Unprocessable entity
 * 
 */
router.post('/api/separate', auth.validateToken, restController.restSpleeter);

module.exports = router;