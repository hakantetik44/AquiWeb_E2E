pipeline {
    agent any

    tools {
        nodejs 'Node'
    }

    environment {
        NODE_ENV = 'test'
        TEST_RESULTS_DIR = 'allure-results'
        REPORT_DIR = 'test-reports'
        VIDEO_DIR = 'test-videos'
        CUCUMBER_REPORT = 'cucumber-report.json'
        TIMESTAMP = new Date().format('yyyy-MM-dd_HH-mm-ss')
        PATH = "/usr/local/bin:/opt/homebrew/bin:${env.PATH}"
        DEBUG = 'cypress:*'
    }

    options {
        timeout(time: 1, unit: 'HOURS')
        timestamps()
        disableConcurrentBuilds()
        quietPeriod(0)
        ansiColor('xterm')
    }

    stages {
        stage('Setup') {
            steps {
                echo "Starting the test pipeline"
                checkout scm

                sh '''
                    mkdir -p ${TEST_RESULTS_DIR} ${REPORT_DIR} ${VIDEO_DIR} test-output
                    echo "Environment Info:"
                    echo "Node: $(node --version)"
                    echo "NPM: $(npm --version)"
                    echo "Installing dependencies..."
                    rm -rf node_modules package-lock.json
                    npm install
                    npx cypress verify
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    echo "Running Cypress tests..."
                    DEBUG=cypress:* npm run test || exit 0
                '''
            }
        }

        stage('Process Videos') {
            steps {
                echo 'Processing test videos...'
                sh '''
                    sleep 10
                    
                    if [ -d "${VIDEO_DIR}" ] && [ "$(ls -A ${VIDEO_DIR})" ]; then
                        echo "Converting videos..."
                        for video in ${VIDEO_DIR}/*.webm; do
                            if [ -f "$video" ]; then
                                filename=$(basename "$video" .webm)
                                echo "Converting ${filename}..."
                                
                                # Suppress ffmpeg output
                                if ffmpeg -y -i "$video" -c:v libx264 -crf 23 -preset medium -movflags +faststart "${TEST_RESULTS_DIR}/${filename}.mp4" 2>/dev/null; then
                                    echo "Conversion successful"
                                else
                                    echo "Conversion failed, keeping original format"
                                    cp "$video" "${TEST_RESULTS_DIR}/${filename}.webm"
                                fi
                            fi
                        done
                        echo "Video processing complete"
                    else
                        echo "No videos to process"
                    fi
                '''
            }
        }

        stage('Generate Reports') {
            steps {
                echo 'Generating reports...'
                
                allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: "${TEST_RESULTS_DIR}"]]
                ])

                cucumber([
                    fileIncludePattern: "${CUCUMBER_REPORT}",
                    jsonReportDirectory: '.',
                    reportTitle: 'AquiWeb E2E Tests',
                    buildStatus: 'UNSTABLE',
                    trendsLimit: 10,
                    classifications: [
                        ['key': 'Browser', 'value': 'Chrome'],
                        ['key': 'Environment', 'value': 'Production'],
                        ['key': 'Platform', 'value': 'Mac OS']
                    ]
                ])

                sh 'zip -r test-reports.zip ${TEST_RESULTS_DIR} ${REPORT_DIR} ${VIDEO_DIR} ${CUCUMBER_REPORT}'
            }
        }
    }

    post {
        always {
            echo 'Archiving artifacts...'
            archiveArtifacts artifacts: "${TEST_RESULTS_DIR}/**/*", fingerprint: true, allowEmptyArchive: true
            archiveArtifacts artifacts: "cypress/screenshots/**/*", fingerprint: true, allowEmptyArchive: true
            archiveArtifacts artifacts: "cypress/logs/**/*", fingerprint: true, allowEmptyArchive: true
            
            echo 'Cleaning workspace...'
            cleanWs()
        }
        success {
            echo """
                Test Summary
                Build: #${BUILD_NUMBER}
                Status: SUCCESS
                Reports:
                - Allure: ${BUILD_URL}allure
                - Cucumber: ${BUILD_URL}cucumber-html-reports/overview-features.html
                - All Reports (ZIP): ${BUILD_URL}artifact/test-reports.zip
            """
        }
        unstable {
            echo """
                Test Summary
                Build: #${BUILD_NUMBER}
                Status: UNSTABLE
                Reports:
                - Allure: ${BUILD_URL}allure
                - Cucumber: ${BUILD_URL}cucumber-html-reports/overview-features.html
                - All Reports (ZIP): ${BUILD_URL}artifact/test-reports.zip
            """
        }
        failure {
            echo """
                Test Summary
                Build: #${BUILD_NUMBER}
                Status: FAILED
                Reports:
                - Allure: ${BUILD_URL}allure
                - Cucumber: ${BUILD_URL}cucumber-html-reports/overview-features.html
                - All Reports (ZIP): ${BUILD_URL}artifact/test-reports.zip
            """
        }
    }
} 