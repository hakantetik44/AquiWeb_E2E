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
        CUCUMBER_REPORT = 'cucumber-report.json'
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
                        echo "📦 Installing dependencies..."
                        rm -f package-lock.json
                        npm install --no-progress --quiet
                        
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
                        
                        echo "📝 Test Steps:"
                        echo "1. Navigation vers la page d'accueil"
                        npm run test
                        
                        echo "2. Cliquer sur Logiciel MES"
                        echo "3. Cliquer sur Aquiweb"
                        echo "4. Vérifier le titre de la page"
                        echo "5. Prendre une capture d'écran"
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
                    
                    allure([
                        includeProperties: false,
                        jdk: '',
                        properties: [],
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: "${TEST_RESULTS_DIR}"]]
                    ])

                    sh 'zip -r test-reports.zip ${TEST_RESULTS_DIR} ${REPORT_DIR} ${VIDEO_DIR}'
                }
            }
        }
    }

    post {
        always {
            wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
                echo '📦 Archiving artifacts...'
                archiveArtifacts artifacts: "${TEST_RESULTS_DIR}/**/*", fingerprint: true, allowEmptyArchive: true
                archiveArtifacts artifacts: "${VIDEO_DIR}/**/*", fingerprint: true, allowEmptyArchive: true
                archiveArtifacts artifacts: "test-reports.zip", fingerprint: true, allowEmptyArchive: true
                
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