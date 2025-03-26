describe('My First Test Suite', { tags: '@smoke' }, () => {
  it('Test with Allure features', { severity: 'critical' }, () => {
    cy.allure()
      .epic('My Epic')
      .feature('My Feature')
      .story('My User Story')
      .severity('critical')
      
    cy.visit('/')
    // Test adımları...
  })
}) 