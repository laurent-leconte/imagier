npm run build
aws s3 sync ./dist/ s3://imagier --acl public-read --delete --profile perso
