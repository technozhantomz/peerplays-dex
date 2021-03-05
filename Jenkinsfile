pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    environment {
        NAME = "${JOB_NAME.replaceAll("/", "-").toLowerCase()}"
        HOST = "$GL_TEST_WEBSITES"
        DEPLOY_PATH = "$GL_TEST_WEBSITES_PATH"
        PASS = credentials('gl_test_websites')
    }
    stages {
        stage ('Checkout') {
            steps {
                sh 'printenv'
            }
        }
        stage('Build & Deploy') {
            steps {
                sh "docker build -f Dockerfile --build-arg DEPLOY_PASS=$PASS --build-arg DEPLOY_NAME=$NAME --build-arg DEPLOY_HOST=$HOST --build-arg DEPLOY_PATH=$DEPLOY_PATH -t $NAME ."
            }
        }
    }
}
