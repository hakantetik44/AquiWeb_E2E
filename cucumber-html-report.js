const reporter = require('multiple-cucumber-html-reporter')

reporter.generate({
  jsonDir: 'test-reports',
  reportPath: 'test-reports/cucumber-html-report',
  metadata: {
    browser: {
      name: 'electron',
      version: '12.17.4'
    },
    device: 'Local test machine',
    platform: {
      name: 'darwin',
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