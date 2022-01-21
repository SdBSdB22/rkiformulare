#/bin/sh

read -p "Enter release version (current version is , press just enter for preview release): v"

echo "XX"

if [ -z "" ]
then
  git tag  -m ""
else
  git tag v -m ""
fi

git push --tags
