@echo off
title SISTEMA OS-MOTOCICLETAS (FULL STACK)
cls
echo ===============================================
echo   INICIANDO MOTORES - MOTOCICLETAS BRASIL
echo ===============================================

:: 1. INICIANDO O BACKEND (MINIMIZADO)
echo [1/3] Ligando a API (Backend)...
cd /d "C:\Users\sergi\Desktop\PROJECTS 2025\PRODUTOS_para_VENDA\MOTOCICLETAS_BRASIL\OS-SYSTEM-MOTOCICLETAS\os-backend"
start "API-BACKEND" /min cmd /c "npm run dev"

:: 2. AGUARDANDO A API ESTABILIZAR
timeout /t 5 /nobreak > nul

:: 3. INICIANDO O FRONTEND (MINIMIZADO)
echo [2/3] Abrindo Painel Web (Frontend)...
cd /d "C:\Users\sergi\Desktop\PROJECTS 2025\PRODUTOS_para_VENDA\MOTOCICLETAS_BRASIL\OS-SYSTEM-MOTOCICLETAS\painel-web"
start "PAINEL-WEB" /min cmd /c "npm run dev"

:: 4. ABRIR O NAVEGADOR AUTOMATICAMENTE
echo [3/3] Abrindo o sistema no navegador...
timeout /t 8 /nobreak > nul

:: AJUSTE A PORTA ABAIXO (Mude para 5173 se for Vite ou 3001 se for React comum) / http://192.168.1.4:5173 para computer + smartphone via wi-fi
start http://192.168.1.4:5173

echo ===============================================
echo   SISTEMA PRONTO PARA USO - 2026
echo ===============================================
timeout /t 3
exit