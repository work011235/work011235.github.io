---
title: "Linux Basics"
description: "Reducing the barrier-to-entry for linux."
date: 2025-01-31
tags: ["Linux", "Ubuntu"]
---


# Linux Basics 

## Abstract 
The purpose of this document is to reduce the barrier-to-entry for using Linux. There are many resources available which do this. This document outlines the mile markers of my journey from crawling to walking with Linux. Hopefully this speeds your journey. 

## Basic Terms and Ideas 

### Linux 
Linux is an operating system like Windows, Mac iOS (“iOS”), or Android. Unlike Windows or Mac, Linux is free and open source. This means you can look “under the hood” at the source code to definitively know what’s going on. 

### Distro’s 
When you start learning about Linux, one of the confusing aspects will be “I tried to look for Linux and all these things keep talking about Distro’s”. Distro is short for “distribution”. Think of it as flavors or dialects of Linux. The distribution creator will take the core aspects of Linux and tailor the systems and applications they want to include. Think of your smartphone. When you buy a Samsung phone you get a lot of standard applications along with Samsung specific applications (Samsung Health, Samsung App Store, etc.). In a similar fashion, there are tons of flavors/distributions of Linux available to try. See distrowatch.com for current rankings.  

Full disclosure, if you’re new to Linux, I recommend Debian over Ubuntu, as so many other distributions are based off of it.  There are a plethora of YouTube videos out there if you want recommendations, though when Linus Torvald, one of the Linux Community’s founding fathers, runs Debian, I feel there may be wisdom to backing the distro.    

### Navigation 
When you are on a computer’s desktop, there are visual cues letting you know which operating system you are using. How do you launch applications on a Windows computer? What about a Mac? When thinking of Windows, you likely imagine navigating the mouse to the “Start Menu”. On a Mac, you likely imagine “the Dock” where application icons are housed. 
In the same way, gLinux Desktop has ways to launch applications. From the left corner of gLinux, there are 9 dots which can be clicked to view the applications currently available.
Since Linux is free and open source, they include software which is also free (non-proprietary) to accomplish goals similar to standard paid/proprietary software. Here are a few examples: 
- Internet → Firefox 
- Microsoft Word → LibreOffice Writer 
- Microsoft Excel → LibreOffice Calc 
- Microsoft PowerPoint → LibreOffice Impress 
- Notepad → gEdit 

## Getting Familiar with Navigation 
Linux is an operating system allowing you to use your computer just like iOS or Windows.  

### Command Line Interface (“CLI”) 
Now we need to address the “elephant in the room”. When people think of Linux, they may picture a person in a hood in a dark room hunched over a laptop with a wall of text scrolling on the screen. The command line interface allows you to navigate your computer with the keyboard instead of your mouse. You can switch folders, create documents, edit documents, check e-mail and more. What follows are some basic terms and navigation techniques to get you started. 
### Finding “the CLI” 
By default there is a shortcut pinned to the taskbar for the “Terminal”. You can click this icon or click the nine dots and search for “Terminal”. This will load a window showing a blinking cursor listing the following: 

`<your ldap>@<computer name>:<current directory>$`

Each time your CLI is ready for your to issue your next command, it will show the string outlined above. I will omit this from future examples to avoid confusion when typing your commands.

#### Copy-Paste to Terminal 
Eventually, you’ll start reading posts about various commands to try and you’ll think “I don’t want to type that out - surely I can copy-paste.” So you highlight, click “ctrl+c” and click into your terminal and type “ctrl+v” and nothing happens. 

To paste into the terminal, use “ctrl+shift+v”. 

In other applications, this same key sequence will allow you to “paste as plain text” without formatting (ie. pasting text into gSheet, gDoc, etc.). 

### pwd 
This is great, but I have no idea where I am. If you type “pwd” and hit enter, you will execute the “Print Working Directory” command to see your current file location within the operating system. Think of this like finding the file path to your personal directory on iOS or Windows. 

`/home/<ldap>`

### mkdir 
To create a new folder, use the “Make Directory” by typing `mkdir <name of new folder>` and hit enter. 

mkdir stuff 

### QUICK TIP - Using arrow keys in the CLI 
You just typed a command and realize you want to do basically the same thing again. By using the up arrow, you can scroll through previously executed commands. Try this by hitting the up arrow and changing the name in your “Make Directory” command. 

#### ls

I’ve issued the command to create a folder twice now. How do I know it’s occurred? Type `ls` to “List” the contents of the current directory.

