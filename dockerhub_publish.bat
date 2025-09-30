@echo off
setlocal enabledelayedexpansion

echo Building and pushing to Docker Hub...

set DOCKERHUB_USERNAME=danikod
set IMAGE_NAME=my-node-app
set TAG=latest

:: Логин в Docker Hub (раскомментировать при необходимости)
:: echo Please enter your Docker Hub password:
:: docker login -u %DOCKERHUB_USERNAME%

:: Сборка образа
echo Building Docker image...
docker build -t %DOCKERHUB_USERNAME%/%IMAGE_NAME%:%TAG% .

:: Пуш образа в Docker Hub
echo Pushing image to Docker Hub...
docker push %DOCKERHUB_USERNAME%/%IMAGE_NAME%:%TAG%

echo Build and push completed successfully!
pause