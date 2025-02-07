---
title: "Tailscale"
description: "An easy, self-hosted VPN"
date: 2025-02-07
tags: ["production","VPN", "self-hosted"]
---

# [Tailscale](https://tailscale.com/)

True to their word, "Tailscale makes secure networking easy".  Much of the work on my home lab incorporates virtualization.  Tailscale makes networking easy, making my home lab available when I'm on the go, even though T-Mobile Home Internet gateways do not allow users to change the Network Address Translation (NAT) type.  With Tailscale, this is no longer a barrier.  

Tailscale's MagicDNS provides an easy, elegant solution to LAN hosted development (though in this case, VLAN).  Virtual machines can be spun up behind a NAT wall and connected via VPN.  THe home lab itself is blocked by the NAT wall of the T-Mobile home internet router.  Tailscale allows me to tunnel into my home lab wihout needing to develop reverse proxies or setting up a domain name.  