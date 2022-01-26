#/bin/sh

git fetch --tags

read -p "Enter release version (current version is $(git describe|cut -f1 -d-), press just enter for preview release): v"

if [ -z "${REPLY}" ]
then
  git tag $(git describe --match "$(git describe|cut -f1 -d-)") -m ""
else
  git tag v${REPLY} -m ""
fi

git push --tags
