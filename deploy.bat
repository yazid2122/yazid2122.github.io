@echo off
echo ===================================================
echo     Deploying Portfolio to GitHub Pages
echo ===================================================
echo.

:: Initialize git if not already initialized
if not exist ".git" (
    git init
    echo [OK] Git repository initialized.
)

:: Add all files
git add .
echo [OK] Files added to staging.

:: Commit changes
git commit -m "feat: deploy elegant minimalist portfolio"
echo [OK] Changes committed.

:: Change branch to main
git branch -M main

:: Check if remote origin exists, if not add it, if yes set-url
git remote get-url origin >nul 2>&1
if %errorlevel% equ 0 (
    git remote set-url origin https://github.com/yazid2122/yazid2122.github.io.git
    echo [OK] Updated existing remote 'origin'.
) else (
    git remote add origin https://github.com/yazid2122/yazid2122.github.io.git
    echo [OK] Added new remote 'origin'.
)

:: Push to GitHub
echo.
echo Pushing code to GitHub... 
echo (A browser window might pop up asking you to log into GitHub - just click authorize)
echo.
git push -u origin main

echo.
echo ===================================================
echo DONE! 
echo Your code is pushed. GitHub will now automatically 
echo build it and host it at https://yazid2122.github.io
echo ===================================================
pause
