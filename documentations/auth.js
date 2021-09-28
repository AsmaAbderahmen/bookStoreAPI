/**
 * @swagger
 * post:
 * /api/auth/signin:
 *  post:
 *    description: user signin
 *    tags:
 *    - auth
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: body
 *         in: body
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *              email:
 *                 type: string
 *              password:
 *                 type: string
 *    responses:
 *      '200':
 *        description: success login
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *             data:
 *               type: object
 *               properties:
 *                  token:
 *                   type: string
 *                  refresh_token:
 *                   type: string
 *                  user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type : string
 *                     username:
 *                       type : string
 *                     email:
 *                       type : string
 *      '400':
 *        description: no email or password found in the body
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '406':
 *        description: wrong credentials
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '500':
 *        description: Internal Server Error
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 */

/**
 * @swagger
 * post:
 * /api/auth/refresh-token:
 *  post:
 *    description: token refresh route; the token will be refreshed if the refresh token is not expired unless the user will need to reconnect
 *    tags:
 *    - auth
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: body
 *         in: body
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *              refresh_token:
 *                 type: string
 *    responses:
 *      '200':
 *        description: refresh token is valid and a new token is returned
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *             data:
 *               type: object
 *               properties:
 *                  token:
 *                   type: string
 *      '400':
 *        description: no refresh_token found in the body
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '401':
 *        description: expired refresh_token
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '500':
 *        description: Internal Server Error
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 */

/**
 * @swagger
 * post:
 * /api/auth/change-password:
 *  post:
 *    security:
 *      - Bearer: []
 *    description: change a user's password
 *    tags:
 *    - auth
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: body
 *         in: body
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *              new_password:
 *                 type: string
 *              old_password:
 *                 type: string
 *    responses:
 *      '200':
 *        description: correct password
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '400':
 *        description: no password found in the body
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '409':
 *        description: equal old and new passswords
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
  *      '406':
 *        description: wrong old passowrd
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '500':
 *        description: Internal Server Error
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 */

/**
 * @swagger
 * post:
 * /api/auth/forget-password/send-email:
 *  post:
 *    description: send an email containing a random code for confirming user before password changing
 *    tags:
 *    - auth
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: body
 *         in: body
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *              email:
 *                 type: string
 *    responses:
 *      '200':
 *        description: email  sent
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '400':
 *        description: no email found in the body
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
  *      '406':
 *        description: wrong credentials
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '500':
 *        description: Internal Server Error
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 */

/**
 * @swagger
 * post:
 * /api/auth/forget-password/verify-code:
 *  post:
 *    description: verify the code sent to the user for password recovering
 *    tags:
 *    - auth
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: body
 *         in: body
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *              email:
 *                 type: string
 *              code:
 *                 type: string
 *    responses:
 *      '200':
 *        description: valid code
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '400':
 *        description: no email or code found in the body
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '409':
 *        description: expired code
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '408':
 *        description: wrong code
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '406':
 *        description: user not found
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '500':
 *        description: Internal Server Error
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 */

/**
 * @swagger
 * post:
 * /api/auth/forget-password/new-password:
 *  post:
 *    description: new password after validating the code
 *    tags:
 *    - auth
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: body
 *         in: body
 *         required: false
 *         schema:
 *           type: object
 *           properties:
 *              email:
 *                 type: string
 *              password:
 *                 type: string
 *    responses:
 *      '200':
 *        description: password updated
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '400':
 *        description: no email or code found in the body
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '406':
 *        description: user not found
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '500':
 *        description: Internal Server Error
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 */
