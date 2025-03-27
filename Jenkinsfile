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
        PATH = "/usr/local/bin:/opt/homebrew/bin:${env.PATH}"
    }

    options {
        timeout(time: 1, unit: 'HOURS')
        timestamps()
        disableConcurrentBuilds()
        quietPeriod(0)
    }

    stages {
        stage('Setup') {
            steps {
                wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
                    echo "🚀 Starting the test pipeline"
                    checkout scm

                    sh '''
                        mkdir -p ${TEST_RESULTS_DIR} ${REPORT_DIR} ${VIDEO_DIR} test-output
                        echo "🔍 Environment Info:"
                        echo "Node: $(node --version)"
                        echo "NPM: $(npm --version)"
                        
                        echo "🧹 Cleaning up previous installations..."
                        rm -rf node_modules package-lock.json
                        
                        echo "📦 Installing dependencies..."
                        npm cache clean --force
                        npm install --legacy-peer-deps --no-progress --quiet
                        
                        echo "📦 Installing Allure CLI..."
                        npm install -g allure-commandline
                    '''
                }
            }
        }

        stage('Test') {
            steps {
                wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
                    echo '🚀 Running E2E tests...'
                    sh '''
                        export LANG=en_US.UTF-8
                        export LC_ALL=en_US.UTF-8
                        
                        echo "📝 Starting Test Execution..."
                        echo "Current Directory: $(pwd)"
                        echo "Node Version: $(node --version)"
                        echo "NPM Version: $(npm --version)"
                        
                        # Configure Cypress for Allure reporting
                        export CYPRESS_allure=true
                        export CYPRESS_allureResultsDir=${TEST_RESULTS_DIR}
                        export CYPRESS_allureAttachRequests=true
                        
                        # Create necessary directories
                        mkdir -p ${TEST_RESULTS_DIR} ${REPORT_DIR} ${VIDEO_DIR}
                        
                        # Run tests with detailed logging and capture output
                        CYPRESS_VERBOSE=true npm run test -- --config video=true,screenshotOnRunFailure=true,reporter=cypress-multi-reporters,reporterOptions.configFile=cypress.config.js 2>&1 | tee test-output/test-run.log || {
                            echo "❌ Test execution failed with exit code $?"
                            echo "📋 Last 100 lines of test output:"
                            tail -n 100 test-output/test-run.log
                            echo "📁 Checking for error screenshots..."
                            if [ -d "cypress/screenshots" ]; then
                                echo "Found screenshots:"
                                ls -la cypress/screenshots/
                            fi
                            echo "📁 Checking for test videos..."
                            if [ -d "${VIDEO_DIR}" ]; then
                                echo "Found videos:"
                                ls -la ${VIDEO_DIR}/
                            fi
                            echo "📁 Checking for test results..."
                            if [ -d "${TEST_RESULTS_DIR}" ]; then
                                echo "Found test results:"
                                ls -la ${TEST_RESULTS_DIR}/
                            fi
                            echo "📁 Checking for cucumber reports..."
                            if [ -d "test-results" ]; then
                                echo "Found cucumber reports:"
                                ls -la test-results/
                            fi
                            exit 1
                        }
                        
                        echo "📊 Test Execution Completed"
                        echo "Checking test results..."
                        
                        # Check if test results exist
                        if [ -d "${TEST_RESULTS_DIR}" ]; then
                            echo "✅ Test results directory exists"
                            ls -la ${TEST_RESULTS_DIR}
                            
                            # Ensure Allure results are properly formatted
                            if [ -f "${TEST_RESULTS_DIR}/executor.json" ]; then
                                echo "✅ Allure executor info exists"
                            else
                                echo "📝 Creating Allure executor info..."
                                cat > ${TEST_RESULTS_DIR}/executor.json << EOF
{
    "name": "Jenkins",
    "type": "jenkins",
    "url": "${BUILD_URL}",
    "buildUrl": "${BUILD_URL}",
    "reportUrl": "${BUILD_URL}allure",
    "reportName": "Allure Report"
}
EOF
                            fi
                        else
                            echo "❌ Test results directory not found"
                        fi
                        
                        # Check if cucumber reports exist
                        if [ -f "${CUCUMBER_REPORT}" ]; then
                            echo "✅ Cucumber report exists"
                            cat ${CUCUMBER_REPORT} | jq '.'
                        else
                            echo "❌ Cucumber report not found"
                            echo "📁 Checking cucumber output directory..."
                            ls -la test-results/
                        fi
                        
                        # Copy Cypress videos to test-videos directory if they exist
                        if [ -d "cypress/videos" ]; then
                            echo "📼 Copying Cypress videos..."
                            mkdir -p ${VIDEO_DIR}
                            cp -r cypress/videos/* ${VIDEO_DIR}/ || true
                        fi
                    '''
                }
            }
        }

        stage('Process Videos') {
            steps {
                echo '🎥 Processing test videos...'
                sh '''
                    sleep 10
                    
                    if [ -d "${VIDEO_DIR}" ] && [ "$(ls -A ${VIDEO_DIR})" ]; then
                        echo "📽️ Converting videos..."
                        for video in ${VIDEO_DIR}/*.webm; do
                            if [ -f "$video" ]; then
                                filename=$(basename "$video" .webm)
                                echo "🔄 Converting ${filename}..."
                                
                                # Suppress ffmpeg output
                                if ffmpeg -y -i "$video" -c:v libx264 -crf 23 -preset medium -movflags +faststart "${TEST_RESULTS_DIR}/${filename}.mp4" 2>/dev/null; then
                                    echo "✅ Conversion successful"
                                else
                                    echo "⚠️ Conversion failed, keeping original format"
                                    cp "$video" "${TEST_RESULTS_DIR}/${filename}.webm"
                                fi
                            fi
                        done
                        echo "✅ Video processing complete"
                    else
                        echo "ℹ️ No videos to process"
                    fi
                '''
            }
        }

        stage('Generate Reports') {
            steps {
                wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
                    echo '📊 Generating reports...'
                    
                    // Always try to generate reports even if tests failed
                    allure([
                        includeProperties: false,
                        jdk: '',
                        properties: [],
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: "${TEST_RESULTS_DIR}"]]
                    ])

                    sh '''
                        echo "📦 Creating test reports archive..."
                        if [ -d "${TEST_RESULTS_DIR}" ] || [ -d "${REPORT_DIR}" ] || [ -d "${VIDEO_DIR}" ]; then
                            zip -r test-reports.zip ${TEST_RESULTS_DIR} ${REPORT_DIR} ${VIDEO_DIR} || true
                            echo "✅ Test reports archive created"
                        else
                            echo "⚠️ No test results to archive"
                        fi
                    '''
                }
            }
        }
    }

    post {
        always {
            wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
                echo '📦 Archiving artifacts...'
                archiveArtifacts artifacts: "${TEST_RESULTS_DIR}/**/*", fingerprint: true, allowEmptyArchive: true
                archiveArtifacts artifacts: "${REPORT_DIR}/**/*", fingerprint: true, allowEmptyArchive: true
                archiveArtifacts artifacts: "test-reports.zip", fingerprint: true, allowEmptyArchive: true
                
                sh '''
                    if [ -d "${VIDEO_DIR}" ] && [ "$(ls -A ${VIDEO_DIR})" ]; then
                        echo "📼 Archiving test videos..."
                        exit 0
                    else
                        echo "ℹ️ No videos to archive"
                        exit 0
                    fi
                '''
                
                archiveArtifacts artifacts: "${VIDEO_DIR}/**/*", fingerprint: true, allowEmptyArchive: true
                
                echo '🧹 Cleaning workspace...'
                cleanWs()
            }
        }
        success {
            wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
                echo """
                    ✅ Test Summary
                    Build: #${BUILD_NUMBER}
                    Status: SUCCESS
                    Reports:
                    - Allure: ${BUILD_URL}allure
                    - All Reports (ZIP): ${BUILD_URL}artifact/test-reports.zip
                """
                // Open Allure report in browser
                sh '''
                    echo "🌐 Opening Allure report in browser..."
                    if [[ "$OSTYPE" == "darwin"* ]]; then
                        open "${BUILD_URL}allure"
                    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
                        xdg-open "${BUILD_URL}allure"
                    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
                        start "${BUILD_URL}allure"
                    else
                        echo "⚠️ Could not determine OS type to open browser"
                    fi
                '''
            }
        }
        unstable {
            wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
                echo """
                    ⚠️ Test Summary
                    Build: #${BUILD_NUMBER}
                    Status: UNSTABLE
                    Reports:
                    - Allure: ${BUILD_URL}allure
                    - All Reports (ZIP): ${BUILD_URL}artifact/test-reports.zip
                """
            }
        }
        failure {
            wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
                echo """
                    ❌ Test Summary
                    Build: #${BUILD_NUMBER}
                    Status: FAILED
                    Reports:
                    - Allure: ${BUILD_URL}allure
                    - All Reports (ZIP): ${BUILD_URL}artifact/test-reports.zip
                """
            }
        }
    }
} 