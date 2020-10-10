$host.ui.rawui.windowtitle="Clean Olds Builds"



cd "node"

write "###############################################"
write "Borrando old build"
write "###############################################"
Remove-Item client –recurse

write " "

#write "Nuva build"
#tsc --build

cd ..