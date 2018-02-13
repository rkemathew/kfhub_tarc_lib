case $1 in

"tarc" | "tacq" | "orgp")
    DIR=`pwd`
    cd ../kfhub_$1_lib
    npm run packagr
    cd dist
    npm pack
    cd $DIR
    rm -rf ./node_modules/kfhub_$1_lib
    npm install
    ;;

*)
    echo "Please include one of the following arguments to this command:"
    echo "tarc - Talent Architect (Profile Management)"
    echo "tacq - Talent Acquisition"
    echo "orgp - Organization Performance"
    ;;

esac
