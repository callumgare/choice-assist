#!/usr/bin/env bash

inGlitch=${PROJECT_ID+true}

if [ "$NODE_ENV" = "production" ]; then
  if [ "$REBUILD" = "true" ] || [ ! -d "dist" ]; then 
    echo Building Project...
    rimraf dist
    npm run build; 
  fi;
  if [ "$inGlitch" = "true" ]; then
    ${APP_TYPES_DIR}/static/start.sh
  fi;
else
  rimraf dist
  npm run dev
fi