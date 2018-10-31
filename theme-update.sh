#!/usr/bin/env bash

#########################################################
# Update Authentic Theme to the latest from GitHub repo #
#########################################################

# Get parent dir based on script's location
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DIR="$(echo $DIR | sed 's/\/authentic-theme.*//g')"
PROD=${DIR##*/}
CURRENT=$PWD
GIT="git"
CURL="curl"
REPO="authentic-theme/authentic-theme"

# Clear the screen for better readability
clear

if [[ "$1" == "-h" || "$1" == "-help" || "$1" == "--help" ]] ; then
  echo -e "\e[0m\e[49;0;33;82mAuthentic Theme\e[0m update script"
  echo "Usage:  ./`basename $0` { [-beta] | [-release] | [-release:number] }"
  exit 0
fi

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
    if ! type ${GIT} >/dev/null 2>&1
    then
      # Use `PATH` from Webmin `config` file
      if [[ -f "/etc/webmin/config" ]] ; then
        WMCONF="/etc/webmin/config"
      else
        WMCONF=`find /* -maxdepth 6 -name miniserv.conf 2>/dev/null | grep ${PROD} | head -n 1`
        WMCONF="${WMCONF/miniserv.conf/config}"
      fi
      # Export `PATH` using Webmin `config` file directive
      if [[ "${WMCONF}" ]]; then
        WMCONFPATH=$(grep -Po '(?<=^path=).*$' ${WMCONF})
        if [[ "${WMCONFPATH}" ]]; then
          export PATH="${PATH}:${WMCONFPATH}"
        fi
      fi
    fi

    # Clear cache if present
    if [ -d "$DIR/.~authentic-theme" ] ; then
      rm -rf "$DIR/.~authentic-theme"
    fi

    # Require `git` command availability
    if type ${GIT} >/dev/null 2>&1
    then
      # Try to download latest version of the update script for Webmin/Usermin
      if type ${CURL} >/dev/null 2>&1
      then
        GITAPI="https://api.github.com/repos/webmin/webmin/contents"
        UPDATE="update-from-repo.sh"

        # Backup current script file first in case something goes wrong
        mv $DIR/${UPDATE} $DIR/${UPDATE}.bak
        # Get latest update script
        curl -s -o $DIR/${UPDATE} -H "Accept:application/vnd.github.v3.raw" ${GITAPI}/${UPDATE}
        if [ $? -eq 0 ]; then
          chmod +x $DIR/${UPDATE}
        else
          mv $DIR/${UPDATE}.bak $DIR/${UPDATE}
        fi
      else
        echo -e "\e[49;0;33;82mError: Command \`curl\` is not installed or not in the \`PATH\`.\e[0m";
        exit
      fi
      
      # Pull latest changes
      if [[ "$1" == *"-release"* ]]; then
        if [[ "$1" == *":"* ]] && [[ "$1" != *"latest"* ]]; then
          RRELEASE=${1##*:}
          PRRELEASE="--branch ${RRELEASE} --quiet"
          PRRELEASETAG=${1##*:}
        else
          if type ${CURL} >/dev/null 2>&1
          then
            LINK=`curl -s https://api.github.com/repos/$REPO/releases/latest | grep browser_download_url | head -n 20 | cut -d '"' -f 4 | grep rpm`
            VERSION=`curl -s https://api.github.com/repos/$REPO/releases/latest | grep tag_name | head -n 1`
            [[ $VERSION =~ [0-9]+\.[0-9]+|[0-9]+\.[0-9]+\.[0-9]+ ]]
            PRRELEASE="--branch ${BASH_REMATCH[0]} --quiet"
            PRRELEASETAG=${BASH_REMATCH[0]}
          else
            echo -e "\e[49;0;33;82mError: Command \`curl\` is not installed or not in the \`PATH\`.\e[0m";
            exit
          fi
        fi
        echo -e "\e[49;1;34;182mPulling in latest release of\e[0m \e[49;1;37;182mAuthentic Theme\e[0m $PRRELEASETAG (https://github.com/$REPO)..."
        RS="$(${GIT} clone --depth 1 $PRRELEASE https://github.com/$REPO.git "$DIR/.~authentic-theme" 2>&1)"
        if [[ "$RS" == *"ould not find remote branch"* ]]; then
          ERROR="Release ${RRELEASE} doesn't exist. "
        fi
      else
        echo -e "\e[49;1;34;182mPulling in latest changes for\e[0m \e[49;1;37;182mAuthentic Theme\e[0m (https://github.com/$REPO)..."
        ${GIT} clone --depth 1 --quiet https://github.com/$REPO.git "$DIR/.~authentic-theme"
      fi

      # Check version compatibility
      if [ -z ${WEBMIN_CONFIG} ]; then
        DVER=$(grep -Po '(?<=^depends=).*$' "$DIR/.~authentic-theme/theme.info" 2>&1)
        TVER=$(grep -Po '(?<=^version=).*$' "$DIR/.~authentic-theme/theme.info" 2>&1)
        GRPERR=$?
        PVER=`head -n 1 $DIR/version`
        RVER=$(echo "$DVER" | cut -d ' ' -f 1)

        if [ $PROD == "usermin" ]; then
          if [ ${#TVER} -ge "8" ]; then
            RVER=$(echo "$DVER" | cut -d ' ' -f 2)
          else
            RVER=0
          fi
        fi
        if [ $GRPERR  -eq 0 ]; then
          if [[ $RVER > $PVER ]]; then
            echo -e "
\e[47;1;31;82mWarning!\e[0m Installing this version of \e[49;1;37;182mAuthentic Theme\e[0m \e[49;32m"${TVER^}"\e[0m requires
latest and/or possibly unreleased version of \e[49;1;37;182m"${PROD^}"\e[0m to work properly.
Your current version of \e[49;1;37;182m"${PROD^}"\e[0m is \e[49;33m"${PVER^}"\e[0m. There might be incompatible
changes, that could stop the theme from working as designed.
It is recommended to upgrade \e[49;1;37;182m"${PROD^}"\e[0m to the latest development version, by
running \e[3m\`update-from-repo.sh\`\e[0m script from \e[3m\`"$DIR"\`\e[0m directory."

            read -p "Do you want to continue to force install the theme anyway? [y/N] " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
              rm -rf "$DIR/.~authentic-theme"
              echo -e "\e[49;1;35;82mOperation aborted.\e[0m"
              exit
            fi
          fi
        fi
      fi

      # Checking for possible errors
      if [ $? -eq 0 ] && [ -f "$DIR/.~authentic-theme/theme.info" ]; then
        # Post successful commands
        rm -rf "$DIR/authentic-theme"/*
        mv "$DIR/.~authentic-theme"/* "$DIR/authentic-theme/"
        rm -rf "$DIR/.~authentic-theme"

        # Local clear
        rm -f "$DIR/authentic-theme/README.md"
        find "$DIR/authentic-theme/" -name "*.src*" -delete

        TVER=$(grep -Po '(?<=^version=).*$' "$DIR/authentic-theme/theme.info" 2>&1)
        if [ $? -eq 0 ]; then
          echo -e "\e[49;32mUpdating to Authentic Theme $TVER, done.\e[0m"
        else
          echo -e "\e[49;32mUpdating to the latest Authentic Theme, done.\e[0m"
        fi

        # Restart Webmin/Usermin in case it's running
        if [ "$2" != "-no-restart" ]; then
          if ps aux | grep -v grep | grep $PROD/miniserv.pl > /dev/null
          then
            echo -e "\e[49;3;37;182mRestarting "${PROD^}"..\e[0m"
            service $PROD restart >/dev/null 2>&1
          fi
        fi
      else
        # Post fail commands
        rm -rf "$DIR/.~authentic-theme"
        echo -e "\e[49;0;31;82m${ERROR}Updating Authentic Theme, failed.\e[0m"
      fi
    else
      echo -e "\e[49;0;33;82mError: Command \`git\` is not installed or not in the \`PATH\`.\e[0m";
    fi
  fi
fi
