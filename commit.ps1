param([switch]$nopause)
$host.ui.rawui.windowtitle="Git Update"

git add *
$comment = Read-Host 'Comentario del commit?'
git commit -m $comment
git push origin master
PAUSE