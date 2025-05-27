# React + Vite
hii namaste, H
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Jenkins pipeline for PostRepo

pipeline {
    agent any
    environment {
        // Define the Node.js home directory
        NODE_HOME = 'C:\\Program Files\\nodejs' // Update this path based on your Node.js installation
        PATH = "${NODE_HOME};${env.PATH}"      // Add Node.js to the PATH and retain existing PATH
        AZURE_APP_NAME = 'eshwar-test-02' // Replace with your Azure Web App name
        AZURE_RESOURCE_GROUP = 'eshwar' // Replace with your resource group
        
        
        
        
    }
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from your Git repository and specify the branch
                git branch: 'main', url: 'https://github.com/EshwarBashaBathini/PostRepo.git', credentialsId : '2cfb3354-b0cc-4c3f-890f-b339640f685f'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js dependencies (Windows command)
                    bat 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    // Build the frontend application (Windows command)
                    bat 'npm run build'
                }
            }
        }
        
         // Stage to check if the ZIP file exists and delete it if present
        stage('Check and Delete Old ZIP') {
            steps {
                script {
                    // Check if the dist.zip file exists and delete it if present
                    bat '''
                    IF EXIST dist.zip (
                        DEL /F /Q dist.zip
                        echo "Old dist.zip file deleted."
                    ) ELSE (
                        echo "No old dist.zip file found."
                    )
                    '''
                }
            }
        }
        
        stage('Create ZIP File') {
            steps {
                script {
                    // Create a zip file of the build output (assuming build output is in "dist" folder)
                    bat 'powershell -Command "Compress-Archive -Path dist\\* -DestinationPath dist.zip"'
                    // Alternatively, if the output directory is "build", use: 
                    // bat 'powershell -Command "Compress-Archive -Path build\\* -DestinationPath build.zip"'
                }
            }
        }        
        
        
        stage('Login to Azure') {
            steps {
                script {
                    // Log in using service principal
                    bat 'az login   --service-principal -u client_ID -p Clent_Password --tenant tenant_id'
                }
            }
        }

        stage('Deploy to Azure') {
            steps {
                script {
                    
                    // Use Azure CLI to deploy to Azure Web App
                    bat """
                    az webapp deploy --resource-group eshwar --name eshwar-test-02 --src-path dist.zip

                    """
                }
            }
        }
    }
    post {
        always {
            // Clean up or other post steps
            echo 'Deployment process finished.'
        }
    }
}



