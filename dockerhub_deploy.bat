@echo off
setlocal enabledelayedexpansion

echo Starting deployment from Docker Hub...

set DOCKERHUB_USERNAME=your-username
set IMAGE_NAME=my-node-app
set TAG=latest
set COMPOSE_FILE=docker-compose.prod.yaml

:: Обновляем образы
echo Pulling latest images...
docker-compose -f %COMPOSE_FILE% pull

:: Останавливаем и удаляем старые контейнеры
echo Stopping existing containers...
docker-compose -f %COMPOSE_FILE% down

:: Запускаем новые контейнеры
echo Starting new containers...
docker-compose -f %COMPOSE_FILE% up -d

echo Deployment from Docker Hub completed successfully!
pause