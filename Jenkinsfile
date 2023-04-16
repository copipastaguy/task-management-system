pipeline {
    agent none
    stages {
        stage("Fetch repo") {
            steps {
                checkout scm
                echo "Checking out repository"
                sh 'node --version'
            }
        }

        stage("Build docker container for client") {
            agent {
                dockerfile {
                    dir "client"
                }
            }

            steps {
               echo "Building docker image from dockerfile in client" 
            }
        }
    }
}
