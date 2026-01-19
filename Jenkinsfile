pipeline {
    agent any

    tools {
        jdk 'jdk17'
        nodejs 'node18'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('SonarCloud Analysis') {
            steps {
                withSonarQubeEnv('SonarCloud') {
                    bat "${tool 'sonar-scanner'}\\bin\\sonar-scanner.bat"
                }
            }
        }
    }
}
