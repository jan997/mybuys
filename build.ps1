$host.ui.rawui.windowtitle="TabBuild"

cd "node"

write "###############################################"
write "Borrando old build"
write "###############################################"
Remove-Item client –recurse

write " "

#write "Nuva build"
#tsc --build

cd ..

cd "client"

write "###############################################"
write "Nueva build del cliente"
write "###############################################"
npm run-script build

write "###############################################"
write "La momemos a la build del servidor"
write "###############################################"
move build ../node/client

cd ..

cd "node"

write "###############################################"
write "Iniciamos el servidor"
write "###############################################"
npm start
pause

