---
title: "GitHub Secrets and Google App Passwords"
date: 2026-05-29
description: "Note-to-future-self on how to facilitate this workflow."
tags: ["Github", "Secrets", "Google"]
---

# GitHub Secrets and Google App Passwords

## Abstract
Best practice leverages secrets rather than hard coding sensitive identifiable data.  I forsee repeating these steps until they become muscle memory, but want a place to codify the methodolgy for future reference. 

## Google App Passwords
 - Log into your Google Account
 - Click your avatar in the upper right corner
 - Select "Manage Google Account"
 - Select "Security & sign-in" from the left sidebar
 - Under "How you sign in to Google", click "2-Step Verification"
 - You will be prompted to log into your account again
 - Scroll down the bottom block "App Passwords" and click the ">" 
 - Create an "App Name" which will contain your secret key value pairs

## GitHub Secrets
 - Log into GitHub
 - Select the repository you are working on
 - Click the "Settings" tab
 - Navigate to the left hand column
 - Under "General", then under "Security and quality", select "Secrets and Variables"
 - From the dropdown, select "Actions"
 - Click the "New Repository Secret" button and enter the key value pairs generated above

