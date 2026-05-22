---
title: "Daily Digest - RSS SendToKindle"
date: 2026-05-18
description: "Daily Digest SendToKindle template.  "
tags: ["SendToKindle", "RSS"]
## featured: true
---

An impactful use cases of Large Language Models has been closing the gap between ideas which I have been shared by content creators and the functional implementation.  Having heard multiple verisons of "Click the link in the video description for the sample code" and failing to find the correct link, LLM's provide a way to bridge that gap.  

One example was implemented during a trip earlier this year which I continue refining.  Key goals and methods include:  
 - Google App Scripts (https://script.google.com/home)
 - SendToKindle
 - Local Weather
 - MarkDown
 - ePub
 - eInk

Leverage API Script Tasks to schedule for delivery at an optimal time of day.

```
/**
 * CONFIGURATION: Update these values
 */
const CONFIG = {
  RECIPIENT_EMAIL: "<UPDATE-WITH-YOUR-SEND-TO-KINDLE-EMAIL>@kindle.com",
  TIMEZONE: "GMT-6", // CST
  CALENDAR_IDS: [
    "primary", 
    "[ADDITIONAL-CALENDAR-ID-HERE]",// "your_secondary_id@group.calendar.google.com",
  ]
};

function runDailySystemDigest() {
  const today = new Date();
  const dateStr = Utilities.formatDate(today, CONFIG.TIMEZONE, "yyyy-MM-dd");

  // 1. FETCH CALENDAR DATA
  let allEvents = [];
  CONFIG.CALENDAR_IDS.forEach(id => {
    try {
      const cal = CalendarApp.getCalendarById(id);
      if (cal) {
        const events = cal.getEventsForDay(today);
        events.forEach(e => {
          allEvents.push({
            time: Utilities.formatDate(e.getStartTime(), CONFIG.TIMEZONE, "hh:mm a"),
            title: `[${cal.getName().toUpperCase().slice(0, 8)}] ${e.getTitle()}`,
            timestamp: e.getStartTime().getTime()
          });
        });
      }
    } catch (err) {
      console.warn(`Access Denied for Calendar: ${id}`);
    }
  });

  // Sort events chronologically
  allEvents.sort((a, b) => a.timestamp - b.timestamp);

  // 2. FETCH TASKS DATA (Requires Tasks API Service)
  let taskEntries = [];
  try {
    const taskLists = Tasks.Tasklists.list().items;
    if (taskLists) {
      taskLists.forEach(list => {
        const tasks = Tasks.Tasks.list(list.id, { showCompleted: false }).items;
        if (tasks) {
          tasks.forEach(t => {
            const due = t.due ? t.due.split('T')[0] : "---";
            taskEntries.push(`[ ] ${t.title.padEnd(30)} DUE: ${due}`);
          });
        }
      });
    }
  } catch (err) {
    taskEntries.push("ERROR: Tasks API not enabled in Services.");
  }

  // 3. GENERATE GREYSCALE TERMINAL HTML
  const eventRows = allEvents.length > 0 
    ? allEvents.map(e => `> ${e.time.padEnd(10)} | ${e.title}`).join('\n')
    : "STATUS_EMPTY: No events scheduled.";

  const taskRows = taskEntries.length > 0 
    ? taskEntries.join('\n')
    : "STATUS_CLEAN: No pending tasks.";

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { background-color: #e0e0e0; color: #222; font-family: 'Courier New', monospace; padding: 20px; }
      .shell { background-color: #ffffff; border: 1px solid #888; padding: 25px; box-shadow: 4px 4px 0px #bcbcbc; }
      .meta { color: #777; font-size: 11px; margin-bottom: 10px; border-bottom: 1px solid #eee; }
      .cmd { font-weight: bold; margin-bottom: 20px; color: #000; }
      .cmd:before { content: "$ "; color: #666; }
      .label { font-weight: bold; background: #333; color: #fff; padding: 2px 6px; display: inline-block; margin-top: 15px; }
      pre { background: #f8f8f8; padding: 12px; border-left: 3px solid #666; white-space: pre-wrap; font-size: 13px; }
      .exit { margin-top: 30px; font-size: 10px; color: #999; border-top: 1px dashed #ccc; padding-top: 10px; }
    </style>
  </head>
  <body>
    <div class="shell">
      <div class="meta">SESSION_ID: ${Math.random().toString(36).substring(7).toUpperCase()} | ${dateStr}</div>
      <div class="cmd">./stdout_agenda_report --all-calendars --tasks</div>
      
      <div class="label">INCOMPLETE_TASKS</div>
      <pre>${taskRows}</pre>
      
      <div class="label">CALENDAR_AGENDA</div>
      <pre>${eventRows}</pre>
      
      <div class="exit">
        [ PROCESS COMPLETED SUCCESSFULLY ]<br>
        [ ATTACHMENT_GENERATED: true ]
      </div>
    </div>
  </body>
  </html>`;

  // 4. CREATE ATTACHMENT AND SEND
  const reportBlob = Utilities.newBlob(htmlContent, 'text/html', `Report_${dateStr}.html`);
  
  GmailApp.sendEmail(CONFIG.RECIPIENT_EMAIL, `STDOUT: Daily_Report_${dateStr}`, "Morning system digest attached.", {
    htmlBody: "<h3>System Status: Online</h3><p>Please review the attached terminal report for today's agenda.</p>",
    attachments: [reportBlob]
  });
  
  console.log("Digest successfully dispatched to " + CONFIG.RECIPIENT_EMAIL);
}
```
---

// *If this resonated, the [RSS feed](/feed.xml) is the lowest-friction way to follow along.*