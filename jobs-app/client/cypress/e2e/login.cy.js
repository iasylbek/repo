describe('User Login', () => {
  const userEmail = `loginuser${Date.now()}@example.com`;
  const userPassword = 'StrongP@ssw0rd!';
  const user = {
    name: 'Login User',
    email: userEmail,
    password: userPassword,
    role: 'Free User',
  };

  before(() => {
    // Register the user via API to ensure they exist
    cy.request('POST', 'http://localhost:5000/api/auth/register', user);
  });

  it('should login successfully with valid credentials', () => {
    cy.login(userEmail, userPassword);

    // Verify redirection to jobs page
    cy.url().should('include', '/jobs');
    cy.contains('Job Title');
  });

  it('should display error with invalid credentials', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.contains('Incorrect email or password');
  });
});
