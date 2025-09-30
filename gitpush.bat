@echo off
echo Initializing Git repository and pushing to remote...

:: Инициализация Git
git init

:: Добавление удаленного репозитория
git remote add origin https://github.com/DanTheKo/my_node_app_for_docker.git

:: Добавление всех файлов
git add .

:: Первый коммит
git commit -m "Initial commit: Dockerized Node.js app with PostgreSQL and pgAdmin"

:: Пуш в репозиторий (может потребоваться авторизация)
git branch -M main
git push -u origin main

echo Repository initialized and pushed successfully!
pause