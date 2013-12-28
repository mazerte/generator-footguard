#!/bin/bash

dir="$(dirname $FILE)"
name="$(basename $FILE)"
current="$(pwd)"

cd $dir
base64 $name > $name"_base64"
split -b 100 -a 2 $name"_base64" $name"_part_"

count=0
(ls $dir | grep $name"_part_") | while read FILENAME 
do 
	content="$(cat $FILENAME)"
	rm -f $FILENAME
	cd "$current"
	echo "- secure: $(travis encrypt "id_rsa_$count=$content" --no-interactive)"
	cd $dir
	count=$((count +1))
done
rm -f $FILE"_base64"
cd "$current"