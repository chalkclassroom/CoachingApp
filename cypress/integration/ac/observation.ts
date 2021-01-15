describe('Associative and Cooperative Observation', () => {
  it('Goes to website!', () => {
    cy.visit('/')
  })

  it('Visits the Associative and Cooperative tool', () => {
    cy.visit('/AssociativeCooperativeInteractions')
    cy.contains('Practice Teacher', {timeout: 15000}).click()
    cy.waitForReact()
    cy.react('Magic8Card', { props: { title: 'AssociativeCooperativeInteractions' }}).first().click()
    cy.contains('BEGIN OBSERVATION', {timeout: 20000}).click()
  })

  it('Chooses centers', () => {
    cy.contains('Blocks').click()
    cy.contains('Writing').click()
    cy.contains('Done').click()
  })

  it('AC is empty in Redux store at start of observation', () => {
    cy.window().its('store').invoke('getState').its('associativeCenterState').should('deep.equal', {
      associativeCenters: [{name: 'blocks', count: 0}, {name: 'writing', count: 0}]
    })
    cy.window().its('store').invoke('getState').its('associativeCountState').should('deep.equal', {
      acCount: 0,
      noACCount: 0,
      noOppCount: 0
    })
  })

  it('Visits the Blocks center', () => {
    cy.contains('blocks').click()
  })

  /* it('Chooses 1 child and teacher checklist becomes disabled', () => {
    cy.contains('1 child').click()
    cy.wait(500)
    cy.react('li', {props: {id: 'child0'}}).should('not.be.disabled')
    cy.react('li', {props: {id: 'child1'}}).should('not.be.disabled')
    cy.react('li', {props: {id: 'child2'}}).should('not.be.disabled')
    // cy.react('li', {props: {id: 'teacher0'}}).click()
    // cy.react('li', {props: {id: 'teacher0'}}).its('disabled').should('exist')
    // cy.react('li', {props: {id: 'teacher1'}}).should('be.disabled')
    // cy.react('li', {props: {id: 'teacher2'}}).should('be.disabled')
    // cy.react('li', {props: {id: 'teacher3'}}).should('be.disabled')
  }) */

  it('Chooses 1 child and submits observation; noOppCount increases', () => {
    cy.contains('1 child').click()
    cy.wait(60000)
    cy.contains('GO TO NEXT OBSERVATION', {timeout: 2000}).click()
    cy.window().its('store').invoke('getState').its('associativeCountState').should('deep.equal', {
      acCount: 0,
      noACCount: 0,
      noOppCount: 1
    })
  })

  it('Visits the Writing center', () => {
    cy.contains('writing').click()
  })

  it('Chooses 2+ children without teacher, chooses nothing, submits, no ac count increases', () => {
    cy.contains('2+ children without teacher').click()
    cy.wait(60000)
    cy.contains('NO BEHAVIORS OBSERVED', {timeout: 2000}).click()
    cy.window().its('store').invoke('getState').its('associativeCountState').should('deep.equal', {
      acCount: 0,
      noACCount: 1,
      noOppCount: 1
    })
  })

  it('Visits the Blocks center', () => {
    cy.contains('blocks').click()
  })

  it('Chooses 1+ child with teacher, chooses nothing, asks for more time, chooses one teacher behavior and two child behaviors, submits, ac count increases', () => {
    cy.contains('1+ child with teacher').click()
    cy.wait(60000)
    cy.contains('MAKE FINAL SELECTIONS', {timeout: 2000}).click()
    cy.react('li', {props: {id: 'child0'}}).click()
    cy.react('li', {props: {id: 'child1'}}).click()
    cy.react('li', {props: {id: 'teacher0'}}).click()
    cy.wait(15000)
    cy.window().its('store').invoke('getState').its('associativeCountState').should('deep.equal', {
      acCount: 1,
      noACCount: 1,
      noOppCount: 1
    })
  })

  it('Adds another center', () => {
    cy.contains('Add Center').click()
    cy.get('input').type('hello')
    cy.react('Button', {props: {id: 'add'}}).click()
  })

  it('Visits the Hello center', () => {
    cy.contains('hello').click()
  })

  it('Chooses 1+ child with teacher, chooses one teacher behavior, asks for more time, chooses another teacher behavior, submits, no ac count increases', () => {
    cy.contains('1+ child with teacher').click()
    cy.react('li', {props: {id: 'teacher1'}}).click()
    cy.wait(60000)
    cy.contains('MAKE FINAL SELECTIONS', {timeout: 2000}).click()
    cy.react('li', {props: {id: 'teacher0'}}).click()
    cy.wait(15000)
    cy.window().its('store').invoke('getState').its('associativeCountState').should('deep.equal', {
      acCount: 1,
      noACCount: 2,
      noOppCount: 1
    })
  })

  it('Visits the Writing center', () => {
    cy.contains('writing').click()
  })

  it('Prompts user to choose people button, then asks if they are done', () => {
    cy.wait(60000)
    cy.contains('1+ child with teacher', {timeout: 2000}).click()
    cy.wait(2000)
    cy.contains('MAKE FINAL SELECTIONS', {timeout: 2000}).click()
    cy.react('li', {props: {id: 'teacher0'}}).click()
    cy.react('li', {props: {id: 'teacher1'}}).click()
    cy.react('li', {props: {id: 'teacher2'}}).click()
    cy.react('li', {props: {id: 'child0'}}).click()
    cy.wait(15000)
    cy.window().its('store').invoke('getState').its('associativeCountState').should('deep.equal', {
      acCount: 2,
      noACCount: 2,
      noOppCount: 1
    })
  })

  it('Checks that total visits is 5', () => {
    cy.contains('Total Visits:').next().should(($h3) => {
      expect($h3.get(0).innerText).to.eq('5')
    })
  })

  it('Completes the observation, observations removed from store', () => {
    cy.contains('COMPLETE OBSERVATION').click().then(() => {
      cy.react('Button', {props: {id: 'yes'}}).click().then(() => {
        cy.react('Button', {props: {id: 'returnHome'}}).click().then(() => {
          cy.window().its('store').invoke('getState').its('associativeCenterState')
          .its('associativeCenters').then(($stack) => {
            expect($stack[0]).to.be.undefined
          })
          cy.window().its('store').invoke('getState').its('associativeCountState')
          .its('acCount').then(($stack) => {
            expect($stack).to.equal(0)
          })
          cy.window().its('store').invoke('getState').its('associativeCountState')
          .its('noACCount').then(($stack) => {
            expect($stack).to.equal(0)
          })
          cy.window().its('store').invoke('getState').its('associativeCountState')
          .its('noOppCount').then(($stack) => {
            expect($stack).to.equal(0)
          })
        })
      })
    })
  })
})