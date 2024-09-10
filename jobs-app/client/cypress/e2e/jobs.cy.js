describe('Job Listing Page', () => {
  const userEmail = `paiduser${Date.now()}@example.com`;
  const userPassword = 'StrongP@ssw0rd!';
  const user = {
    name: 'Paid User',
    email: userEmail,
    password: userPassword,
    role: 'Paid User',
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

  it('should allow changing the number of rows for Paid Users', () => {
    // Assuming there's a dropdown to select page size
    cy.get('button[aria-label="rows per page"]').click();
    cy.contains('20').click();
    cy.get('.MuiDataGrid-row').should('have.length.at.least', 10); // Adjust as per data
  });

  it('should open modal with job details when a row is clicked', () => {
    cy.get('.MuiDataGrid-row').first().click();

    cy.get('.MuiModal-root').should('be.visible');
    cy.contains('Job Details');
    cy.contains('Geo');
    cy.contains('Salary Currency');
    cy.contains('Industry');

    // Close the modal
    cy.get('button[aria-label="close"]').click();
    cy.get('.MuiModal-root').should('not.exist');
  });
});
