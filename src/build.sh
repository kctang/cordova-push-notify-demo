node r.js -o www/js/build.js

# remove components directory in android/assets/www
rm -fr ../android/assets/www/components
rm -fr ../android/assets/www/lib/jquery.mobile-1.3.0/demos

# copy to ios/www
rm -fr ../ios/www/*
cp -r ../android/assets/www/* ../ios/www