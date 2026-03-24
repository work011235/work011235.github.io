---
title: "Digital Homelab Renovation - Demo Day"
description: "Text files, Local AI, Sandbox"
date: 2026-03-24
tags: ["Obsidian", "Sandbox", "AI", "LLM"]
---

# Digital Homelab Renovation

While I love learning about tech, the reality was more "fail slow" than "fail fast".  Having spent hours finding, reading, and following step-by-step instructions, the situation mirrored trying to fix my bike - there are specialists available, but the hands on, quick iterations required due to a lack of step-by-step understanding were a barrier for both parties.  I needed greater context, and the specialist had more students than time to delve at length into my needs.  

With the implementation of LLM's, I can ask specific questions using natural language about code implementation, requesting step-by-step instruction, and the guide is generated before my eyes.  

## Test and Verify

... But it hallucinates, or provides 80% of the solution, requiring back and forth either with it or with another model.  Given this, there is no better playground than data you understand and can provide to the model for testing.  

## But should I really post to MyPage?  

... As dated as the reference, anything that you post on anything which is not your computer is searchable by someone.  Sure, it might not be searchable by everyone, but someone, somewhere, has access to the underlying infrasture hosting your cat pictures.  As such, a few key principles will be governing this experiment:  

### Guidelines

#### Self-hosted
If it's on my machine, I know who has access to the data, me. 

#### General but specific prompting of online models
In a test case of 4 instances, the performance gap between locally hosted LLM's and publicly availble were laughable.  One felt like asking a greenhouse plant its thoughts on Plato, the other felt like grabbing coffee with the undergraduate professor.  Both awkward, but one had far greater back and forth fluency.  

## Framework
I am fortunate to have hardware which is not ideal but not without purpose.  The future state I will be working to (at present) hopes to look something like this:  
### Workstation Server
A former CAD workstation lives on as a homelab, with both cpu sockets and all ram slots filled.  Not necessarily performant, but does allow some proof of concept debugging and spinning up VM sandboxes.  
### Lenovo running Windows 11 
The T480 has the most dynanic CPU in the current fleet and will be the test bench for scripts prior to putting them into "production" on the workstation server. 
### Mobile MacBook Workstation
Coming in at over a decade old, the MacBook can still boot.  Future state, after migrating data, the goal will be to run Ubuntu, work with text files, and interact with the aforementioned homelab devices.   

## Demo - Starting from the studs
Having found a spare SSD, a fresh install of Ubuntu 24 was loaded onto the Workstation Server.  With the throwback to MySpace, data will be selectively fed into dev environments to control what information it has available as we run tests on various scnearios.  

## Subcontracted Disciplines
Due to the desire to run LLM's locally, Ollama is the current implementation.  Obsidian was already a favorite with its ability to use Markdown files.  Research will be codified in Markdown files thanks to various browser extensions as the knowledgebase grows and the homelab becomes more and more robust.  
