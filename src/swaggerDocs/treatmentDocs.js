/**
 * @swagger
 * tags:
 *   name: Treatment
 *   description: The Treatment managing API
 */

/**
 * @swagger
 * /api/treatments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Treatment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               treatment:
 *                 $ref: '#/components/schemas/Treatment'
 *               prescription:
 *                 $ref: '#/components/schemas/Prescription'
 *     responses:
 *       200:
 *         description: The Treatment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Treatment'
 *       400:
 *         description: Some error occurred
 */

/**
 * @swagger
 * /api/treatments/all:
 *   get:
 *     summary: Retrieve a list of treatments
 *     tags: [Treatment]
 *     security:
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of treatments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Treatment'
 *       400:
 *         description: Some error occurred
 */

/**
 * @swagger
 * /api/treatments/{id}:
 *   get:
 *     summary: Retrieve a single user by id
 *     tags: [Treatment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the Treatment to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single Treatment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Treatment'
 *       400:
 *         description: Some error occurred
 */

/**
 * @swagger
 * /api/treatments/{id}:
 *   patch:
 *     summary: Update an treatment
 *     tags: [Treatment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the treatment to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Treatment'
 *     responses:
 *       200:
 *         description: The treatment was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Treatment'
 *       400:
 *         description: Some error occurred
 */

/**
 * @swagger
 * /api/treatments/{id}:
 *   delete:
 *     summary: Delete a single Treatment by id along with its prescription
 *     tags: [Treatment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the Treatment to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single Treatment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Treatment'
 *       400:
 *         description: Some error occurred
 */