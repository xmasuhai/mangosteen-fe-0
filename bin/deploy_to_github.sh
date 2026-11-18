#!/usr/bin/env bash
rm -rf dist
pnpm build --base='/mangosteen-fe-0-publish/'
cd dist
git init
git add .
git commit -m deploy
git remote add origin git@github.com:xmasuhai/mangosteen-fe-0-publish.git
git push -f origin master:master
cd -