#### cd` 

To enter a directory, use the “Change Directory” command by typing `cd <name of directory you would like to navigate to>`. 

#### cd stuff 

This command is not limited to your current directory. If you know the full file path, you can change from your current directory to any other directory on the system. 

`cd /home/user/stuff/`

### QUICK TIP - Using “Tab” 
Typing file paths or file names can get tedious. If the string you are typing is unique within the directory, you can press “Tab” to have the system auto-complete the text. Let’s say I’m in my ldap directory and want to enter the “stuff” directory. As there are no other directories that start with the letter “s”, I could type “cd s” and click “tab”. The computer will auto populate `cd stuff`. Click enter to execute, changing your current directory to “stuff”. If there are multiple options which begin with similar characters, you will need to type enough so that there is only one matching option. 
Example - My "home directory” contains the following directories: 

- Desktop 
- Documents 
- Downloads
- Music 
- Pictures 
- Public 
- Templates 
- Videos 

To use autocomplete to open the Downloads folder, I would need to type “cd Dow” before the computer knew how to auto-complete. Please note this is case sensitive. 

#### .. 
I’m in a directory but now I want to go to the parent directory (the folder housing my current location). Type “pwd” to “Print Working Directory” as a reference point. Type two periods (“..”) and click “Enter”. Type “pwd” to see your current file path and note the change. 
`pwd` 
`/home/<ldap>/<your directory>`
`..`
`pwd`
`/home/<ldap>/`

### Disclaimer - CLI Text Editors 

I need to “show my hand” here and point out that I am more comfortable with one text editor because I learned it first. I recommend using Nano so that you’re part of the “cool kid” club that uses it, instead of “Vim” users like me. 
My biggest barrier to entry with Nano is that I didn’t realize that the “^” symbol indicates “Ctrl”. https://staffwww.fullcoll.edu/sedwards/nano/introtonano.html was helpfully informative. 

### Nano - text editor for cool cats 
Create a document using Nano by typing `nano <title>.txt`. 
`nano TEST.txt`

#### Add text to your document 
Example:
To save the document, click “Ctrl+O” to “Write Out” the file.
Click “Enter” to confirm (“File Name to Write: Test.txt”)
To exit the document, click “Ctrl+X” 

### Vim - text editors for the rest of us 
Vim was the first CLI text editor I was introduced to, so it remains my default. To complete the same steps as listed above: 
`vi Test.txt`
Type “i” to “INSERT” text and begin modifying your document

When you’re done, hit “Escape” followed by `:wq` and “Enter” to “write” and “quit” the current file, saving your edits.  If you were in the middle of many edits and needed to quickly save your progress, you would click “Escape” followed by `:w` to “save” the file, then click “i” again to resume editing. 

### cat 
Use the “Concatenate” command to display the contents of your file. 
`cat TEST.txt`
`This is a test. `

### mv to rename a file 
You have successfully created a file. What if you want to rename it? This can be done using the “Move” command. Type `mv <Original file> <New file name>”.`
`mv TEXT.txt whale.txt `

### mv to move a file 
I created my TEST.txt file in my “stuff” directory. What if I want to move it to the parent directory? I can do this using the full file path and the “Move” command. 
`mv TEST.txt /home/<ldap>/ `
### rm 
To delete the file, use the “Remove” command. 
`rm TEST.txt`

### clear 
Terminal getting cluttered? Use the `clear` command to freshen up your window. The arrow up key will still allow you to cycle through previous commands. 

### exit 
Done with the terminal? Issue the `exit` command to close the window. 

## Beyond text editing 

### sudo 
To execute commands and change system settings we need to use the elevated privileges of a system administrator. In Linux, this can be invoked by starting your command with the truncation of “Superuser Do”, `sudo`.

### sudo apt-get update 
Update your repositories. 

### sudo apt-get upgrade 
Upgrade installed programs. 

### ctrl+c 
Sometimes commands get stuck for one reason or another and you’re sitting looking at a cursor wondering if anything is happening. To cancel the command, click “ctrl+c”. 

### ip address 
Lists current connection information such as ethernet connections and WIFI. 

## Let’s have some fun 
Special thanks to TecMint’s “24 Funniest Commands to Try in the Linux Terminal” for the following commands. Let’s “see the Matrix”. 

`sudo apt install cmatrix`

`cmatrix`

Click “ctrl+c” when you’re finished. 

Congratulations on choosing the blue pill and exiting Wonderland.
