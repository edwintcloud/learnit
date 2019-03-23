# Learnit Server
API Server for Learnit

## Getting Started
To get started with development, clone this repo and run the following commands from the root of the repository:
```bash
docker-compose build
docker-compose up
```
## Deployment
Server is ready to be deployed to heroku. Ensure heroku is installed globally and run the following commands from the root of the repository to deploy.
```bash
git subtree push --prefix server heroku master
```
Configuration for heroku deployment is located in `Procfile`. Environmental variables must be added to heroku. Required environmental variables can be found in the `docker-compose.yml` file. JawsDB Maria is reccomended for the production database.
