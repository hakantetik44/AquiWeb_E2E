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
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
        DISPLAY = ':99'
    }

    stages {
        stage('Setup') {
            steps {
                echo "🚀 Starting the test pipeline"
                checkout scm

                sh '''
                    # Create directories
                    mkdir -p ${TEST_RESULTS_DIR} ${REPORT_DIR} ${VIDEO_DIR} test-results ${CYPRESS_CACHE_FOLDER}
                    
                    echo "🔍 Environment Info:"
                    node --version
                    npm --version
                    
                    echo "📦 Installing dependencies..."
                    npm install --legacy-peer-deps
                    
                    echo "📦 Setting up virtual display..."
                    if [ -x "$(command -v Xvfb)" ]; then
                        Xvfb :99 -screen 0 1920x1080x24 > /dev/null 2>&1 &
                        echo "✅ Xvfb started"
                    else
                        echo "⚠️ Xvfb not found, continuing without it..."
                    fi
                    
                    echo "📦 Verifying Cypress..."
                    npx cypress verify
                    
                    echo "📦 Installing Cypress binary..."
                    npx cypress install
                    
                    echo "📦 Cypress cache location:"
                    echo $CYPRESS_CACHE_FOLDER
                    ls -la $CYPRESS_CACHE_FOLDER || true
                '''
            }
        }

        stage('Test') {
            steps {
                echo '🚀 Running E2E tests...'
                sh '''
                    echo "📝 Starting Test Execution..."
                    
                    # Set environment variables
                    export CYPRESS_allure=true
                    export CYPRESS_allureResultsDir=${TEST_RESULTS_DIR}
                    
                    # Run tests with debug logging
                    DEBUG=cypress:* npx cypress run \
                        --config-file cypress.config.js \
                        --browser chrome \
                        --headed \
                        --no-exit \
                        || {
                            echo "❌ Test execution failed"
                            echo "📋 Debug information:"
                            echo "Cypress binary location:"
                            ls -la ${CYPRESS_CACHE_FOLDER}
                            echo "Workspace location:"
                            pwd
                            echo "Chrome version:"
                            google-chrome --version || true
                            echo "Display info:"
                            echo $DISPLAY
                            echo "Xvfb processes:"
                            ps aux | grep Xvfb || true
                            echo "Recent Cypress logs:"
                            find ~/.config/Cypress/logs -type f -exec tail -n 50 {} \\; || true
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
                archiveArtifacts artifacts: '''
                    cypress/videos/**/*.mp4,
                    cypress/screenshots/**/*.png,
                    test-results/**/*,
                    ~/.config/Cypress/logs/**/*
                ''', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo '🧹 Cleaning up workspace...'
            sh '''
                # Kill Xvfb if running
                pkill Xvfb || true
            '''
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