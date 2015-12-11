jekyll build --incremental
cd _site
git add -A
git commit -am "updated blog"
git push origin master -f
cd ..