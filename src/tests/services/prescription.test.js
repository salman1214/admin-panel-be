const knex = require("../../db");
const Treatment = require("../../models/Treatment");
const prescriptionService = require("../../services/prescription-service");

describe("Prescription Service", () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });
  describe("createPrescription", () => {
    it("should insert a new prescription into the database", async () => {

      const newTreatment = await Treatment.query().insert({
        patient_id: 1,
        description: "Fever",
        treatment_date: "2021-12-01",
      });
      // Create a mock prescription object
      const mockPrescription = {
        treatment_id: newTreatment.id,
        medicine: "Paracetamol",
        duration: "5 days",
        dosage: "500mg",
      };

      // Call the createPrescription function
      const result = await prescriptionService.createPrescription(mockPrescription);

      // Assert that the prescription was inserted successfully
      expect(result).toBeDefined();
      expect(result.id).toBeDefined(); // Assuming your Prescription model has an 'id' property

      // You can also add additional assertions based on your requirements
      // For example, you can check if the inserted prescription matches the mock prescription object

      // Clean up the database (optional)
      // You can use a library like 'knex-cleaner' to clean up the database after each test
    });
  });

  afterAll(async () => {
    await knex.destroy();
  });
});