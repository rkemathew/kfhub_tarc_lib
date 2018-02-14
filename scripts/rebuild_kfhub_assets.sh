case $1 in

"fonts" | "images" | "config")
    cp -ruv ../kfhub_app/src/assets/$1/* ./src/assets/$1
    ;;

*)
    echo "Please include one of the following arguments to this command:"
    echo "    fonts  - Syncs all assets/fonts  from kfhub_app to this project"
    echo "    images - Syncs all assets/images from kfhub_app to this project"
    echo "    config - Syncs all assets/config from kfhub_app to this project"
    echo "Usage Example:"
    echo "    npm run rebuild:assets -- images"
    ;;

esac
