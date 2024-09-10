describe('User Registration', () => {
  it('should register a new user successfully', () => {
    const uniqueEmail = `testuser${Date.now()}@example.com`;
    const user = {
      name: 'Test User',
      email: uniqueEmail,
      password: 'StrongP@ssw0rd!',
      role: 'Free User',
    };

    cy.register(user);

    // Verify redirection to login page
    cy.url().should('include', '/login');
    cy.contains('Login');
  });

  it('should display validation errors on empty form submission', () => {
    cy.visit('/register');
    cy.get('button[type="submit"]').click();

    cy.contains('Name is required');
    cy.contains('Email is required');
    cy.contains('Password is required');
    cy.contains('Role is required');
  });

  it('should prevent registration with an existing email', () => {
    const existingUser = {
      name: 'Existing User',
      email: `existinguser${Date.now()}@example.com`,
      password: 'StrongP@ssw0rd!',
      role: 'Free User',
    };

    // Register the user first
    cy.register(existingUser);

    // Attempt to register again with the same email
    cy.register(existingUser);

    cy.contains('User already exists');
  });
});
