printf "Deploying server to Heroku"
git subtree push --prefix server heroku master
printf "Deploying client to Now"
cd client && now --target production