DIR=`pwd`
cd ../kfhub_lib
npm run packagr
cd dist
npm pack
cd $DIR
npm install kfhub_lib --force

