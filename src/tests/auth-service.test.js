const knex = require('../db');
const authService = require('../services/auth-service');

describe('Auth Service', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
    await knex.seed.run();
  });

  describe('register', () => {
    it('should register a new user with role "doctor"', async () => {
      const body = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        password: 'password',
        role: 'doctor',
        specialization: 'Cardiology',
        gender: 'Male',
        contact_number: '1234567890',
      };

      const result = await authService.register(body);

      if (result.status === 400) {
        expect(['Email already exists', 'Role not found']).toContain(result.message);
      } else {
        expect(result.status).toEqual(200);
        expect(result.message).toEqual('Doctor created successfully');
        expect(result.user).toBeDefined();
        expect(result.user.first_name).toEqual(body.first_name);
        expect(result.user.last_name).toEqual(body.last_name);
        expect(result.user.email).toEqual(body.email);
        expect(result.user.role).toEqual(body.role);
        expect(result.user.specialization).toEqual(body.specialization);
        expect(result.user.gender).toEqual(body.gender);
        expect(result.user.contact_number).toEqual(body.contact_number);
      }
    });

    it('should register a new user with role "patient"', async () => {
      const body = {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'janesmith@example.com',
        password: 'password',
        role: 'patient',
        dob: '1990-01-01',
        gender: 'Female',
        contact_number: '9876543210',
      };

      const result = await authService.register(body);
      if (result.status === 400) {
        expect(['Email already exists', 'Role not found']).toContain(result.message);
      } else {
        expect(result.status).toEqual(200);
        expect(result.message).toEqual('Patient created successfully');
        expect(result.user).toBeDefined();
        expect(result.user.first_name).toEqual(body.first_name);
        expect(result.user.last_name).toEqual(body.last_name);
        expect(result.user.email).toEqual(body.email);
        expect(result.user.role).toEqual(body.role);
        expect(result.user.dob).toEqual(body.dob);
        expect(result.user.gender).toEqual(body.gender);
        expect(result.user.contact_number).toEqual(body.contact_number);
      }
    });

    it('should return an error if email already exists', async () => {
      const body = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        password: 'password',
        role: 'doctor',
        specialization: 'Cardiology',
        gender: 'Male',
        contact_number: '1234567890',
      };

      const result = await authService.register(body);

      expect(result.status).toEqual(400);
      expect(result.message).toEqual('Email already exists');
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      const body = {
        email: 'superadmin@gmail.com',
        password: 'admin',
      };

      const result = await authService.login(body);
      console.log("RESSSSS -->> ", result)

      expect(result.status).toEqual(200);
      expect(result.message).toEqual('Login successful');
      expect(result.user).toBeDefined();
      expect(result.user.email).toEqual(body.email);
    });

    it('should return an error if email not found', async () => {
      const body = {
        email: 'johndoe1@example.com',
        password: 'password',
      };

      const result = await authService.login(body);

      expect(result.status).toEqual(400);
      expect(result.message).toEqual('Email not found');
    });

    it('should return an error if password is incorrect', async () => {
      const body = {
        email: 'superadmin@gmail.com',
        password: 'wrongpassword',
      };

      const result = await authService.login(body);

      expect(result.status).toEqual(400);
      expect(result.message).toEqual('Invalid password');
    });
  });



  afterAll(async () => {
    await knex.destroy();
  });
});