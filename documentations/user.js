
/**
 * @swagger
 * post:
 * /api/users/check-existance:
 *  post:
 *    description: check if an email already exists before adding it
 *    tags:
 *    - users
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
 *        description: account found or not
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
 *                 exist:
 *                   type: boolean
 *      '400':
 *        description: no email found in the body
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
 * /api/users/:
 *  post:
 *    description: create new user for api testing
 *    tags:
 *    - users
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
 *              username:
 *                 type: string
 *              email:
 *                 type: string
 *              password:
 *                 type: string
 *    responses:
 *      '201':
 *        description: rnew user succefully created
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
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *      '400':
 *        description: no email , password or username found in the body
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '409':
 *        description: user was not created
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
