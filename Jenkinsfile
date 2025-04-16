pipeline {
    agent any

    environment {
        NODE_VERSION = '18'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Clonando el repositorio...'
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                echo 'Configurando Node.js...'
                sh "nvm install ${NODE_VERSION}"
                sh "nvm use ${NODE_VERSION}"
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Instalando dependencias...'
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                echo 'Ejecutando linter...'
                sh 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                echo 'Construyendo el proyecto...'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Ejecutando pruebas...'
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Desplegando la aplicación...'
                withCredentials([string(credentialsId: 'vercel-token', variable: 'VERCEL_TOKEN')]) {
                    sh '''
                        npx vercel --token $VERCEL_TOKEN --prod
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado.'
        }
        success {
            echo 'Pipeline ejecutado con éxito.'
        }
        failure {
            echo 'El pipeline falló.'
        }
    }
}