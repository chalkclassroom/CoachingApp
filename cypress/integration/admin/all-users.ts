describe('All Users Dashboard', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Navigates to All Users page as admin', () => {
    // Login as admin
    cy.get('input[type="email"]').type('admin@chalk.local')
    cy.get('input[type="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    // Wait for home page to load
    cy.url().should('include', '/Home', { timeout: 15000 })

    // Open burger menu and click All Users
    cy.get('[aria-label="menu"]').first().click()
    cy.contains('All Users').click()

    // Verify All Users page loads
    cy.url().should('include', '/AllUsers')
    cy.contains('All Users', { timeout: 10000 })
  })

  it('Displays users table with data', () => {
    // Login
    cy.get('input[type="email"]').type('admin@chalk.local')
    cy.get('input[type="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/Home', { timeout: 15000 })

    // Navigate to All Users
    cy.visit('/AllUsers')

    // Verify table headers exist
    cy.contains('Last Name', { timeout: 10000 })
    cy.contains('First Name')
    cy.contains('Email')
    cy.contains('Role')
    cy.contains('Status')
    cy.contains('Last Login')
  })

  it('Search filters users correctly', () => {
    cy.get('input[type="email"]').type('admin@chalk.local')
    cy.get('input[type="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/Home', { timeout: 15000 })

    cy.visit('/AllUsers')
    cy.contains('Last Name', { timeout: 10000 })

    // Search for a specific user
    cy.get('input[label="Search"]').type('Admin')
    cy.contains('Admin User')
  })

  it('Role filter works correctly', () => {
    cy.get('input[type="email"]').type('admin@chalk.local')
    cy.get('input[type="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/Home', { timeout: 15000 })

    cy.visit('/AllUsers')
    cy.contains('Last Name', { timeout: 10000 })

    // Filter by Coach role
    cy.get('#mui-component-select-Role, [aria-labelledby*="Role"]').click()
    cy.contains('Coach').click()

    // Verify only coaches are shown
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).contains('Coach')
    })
  })

  it('Opens edit dialog when clicking a user', () => {
    cy.get('input[type="email"]').type('admin@chalk.local')
    cy.get('input[type="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/Home', { timeout: 15000 })

    cy.visit('/AllUsers')
    cy.contains('Last Name', { timeout: 10000 })

    // Click on a user row
    cy.get('table tbody tr').first().click()

    // Verify edit dialog opens
    cy.contains('Edit User')
    cy.get('input[label="First Name"], input[value]').should('exist')
  })

  it('Export button exists', () => {
    cy.get('input[type="email"]').type('admin@chalk.local')
    cy.get('input[type="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/Home', { timeout: 15000 })

    cy.visit('/AllUsers')
    cy.contains('Last Name', { timeout: 10000 })

    // Verify export button exists
    cy.contains('Export')
  })

  it('Pagination controls work', () => {
    cy.get('input[type="email"]').type('admin@chalk.local')
    cy.get('input[type="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/Home', { timeout: 15000 })

    cy.visit('/AllUsers')
    cy.contains('Last Name', { timeout: 10000 })

    // Verify pagination exists
    cy.contains('Rows per page')
    cy.get('[aria-label="Go to next page"], [title="Go to next page"]').should('exist')
  })
})
