/**
 * @swagger
 * post:
 * /api/authors/check-existance:
 *  post:
 *    security:
 *      - Bearer: []
 *    description: check if an authors already exists before adding it
 *    tags:
 *    - authors
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
 *              fullname:
 *                 type: string
 *    responses:
 *      '200':
 *        description: author found or not
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
 * /api/authors/:
 *  post:
 *    security:
 *      - Bearer: []
 *    description: create new author 
 *    tags:
 *    - authors
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: fullname
 *         in: formData
 *         required: true
 *         description:  the author fullname
 *         type: string
 *       - name: biography
 *         in: formData
 *         required: false
 *         description:  the author biography
 *         type: string
 *       - name: image
 *         in: formData
 *         required: false
 *         description:  the author image
 *         type: file
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
 *                 fullname:
 *                   type: string
 *                 image:
 *                   type: string
 *                 biography:
 *                   type: string
 *      '400':
 *        description: no fullname found in the body
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '409':
 *        description: authoe was not created
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
 * get:
 * /api/authors/{per_page}/{page_number}:
 *  get:
 *    security:
 *      - Bearer: []
 *    description: get the list of authors 
 *    tags:
 *    - authors
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *       - in: path
 *         name: per_page
 *         type: number
 *         required: true
*       - in: path
 *         name: page_number
 *         type: number
 *         required: true
 *    responses:
 *      '200':
 *        description: list of authors
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
 *                 total_count:
 *                   type: number
 *                 current_page:
 *                   type: number
 *                 total_pages:
 *                   type: number
 *                 authors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                        _id:
 *                         type: string
 *                        fullname:
 *                         type: string
 *                        image:
 *                         type: string
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
