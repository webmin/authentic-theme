#!/usr/bin/env bash

#########################################################
# Update Authentic Theme to the latest from GitHub repo #
#########################################################

# Get parent dir based on script's location
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DIR="$(echo $DIR | sed 's/\/authentic-theme//g')"
PROD=${DIR##*/}
CURRENT=$PWD

# Clear the screen for better readability
clear

# Ask user to confirm update operation
read -p "Would you like to update Authentic Theme for "${PROD^}"? [y/N] " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo -e "\e[49;1;35;82mOperation aborted.\e[0m"
else

  # Require privileged user to run the script
  if [[ $EUID -ne 0 ]]; then
    echo -e "\e[49;0;31;82mError: This command has to be run under the root user.\e[0m"
  else

    # Require `git` command availability
    if type git >/dev/null 2>&1
    then

      # Pull latest changes
      echo -e "\e[49;1;34;182mPulling in latest changes for\e[0m \e[49;1;37;182mAuthentic Theme\e[0m (https://github.com/qooob/authentic-theme)..."
      git clone --depth 1 https://github.com/qooob/authentic-theme.git "$DIR/.~authentic-theme"

      # Checking for possible errors
      if [ $? -eq 0 ] && [ -f "$DIR/.~authentic-theme/VERSION.txt" ]; then

        # Post successful commands
        rm -rf "$DIR/authentic-theme"/*
        mv "$DIR/.~authentic-theme"/* "$DIR/authentic-theme/"
        rm -rf "$DIR/.~authentic-theme"

        if [[ $PROD = "usermin" ]]; then
          rm -f "$DIR/authentic-theme/update"
        fi

        # Local clear
        if [ -f "$DIR/authentic-theme/.debug.pm" ]; then
          rm -f "$DIR/authentic-theme/.debug.pm"
        fi
        rm -f "$DIR/authentic-theme/README.md"

        if [ $? -eq 0 ] && [ -f "$DIR/authentic-theme/version" ]; then
          echo -e "\e[49;32;5;82mUpdating to Authentic Theme `head -n 1 $DIR/authentic-theme/version`, done.\e[0m"
        else
          echo -e "\e[49;32;5;82mUpdating to Authentic Theme `head -n 1 $DIR/authentic-theme/VERSION.txt`, done.\e[0m"
        fi

        # Restart Webmin/Usermin in case it's running
        if [ -z $1 ]; then
          if ps aux | grep -v grep | grep $PROD/miniserv.pl > /dev/null
          then
            echo -e "\e[49;3;37;182mRestarting "${PROD^}"..\e[0m"
            service $PROD restart >/dev/null 2>&1
          fi
        fi
      else
        # Post fail commands
        rm -rf "$DIR/.~authentic-theme"
        echo -e "\e[49;0;31;82mUpdating Authentic Theme, failed.\e[0m"
      fi
    else
      echo -e "\e[49;0;33;82mError: Command \`git\` is not installed or not in the \`PATH\`.\e[0m";
    fi

  fi

fi
