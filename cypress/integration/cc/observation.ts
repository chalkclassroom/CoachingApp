describe('Classroom Climate Observation', () => {
  it('Goes to website!', () => {
    // should fail because not logged in
    // cy.visit('/ClassroomClimate')
    cy.visit('/')
    // logs in
    // cy.contains('Log In').click()
    // cy.get('#email').type('clare.e.speer@vanderbilt.edu')
    // cy.get('#password').type('')
    // cy.contains('Log in').click()
  })

  it('Visits the Climate tool', () => {
    cy.visit('/ClassroomClimate')
    cy.contains('Practice Teacher', {timeout: 15000}).click()
    cy.waitForReact()
    cy.react('Magic8Card', { props: { title: 'ClassroomClimate' }}).first().click()
    cy.contains('BEGIN OBSERVATION', {timeout: 20000}).click()
  })

  it('Climate is empty in Redux store at start of observation', () => {
    cy.window().its('store').invoke('getState').its('climateRatingsState').should('deep.equal', {
      climateRatings: []
    })
    cy.window().its('store').invoke('getState').its('climateStackState').should('deep.equal', {
      climateStack: []
    })
  })

  it('Tries to undo the count while at 0...count remains at 0', () => {
    cy.react('Button', {props: {id: 'undo'}}).click()
    cy.react('Typography', {props: {variant: 'h2'}}).should(($Typography) => {
      expect($Typography.get(0).innerText).to.eq('0')
    })
  })

  it('Counts each behavior once, total is 4', () => {
    cy.contains('Redirection').click()
    cy.contains('Disapproval').click()
    cy.contains(/^Non-Specific Approval$/).click() // exact match
    cy.contains(/^Specific Approval$/).click() // exact match
    cy.react('Typography', {props: {variant: 'h2'}}).should(($Typography) => {
      expect($Typography.get(0).innerText).to.eq('4')
    })
  })

  it('Contains observations in redux', () => {
    cy.window().its('store').invoke('getState').its('climateStackState')
    .its('climateStack').then(($stack) => {
      expect($stack[0].observation).to.contain('redirection')
      expect($stack[1].observation).to.contain('disapproval')
      expect($stack[2].observation).to.contain('nonspecificapproval')
      expect($stack[3].observation).to.contain('specificapproval')
    })
  })

  it('Undoes specific approval, count goes to 3', () => {
    cy.react('Button', {props: {id: 'undo'}}).click()
    cy.react('Typography', {props: {variant: 'h2'}}).should(($Typography) => {
      expect($Typography.get(0).innerText).to.eq('3')
    })
  })

  it('Still has first 3 observations in redux, 4th is removed', () => {
    cy.window().its('store').invoke('getState').its('climateStackState')
    .its('climateStack').then(($stack) => {
      expect($stack[0].observation).to.contain('redirection')
      expect($stack[1].observation).to.contain('disapproval')
      expect($stack[2].observation).to.contain('nonspecificapproval')
      expect($stack[3]).to.be.undefined
    })
  })

  it('Wait for tone rating and select 4', () => {
    cy.wait(135000)
    cy.react('Button', {props: {id: 'positiveInterest'}}).click()
  })

  it('Submits tone rating', () => {
    cy.react('Button', {props: {id: 'confirm'}}).click()
  })

  it('Redux store includes tone rating of 4', () => {
    cy.window().its('store').invoke('getState').its('climateRatingsState')
    .its('climateRatings').then(($stack) => {
      expect($stack).to.have.length(1)
      expect($stack[0].rating.toString()).to.contain('4') // cannot be a number
    })
  })

  it('Completes the observation, observations removed from store', () => {
    cy.contains('COMPLETE OBSERVATION').click().then(() => {
      cy.react('Button', {props: {id: 'yes'}}).click().then(() => {
        cy.react('Button', {props: {id: 'returnHome'}}).click().then(() => {
          cy.window().its('store').invoke('getState').its('climateStackState')
          .its('climateStack').then(($stack) => {
            expect($stack[0]).to.be.undefined
          })
          cy.window().its('store').invoke('getState').its('climateRatingsState')
          .its('climateRatings').then(($stack) => {
            expect($stack).to.have.length(0)
          })
        })
      })
    })
  })
})