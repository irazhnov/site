DIC
# steps to install
#install cordova

npm install cordova -g

# install dependecies

npm unstall

# create build

npm run dist

# install cordova plaforms
cordova pltform add android
cordova pltform add ios

# create cordova build for platform directly to device

cordova run android -device
cordova run ios -device

# add plugin Ad
#cordova plugin add https://github.com/Rickgbw/cordova-plugin-dfp

#cordova plugin add cordova-plugin-admob-simple

#NEW
#install plugin to hide Status Bar

cordova plugin add cordova-plugin-statusbar

#install plugin to detect device info

cordova plugin add cordova-plugin-device

cordova plugin add cordova-plugin-splashscreen