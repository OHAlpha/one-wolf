#!/bin/bash

echo "@import 'rainbow-palette.one-wolf';"

for color in alpha beta gamma delta epsilon zeta eta theta iota
do

for index in 0 1 2 3 4
do

cat << END
.background-$color-$index {
    background-color: \$theme-col-$color-$index;
}
.color-alpha-0 {
    color: \$theme-col-$color-$index;
}
END

done

done