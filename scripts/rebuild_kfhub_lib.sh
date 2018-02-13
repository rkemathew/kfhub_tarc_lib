DIR=`pwd`
cd ../kfhub_lib
npm run packagr
cd dist
npm pack
cd $DIR
rm -rf ./node_modules/kfhub_lib
npm install
