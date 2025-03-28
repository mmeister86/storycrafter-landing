// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => { 
  // Add login implementation here
})

// -- This is a tab command to add keyboard navigation --
Cypress.Commands.add('tab', { prevSubject: 'optional' }, (subject) => {
  const eventOptions = { bubbles: true, cancelable: true, key: 'Tab', keyCode: 9 }
  
  if (subject) {
    cy.wrap(subject).trigger('keydown', eventOptions)
  } else {
    cy.focused().trigger('keydown', eventOptions)
  }

  return cy.document().trigger('keyup', eventOptions)
})

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })