/**
 * @swagger
 * post:
 * /api/books/check-existance:
 *  post:
 *    security:
 *      - Bearer: []
 *    description: check if a book already exists before adding it
 *    tags:
 *    - books
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
 *              name:
 *                 type: string
 *    responses:
 *      '200':
 *        description: book found or not
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
 * /api/books/:
 *  post:
 *    security:
 *      - Bearer: []
 *    description: create new book
 *    tags:
 *    - books
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *       - name: name
 *         in: formData
 *         required: true
 *         description:  the book name
 *         type: string
 *       - name: pages
 *         in: formData
 *         required: true
 *         description:  the book pages number
 *         type: number
 *       - name: price
 *         in: formData
 *         required: true
 *         description:  the book price
 *         type: string
 *       - name: author
 *         in: formData
 *         required: true
 *         description:  the object is of the other from the list of authors
 *         type: string
 *       - name: image
 *         in: formData
 *         required: false
 *         description:  the book image
 *         type: file
 *    responses:
 *      '201':
 *        description: book succefully created
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
 *                 name:
 *                   type: string
 *                 price:
 *                   type: string
 *                 pages:
 *                   type: number
 *                 image:
 *                   type: number
 *                 author:
 *                   type: object
 *                   properties:
 *                      _id:
 *                       type: string
 *                      fullname:
 *                       type: string
 *                      biography:
 *                       type: string
 *                      image:
 *                       type: string
 *      '400':
 *        description: no name,pages,price or author  found in the body
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '409':
 *        description: book was not created
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
 * /api/books/{per_page}/{page_number}:
 *  get:
 *    security:
 *      - Bearer: []
 *    description: get the list of books
 *    tags:
 *    - books
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
 *        description: list of books
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
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                        type: string
 *                       name:
 *                        type: string
 *                       price:
 *                        type: string
 *                       pages:
 *                        type: number
 *                       image:
 *                        type: number
 *                       author:
 *                        type: object
 *                        properties:
 *                          _id:
 *                            type: string
 *                          fullname:
 *                            type: string
 *                          biography:
 *                            type: string
 *                          image:
 *                            type: string
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
 * /api/books/{_id}/details:
 *  get:
 *    security:
 *      - Bearer: []
 *    description: get a book details
 *    tags:
 *    - books
 *    produces:
 *    - application/json
 *    parameters:
 *       - in: path
 *         name: _id
 *         type: string
 *         required: true
 *    responses:
 *      '200':
 *        description: book details
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *             data:
 *                     type: object
 *                     properties:
 *                       _id:
 *                        type: string
 *                       name:
 *                        type: string
 *                       price:
 *                        type: string
 *                       pages:
 *                        type: number
 *                       image:
 *                        type: number
 *                       author:
 *                        type: object
 *                        properties:
 *                          _id:
 *                            type: string
 *                          fullname:
 *                            type: string
 *                          biography:
 *                            type: string
 *                          image:
 *                            type: string
 *      '409':
 *        description: book not found verify _id
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
 * /api/books/{_id}:
 *  post:
 *    security:
 *      - Bearer: []
 *    description: update an existing book
 *    tags:
 *    - books
 *    produces:
 *    - application/json
 *    parameters:
 *       - in: path
 *         name: _id
 *         type: string
 *         required: true
 *       - name: name
 *         in: formData
 *         required: false
 *         description:  the book name
 *         type: string
 *       - name: pages
 *         in: formData
 *         required: false
 *         description:  the book pages number
 *         type: number
 *       - name: price
 *         in: formData
 *         required: false
 *         description:  the book price
 *         type: string
 *       - name: author
 *         in: formData
 *         required: false
 *         description:  the object is of the other from the list of authors
 *         type: string
 *       - name: image
 *         in: formData
 *         required: false
 *         description:  the book image
 *         type: file
 *    responses:
 *      '200':
 *        description: book succefully updated
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
 *                 name:
 *                   type: string
 *                 price:
 *                   type: string
 *                 pages:
 *                   type: number
 *                 image:
 *                   type: number
 *                 author:
 *                   type: object
 *                   properties:
 *                      _id:
 *                       type: string
 *                      fullname:
 *                       type: string
 *                      biography:
 *                       type: string
 *                      image:
 *                       type: string

 *      '409':
 *        description: book was not created
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
 * delete:
 * /api/books/{_id}:
 *  delete:
 *    security:
 *      - Bearer: []
 *    description: delete an existing book
 *    tags:
 *    - books
 *    produces:
 *    - application/json
 *    parameters:
 *       - in: path
 *         name: _id
 *         type: string
 *         required: true
 *    responses:
 *      '200':
 *        description: book succefully deleted
 *        schema:
 *          type: object
 *          properties:
 *             status:
 *               type : number
 *             message:
 *               type: string
 *      '409':
 *        description: book was not created
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
