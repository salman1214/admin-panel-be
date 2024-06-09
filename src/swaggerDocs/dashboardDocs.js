/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: The dashboard managing API
 */

/**
 * @swagger
 * /api/dashboard/analytics:
 *   get:
 *     summary: Retrieve complete analytics
 *     tags: [Dashboard]
 *     security:
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Some error occurred
 */