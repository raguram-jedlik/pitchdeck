@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d "C:\Users\shrih\OneDrive\Documents\GitHub\pitchdeck"
call npm run dev > dev.log 2>&1
