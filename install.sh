#!/bin/bash
# locate the dir where this script is stored
export dbDir="$( cd -P "$( dirname "$0" )" && pwd )"

# Symlink to ~/.docker_breeze if installing from another path
if [ "$dbDir" != "$HOME/.docker_breeze" ]; then
  ln -fs "$dbDir" "$HOME/.docker_breeze"
fi

# This loads Docker Breeze into the shell session.
exec_string="[ -s \"$HOME/.docker_breeze/lib/aliases.sh\" ] && source \"$HOME/.docker_breeze/lib/aliases.sh\""

# Add line to bashrc and bash_profile if not already present.
added_to_profile=false
already_present=false
for rc in bashrc bash_profile; do
  if [ -s "$HOME/.$rc" ]; then
    if grep -q "$exec_string" "$HOME/.$rc"; then
      printf "== Already installed in '~/.$rc'\n"
      already_present=true
    else
      printf "\n$exec_string\n" >> "$HOME/.$rc"
      printf "== Added Docker Breeze to '~/.$rc'\n"
      added_to_profile=true
    fi
  fi
done

# Add line to .zshrc if not aleady present.
# When set, the ZDOTDIR environment variable states the directory zshrc is in.
# If not set, HOME environment variable is used as fallback.
if [ -s "${ZDOTDIR:-$HOME}/.zshrc" ]; then
  if grep -q "$exec_string" "${ZDOTDIR:-$HOME}/.zshrc"; then
    printf "== Already installed in '${ZDOTDIR:-$HOME}/.zshrc'\n"
    already_present=true  
  else
    printf "\n$exec_string\n" >> "${ZDOTDIR:-$HOME}/.zshrc"
    printf "== Added Docker Breeze to '${ZDOTDIR:-$HOME}/.zshrc'\n"
    already_present=true
  fi
fi

if [ "$added_to_profile" = true ] || [ "$already_present" = true ]; then
  echo "== Docker Breeze Installed! Run 'source ~/.bashrc || source ~/.bash_profile' or 'source \"${ZDOTDIR:-$HOME}/.zshrc\"'"
  echo "   to load Docker Breeze into your current shell."
else
  echo "== Error:"
  echo "   Found no profile to add Docker Breeze to."
  echo "   Add line to your shell profile and source it to install manually:"
  printf "   $exec_string\n"
fi