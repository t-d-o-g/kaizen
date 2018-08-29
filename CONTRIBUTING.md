# Contributing to Kaizen! #

## Git Workflow ##

[Git flow](https://jeffkreeftmeijer.com/git-flow/) branching model is used for managing branches and releases. 

To automate release process, install [git-flow Git extension](https://github.com/nvie/gitflow).
After cloning repo, intialize gitflow with:
$ git flow init

Follow prompts using these settings:
* Branch name for production releases: [master]
* Branch name for "next release" development: [develop]
* Feature branches? [feature/] feature-
* Release branches? [release/] release-
* Hotfix branches? [hotfix/] hotfix-
* Support branches? [support/] support-
* Version tag prefix? [] v

**Note:** git flow init only has to be done once for a new repo. The settings are stored in .git/config

## Release Process ##

Run the command with release number begin Major.Minor.Patch
$ git flow release start {release number}
* A release branch with the specified release number will be created off of develop branch
$ git flow release finish {release number}
* Release branch will be merged into master branch
  * Save and exit Vim with provided Merge commit message
* Tag will be created with release number
  * Input a tag message summarizing release updates in Vim
  * Save and Exit Vim
Push changes to GitHub
* git push origin master
* git push origin develop
* git push origin v{release number}
