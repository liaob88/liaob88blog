# Article info
echo 'Type new article title'
read TITLE
echo 'Type new article description'
read DESCRIPTION
echo 'Type new article slug'
read SLUG
echo 'Type new article tags'
declare TAGS=()
read TAGS
NOW=`date "+%Y-%m-%d %H:%M"`

# Generate new md file with writing the article info on the file
echo 'In Progress...'
cat <<EOF > "src/blogs/${TITLE}.md"
---
title: $TITLE
description: $DESCRIPTION
date: $NOW
slug: $SLUG
tags: [$TAGS]
---
##
##
##
EOF
echo 'Done! File created!'
