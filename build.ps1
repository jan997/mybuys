
pause
Remove-Item /node/build –recurse
pause
cd "node"
pause
tsc --build
pause
cd ..
pause
cd "client"
pause
npm run-script build
pause
move build ../node/build/client
cd ..
cd "node"
node build/index.js
pause