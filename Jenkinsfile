pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    environment {
        DOCKER_IMAGE_NAME = "riddhijadhav0809/pawmise-backend"
        DOCKER_TAG = "latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Riddhi0809/Pawmise.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test || exit 0'
            }
        }

        stage('SonarCloud Analysis') {
            steps {
                withSonarQubeEnv('SonarCloud') {
                    bat 'sonar-scanner'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat '''
                cd backend
                docker build -t %DOCKER_IMAGE_NAME%:%DOCKER_TAG% .
                '''
            }
        }
    }
}
