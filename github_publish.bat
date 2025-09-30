@echo off
setlocal enabledelayedexpansion

echo Starting deployment from GitHub...

set REPO_URL=https://github.com/DanTheKo/my_node_app_for_docker.git
set PROJECT_PATH=.
set COMPOSE_FILE=docker-compose.yaml

:: Проверяем, существует ли папка с проектом
if exist "%PROJECT_PATH%\.git" (
    echo Updating existing repository...
    cd %PROJECT_PATH%
    git pull
) else (
    echo Cloning repository...
    git clone %REPO_URL% %PROJECT_PATH%
    cd %PROJECT_PATH%
)

:: Останавливаем и удаляем контейнеры
echo Stopping existing containers...
docker-compose -f %COMPOSE_FILE% down

:: Запускаем новые контейнеры
echo Starting new containers...
docker-compose -f %COMPOSE_FILE% up -d --build

echo Deployment completed successfully!
pause