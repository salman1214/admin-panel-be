const knex = require('../../db');
const dashboardService = require('../../services/dashboard-service');

describe('Dashboard Service', () => {

  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  describe('getAnalytics', () => {
    it('should return the total number of appointments', async () => {
      const result = await dashboardService.getAnalytics();

      expect(result.status).toEqual(200);
      expect(result.data.totalAppointments).toBeDefined();
      expect(typeof result.data.totalAppointments).toBe('number');
    });
  });

  afterAll(async () => {
    await knex.destroy(); // This closes the Knex connection to the database
  });
});