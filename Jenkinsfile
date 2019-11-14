pipeline {
    agent none
    environment {
        GCR_CREDENTIALS = credentials('NPE_GCR_CARBON_CREDENTIALS')
        GCR_REPO = 'gcr.io/gcp-ushi-carbon-svcs-dev/taxonomy-pres-app'
        NPM_TOKEN = credentials('NPM_TOKEN')
    }
    options {
       timeout(time: 10, unit: 'MINUTES')
       timestamps()
   }
    stages {
        stage('Build Application') {
            agent {
                docker {
                    label 'docker'
                    image 'nexus.d.lowes.com:8800/digital/node-build-agent:1.4.0'
                    args  '-v /home/jenkins/.ssh:/home/jenkins/.ssh'
                }
            }
            stages {
                stage('Install Dependencies') {
                    steps {
                        sh 'npm install'
                    }
                }
                stage('Rubuild Linux node-sass') {
                    steps {
                        sh 'npm rebuild node-sass'
                    }
                }
                stage('Run Tests') {
                    steps {
                        sh 'npm test'
                    }
                }
                stage('Build App') {
                    steps {
                        sh 'npm run build'
                    }
                }
                stage('Prepare For Release') {
                    when {
                        branch 'master'
                    }
                    steps {
                        sh 'npm prune --production'
                    }
                }
            }
        }
        stage('Build and Push Docker Image') {
            agent { label 'docker' }
            when {
                branch 'develop'
            }
            steps {
                script {
                    COMMIT_ID = sh(returnStdout: true, script: 'git rev-parse HEAD')
                    IMAGE_TAG = "JENKINS-${env.BUILD_ID}_${BRANCH_NAME}_${COMMIT_ID}"

                    sh 'echo $GCR_CREDENTIALS > keyfile.json'
                    sh 'docker login -u _json_key -p "$(cat keyfile.json)" https://gcr.io'
                    sh "docker build . -t ${GCR_REPO}:${IMAGE_TAG}"
                    sh "docker push ${GCR_REPO}:${IMAGE_TAG}"
                    sh 'docker logout https://gcr.io'
                }
            }
        }
    }
}
