@echo off
echo ===============================
echo Iniciando sistema HUMIX
echo ===============================

REM Iniciar backend Node
start "Servidor Node" cmd /k node server.js

REM Espera breve
timeout /t 2 > nul

REM Servir PWA Angular (build)
start "Angular PWA" cmd /k npx http-server dist/humix

REM Iniciar cliente Python
timeout /t 2 > nul
start "Cliente Python" cmd /k venv\Scripts\python.exe cliente.py

start http://127.0.0.1:8080

echo Sistema iniciado correctamente
pause
