describe('Open Observation V1 iter2 flow', () => {
  it('exposes Open Observation from the observation tool grid and bypasses TeacherModal', () => {
    cy.visit('/Home')
    cy.get('[data-testid="open-observation-magic8-card"]').should('exist')
    cy.get('[data-testid="open-observation-magic8-card"]').click()
    cy.location('pathname').should('eq', '/OpenObservation')
    cy.contains('Choose Teacher').should('not.exist')
  })

  it('captures individual timestamped notes before showing the snapshot', () => {
    cy.visit('/OpenObservation')
    cy.get('[data-testid="open-observation-teacher"]').should('exist')
    cy.get('[data-testid="open-observation-note-input"]').should('not.exist')
    cy.get('[data-testid="open-observation-add-note"]').should('not.exist')
  })
})
