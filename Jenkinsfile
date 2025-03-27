pipeline {
    agent any

    tools {
        nodejs 'Node'
        allure 'Allure'
    }

    environment {
        NODE_ENV = 'test'
        TEST_RESULTS_DIR = 'allure-results'
        REPORT_DIR = 'test-reports'
        VIDEO_DIR = 'test-videos'
        CUCUMBER_REPORT = 'test-results/cucumber-report.json'
        TIMESTAMP = new Date().format('yyyy-MM-dd_HH-mm-ss')
    }

    stages {
        stage('Setup') {
            steps {
                echo "🚀 Starting the test pipeline"
                checkout scm

                sh '''
                    # Create directories
                    mkdir -p ${TEST_RESULTS_DIR} ${REPORT_DIR} ${VIDEO_DIR} test-results
                    
                    echo "🔍 Environment Info:"
                    node --version
                    npm --version
                    
                    echo "📦 Installing dependencies..."
                    npm install --legacy-peer-deps
                    
                    echo "📦 Installing Cypress..."
                    npx cypress install
                '''
            }
        }

        stage('Test') {
            steps {
                echo '🚀 Running E2E tests...'
                sh '''
                    echo "📝 Starting Test Execution..."
                    
                    # Set environment variables
                    export CYPRESS_CACHE_FOLDER=".cache/Cypress"
                    export CYPRESS_allure=true
                    export CYPRESS_allureResultsDir=${TEST_RESULTS_DIR}
                    
                    # Run tests
                    npx cypress run \
                        --config-file cypress.config.js \
                        --browser chrome \
                        --headed \
                        || {
                            echo "❌ Test execution failed"
                            exit 1
                        }
                '''
            }
        }

        stage('Generate Reports') {
            steps {
                echo '📊 Generating reports...'
                
                // Generate Allure report
                allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
                
                // Archive artifacts
                archiveArtifacts artifacts: 'cypress/videos/**/*.mp4,cypress/screenshots/**/*.png,test-results/**/*', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo '🧹 Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
} 