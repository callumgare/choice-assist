#!/usr/bin/env bash

inGlitch=${PROJECT_ID+true}

if [ "$NODE_ENV" = "production" ]; then
  if [ "$REBUILD" = "true" ] || [ ! -d "dist" ]; then 
    echo Building Project...
    rimraf dist
    npm run build; 
  fi;
  if [ "$inGlitch" = "true" ]; then
    /etc/app-types/static/start.sh
  fi;
else
  npm run dev
fi