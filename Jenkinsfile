pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    environment {
        NAME = "bitshares-dream"
        HOST = "$GL_PUBLIC_WEBSITES"
        PASS = credentials('gl_public_websites')
    }
    stages {
        stage ('Checkout') {
            steps {
                sh 'printenv'
            }
        }
        stage('Build & Deploy') {
            when {
                branch "master"
            }
            steps {
                sh "docker build -f Dockerfile --build-arg DEPLOY_PASS=$PASS --build-arg DEPLOY_NAME=$NAME --build-arg DEPLOY_HOST=$HOST -t $NAME ."
            }
        }
    }
}
