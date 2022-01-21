#/bin/sh

read -p "Enter release version (current version is $(git describe|cut -f1 -d-), press just enter for preview release): v"

echo "X${REPLY}X"

if [ -z "${REPLY}" ]
then
  git tag $(git describe) -m ""
else
  git tag v${REPLY} -m ""
fi

git push --tags
