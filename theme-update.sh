#!/bin/bash

#########################################################
# Update Authentic Theme to the latest from GitHub repo #
#########################################################

# Get parent dir based on script's location
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DIR="$(echo $DIR | sed 's/\/authentic-theme//g')"

# Clear the screen for better readability
clear

# Ask user to confirm update operation
read -p "Would you like to update Authentic Theme to the latest? [y/N] " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo -e "\e[49;0;35;82mOperation aborted.\e[0m"
  exit 1
fi

# Require privileged user to run the script
if [[ $EUID -ne 0 ]]; then
  echo -e "\e[49;0;31;82mError: This command has to be run under the root user.\e[0m"
  exit 1
fi

# Require `git` command availability
type git >/dev/null 2>&1 || { echo -e >&2 "\e[49;0;33;82mError: Command \`git\` is not installed or not in the \`PATH\`.\e[0m"; exit 1; }

# Pull latest changes
echo -e "\e[49;0;34;182mPulling in latest changes for\e[0m \e[49;1;37;182mAuthentic Theme\e[0m (https://github.com/qooob/authentic-theme)..."
git clone --depth 1 https://github.com/qooob/authentic-theme.git "$DIR/.~authentic-theme"

# Checking for possible errors
if [ $? -eq 0 ] && [ -f "$DIR/.~authentic-theme/version" ]; then

  # Post successful commands
  rm -rf "$DIR/authentic-theme"
  mv "$DIR/.~authentic-theme" "$DIR/authentic-theme"
  rm -rf "$DIR/authentic-theme/.git"
  rm -rf "$DIR/authentic-theme/.github"
  rm -f "$DIR/authentic-theme/update"
  rm -f "$DIR/authentic-theme/README.md"
  echo -e "\e[49;32;5;82mUpdating to Authentic Theme `head -n 1 $DIR/authentic-theme/version`, done.\e[0m"
else

  # Post fail commands
  rm -rf "$DIR/.~authentic-theme"
  echo -e "\e[49;0;31;82mUpdating Authentic Theme, failed.\e[0m"
fi
