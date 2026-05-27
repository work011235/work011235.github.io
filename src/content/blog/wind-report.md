---
title: "Wind Report"
date: 2026-05-27
description: "Current version of daily wind report, outlining versions attempted to arrive at current state."
tags: ["daily report", "html"]
---

# Daily Wind Report

The goal was to generate a daily report to be sent after 6 PM yielding the hourly wind direction forecast from 7 PM local time - 7 AM local time sent to Kindle.  HTML encoding allows formatting along with being natively supported by Kindle.  

## Prior attempts

### Problem to be solved

Each evening I review the wind direction for the night to determine if the windows can be left open overnight.  Wind from a particular direction has been known to wake me from a deep sleep.  

### Iterative Refinement

#### Standalone APK
The initial thought was to create an app to display the wind direction.  As side loading is prohibited by my employer's admin policy, the APK was abandoned.  

#### Docker + ntfy
Second attmept was to leverage Docker and ntfy, providing a notification on my Android phone.  The ntfy app's server calls were more frequent than desired.  An attempt was made to time the app connection with the report generation, but was abandoned. 

#### epub SendToKindle
Third attempt was to leverage daily rss aggregation to epub using SendToKindle and fork methodology for the wind report.  Pagination broke the aesthetic.  

## Current version
At present, an HTML with CSS is geneated as an e-mail attachment and sent to Kindle.  This allows the creation of a one page, black and white wind report reviewable on an e-paper display.  

## Future possibilities
While there is still a desire to have a standalone app, pivoting relevant data to be a linux desktop overlay and a CLI "Message of the Day" upon login are top of mind. 