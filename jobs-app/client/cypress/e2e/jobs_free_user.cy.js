describe('Job Listing Page for Free Users', () => {
  const userEmail = `freeuser${Date.now()}@example.com`;
  const userPassword = 'StrongP@ssw0rd!';
  const user = {
    name: 'Free User',
    email: userEmail,
    password: userPassword,
    role: 'Free User',
  };

  before(() => {
    // Register the user via API
    cy.request('POST', 'http://localhost:5000/api/auth/register', user);

    // Login the user
    cy.login(userEmail, userPassword);
  });

  it('should display the jobs table with correct columns', () => {
    cy.url().should('include', '/jobs');
    cy.contains('Job Title');
    cy.contains('Company Name');
    cy.contains('Job Type');
    cy.contains('Job Level');
  });

  it('should not allow changing the number of rows for Free Users', () => {
    // Verify that the option to change rows is not available or disabled
    cy.get('button[aria-label="rows per page"]').should('not.exist');
  });

  it('should show a message when a row is clicked', () => {
    cy.get('.MuiDataGrid-row').first().click();

    cy.contains('Feature not available for Free Users');
  });
});
