/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *         - role
 *         - specialization
 *         - gender
 *         - contact_number
 *       properties:
 *         first_name:
 *           type: string
 *           description: The first name of the user
 *         last_name:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         role:
 *           type: string
 *           description: The role of the user
 *         specialization:
 *           type: string
 *           description: The specialization of the user
 *         gender:
 *           type: string
 *           description: The gender of the user
 *         contact_number:
 *           type: string
 *           description: The contact number of the user
 *       example:
 *         first_name: "johndoe"
 *         last_name: "johndoe"
 *         email: "johndoe@example.com"
 *         password: "secret"
 *         role: "doctor"
 *         specialization: "ENT"
 *         gender: "male"
 *         contact_number: "123456789"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Doctor:
 *       type: object
 *       required:
 *        - specialization
 *        - gender
 *        - contact_number
 *       properties:
 *         specialization:
 *           type: string
 *           description: The user's username
 *         gender:
 *           type: string
 *           description: The user's email
 *         contact_number:
 *           type: string
 *           description: The user's password
 *       example:
 *         specialization: MA
 *         gender: male
 *         contact_number: 123456789
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       required:
 *        - dob
 *        - gender
 *        - contact_number
 *       properties:
 *         dob:
 *           type: string
 *           description: The patient's date of birth
 *         gender:
 *           type: string
 *           description: The patient's gender
 *         contact_number:
 *           type: string
 *           description: The patient's contact number
 *       example:
 *         dob: 06-06-1996
 *         gender: male
 *         contact_number: 123456789
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *        - appointment_date
 *        - status
 *        - doctor_id
 *        - patient_id
 *       properties:
 *         appointment_date:
 *           type: string
 *           description: The appointment's date
 *         status:
 *           type: string
 *           description: The appointment's status
 *         doctor_id:
 *           type: integer
 *           description: The appointment's doctor id
 *         patient_id:
 *           type: integer
 *           description: The appointment's patient id
 *       example:
 *         appointment_date: 06-06-1996
 *         status: pending
 *         doctor_id: 1
 *         patient_id: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Treatment:
 *       type: object
 *       required:
 *        - description
 *        - treatment_date
 *        - patient_id
 *       properties:
 *         description:
 *           type: string
 *           description: The treatment's description
 *         treatment_date:
 *           type: string
 *           description: The treatment's date
 *         patient_id:
 *           type: integer
 *           description: The treatment's patient id
 *       example:
 *         description: "sample"
 *         treatment_date: "06-06-2024"
 *         patient_id: 1
 *     Prescription:
 *       type: object
 *       required:
 *        - medicine
 *        - dosage
 *        - duration
 *       properties:
 *         medicine:
 *           type: string
 *           description: The prescription's medicine
 *         dosage:
 *           type: string
 *           description: The prescription's dosage
 *         duration:
 *           type: string
 *           description: The prescription's duration
 *       example:
 *         medicine: "sample medicine"
 *         dosage: "sample"
 *         duration: "5 days"
 */