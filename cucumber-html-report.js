const report = require('multiple-cucumber-html-reporter')

report.generate({
  jsonDir: 'test-results',
  reportPath: './test-results/cucumber-html',
  metadata: {
    browser: {
      name: 'chrome',
      version: '12'
    },
    device: 'Local test machine',
    platform: {
      name: 'mac',
      version: '24.4.0'
    }
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'AquiWeb E2E Tests' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Start Time', value: new Date().toISOString() },
      { label: 'Execution End Time', value: new Date().toISOString() }
    ]
  }
}) 