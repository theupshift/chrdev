---
title: Privacy and Coherence
date: 2020-05-12
layout: post.njk
tags:
  - draft
  # - post
---

> **privacy matters, and coherence costs**

I tried to do a **self-examination**, and **reflect about what matters** to me when **browsing the web**.

My main **motivation** to be more privacy-aware was to be **more coherent** with my *personal way of thinking* regarding ethical use of my *personal data shared with a third-party*.

Meaning that **I'm against hidden / unclear ways of exploiting one's personal data** to gain profit by selling it to other companies.

Be it for **targeted advertising**, **online purchases and interests**, even **psychological manipulation** when it comes to public voting etc.

> Stop paying for X with your privacy.

<h3 class="no-anchor">To me, privacy is about consciousness, possibility and choice</h3>

**No conspiracy theories here. Just my thoughts.**

### Trade-offs

Trade-offs are also part of the deal.

E.g. I still use Twitter albeit the points below. Gmail for my historic personal email address from which I'm slowly migrating away.

Use it mainly to connect with a certain group of people (e.g. tech enthusiasts, programmers and such) and to share and discuss technical topics, tools and ideas.

### Tools and mindset

**It's not only about the tools**.

To be more privacy-aware on the internet **I needed change some of my habits**.

Browsing sessions in incognito mode to avoid cookies leakage.

Reduce the number of extensions on the browser.

Logging out of important and sensitive web services.

The list goes on.

---

Below you can find some topics I feel sensitive about, and for which I found some more privacy-aware and ethical alternatives.

**I'm not an expert. These are just my opinions. If you don't agree, that's fine.**

---

*A small premise: nobody is perfect. I may contradict myself even without noticing.*

I **try** to be *as coherent as possible*.

For feedback, addionational alternatives, or simply a discussion: please let me know [@christian_fei](https://twitter.com/christian_fei) or contact me via [hey@cri.dev](mailto:hey@cri.dev)

## Table of contents

- [email](#email)
- [search-engines](#search-engines)
- [web-browsers](#web-browsers)
- [phone](#phone)
- [socials](#socials)
- [messaging](#messaging)
- [website-analytics](#website-analytics)
- [vpn](#vpn)
- [discussion-kb](#discussion--kb)
- [video](#video)
- [video-conferencing](#video-conferencing)
- [news](#news)

---

# Email

Gmail is probably the most widely used email service.

Move away from that.

Go with [ProtonMail](https://proton.go2cloud.org/aff_c?offer_id=15&aff_id=1721&source=blog) or [Fastmail](https://www.fastmail.com/)

I like ProtonMail because it allows you to manage your encryption keys, has a pretty simple UI, no fuzz and allows to send and receive secure and encrypted emails.

You can export the default ones, import your own encryption keys etc. All communication is secured with end-to-end encryption. No IP-logs are retained.

Their code is available on [GitHub](https://github.com/ProtonMail).

Ran a small poll on Twitter and these are [the results](https://twitter.com/christian_fei/status/1260108707616165888):

![poll-twitter-gmail.png](/assets/images/posts/poll-twitter-gmail.png)

# Search engines

Try [DuckDuckGo](https://duckduckgo.com/) next time, set it as your default search engine in your [Browser](#Webbrowsers).

I have to admit, google search has pretty accurate results, sometimes it's even scary.

But over time DuckDuckGo has improved a lot, and I'm using it daily with excellent results.

DuckDuckGo has an ethical privacy policy, of not collecting or sharing any of your personal information, no storing of your search history

# Web browsers

Use Firefox or Brave.

I personally use [Brave](https://brave.com/chr311), it comes with

- "Privacy shields" to disable known trackers, scripts, cross-site cookies and trackers
- integrated HTTPS-everywhere
- built-in adblocker (see `brave://adblock/`)
- Tor functionality (if you feel so inclined)
- an integrated wallet (see `brave://wallet/`)
- Tip, earn and contribute to websites using [Brave Rewards](https://brave.com/chr311) using the Basic Attention Token

Recently I discovered [privacybadger.org](https://privacybadger.org/) by the [EFF](https://www.eff.org/) as a browser extension.

> Privacy Badger automatically learns to block invisible trackers. ([source](https://privacybadger.org/#How-is-Privacy-Badger-different-from-Disconnect%2c-Adblock-Plus%2c-Ghostery%2c-and-other-blocking-extensions))

To have a decent **DNS level blocking** of such known sites, I use a [Raspberry Pi with pi-hole](/posts/2020-05-03-Ad-blocking-with-Raspberry-Pi-and-Pi-hole/).

# Phone

Use a Nokia 3310.

Kidding (actually, not so much).

Your phone usage and habits are probably the most difficult to change.

Your phone might be the greatest pain point of your privacy, since it can be seen as an "extension" of yourself. You probably have it with you most of the time too.

If you feel so inclined, you could try a [Librem 5](https://puri.sm/products/librem-5/) or a [PinePhone](https://www.pine64.org/pinephone/).

*These phones are even shipping in late May 2020!*

Do you remember the FirefoxOS Phone? I remember as I got one for free when Firefox was beta-testing it, and it felt really weird at the time.

With these novel approaches and businesses around privacy oriented phones, I think we are headed in the right direction, since I feel that manufacturers and the community behind are growing year after year.



# Socials

Ditch FB, forever. "Delete" your account once and for all, stay in touch with your loved ones in other ways.

Mastodon could be an alternative, not necessarily for your relatives but for personal use and to connect with the community on a certain instance.

There are various ones I signed up for like unfiltered news sources and thematic instances of interest.

## Social buttons

Also here, don't use them.

Just link with an anchor tag to your profile, if you have a follow button or these sort of things on your webpage.

Twitter has the [Web Intents](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent) that can be used without JavaScript and external resources and cruft.

# Messaging

No Whatsapp. No Facebook Messenger.

[Try signal](https://www.signal.org/).

Telegram could also be fine.

As always, this is a hairy and conflicting matter. Also Whatsapp was "fine" some time ago, in the sense that there wasn't FB behind, there weren't various leaks of information regarding plain-text password etc.

So it's a difficult matter, right now I'm using Signal and Telegram. Let's see what the future holds.

# Website analytics

Are you using Google Analytics on your websites?

If you can, don't.

Use [plausible analytics](https://plausible.io/): [self-host it](/posts/2020-04-24-Resuming-Elixir-by-self-hosting-plausible-analytics/) or *pay for it*.

Personally like it because it's a simple, unobtrusive & open-source website analytics tool. It doesn’t use cookies and is fully compliant with GDPR, CCPA and PECR.

Another interesting analytics service is [fathom analytics](https://usefathom.com/).

# VPN

Don't use a free VPN. A few links to bring the point home:

- [Don't use VPN services](https://gist.github.com/joepie91/5a9909939e6ce7d09e29)
- [Police Seize Two Perfect Privacy VPN Servers](https://torrentfreak.com/police-seize-two-perfect-privacy-vpn-servers-160902/)

Definitely use [ProtonVPN](https://proton.go2cloud.org/aff_c?offer_id=10&aff_id=1721&source=blog).

No user logs or data shared with third parties.

Alternatively, [self-host a VPN with Algo](https://github.com/trailofbits/algo).

# Discussion & KB

Atlassian Suite & Jira, no thanks, if possible.

**What else is out there?** Let me know [@christian_fei](https://twitter.com/christian_fei).

Use [discourse](https://www.discourse.org/).

# Video

If you can, avoid YouTube.

Use decentralized alternatives like [d.tube](https://d.tube/) and [lbry.tv](https://lbry.tv/).

They are getting more and more traction over time, maybe one day you can completely watch all your information needs and cat-videos on a platform different than YouTube.

# Video conferencing

No Google Meet, no Classroom, screw Zoom.

Use [jitsi](https://jitsi.org/), self-hosted if you feel so inclined.

# News

Ditch newspapers that you're aware of, that write biased stories and don't report on certain topics because of profit and interests.

That's up to you understanding it; not mentioning any.

Use indipendent and unbiased, local and global news sources that you know of. If possible try to support them with a donation.

---

# Final words

That's all from my side.

I try to be aware what I do and share with third-parties as much as possible, although it seems to be getting more difficult every day.

Let me know your opinion and feedback [@christian_fei](https://twitter.com/christian_fei).

### Update

For a more exhaustive list of tools I found the [/r/degoogle subreddit](https://www.reddit.com/r/degoogle/comments/g1yu01/google_alternatives_huge_list_restore_your_privacy/) and [restoreprivacy.com](https://restoreprivacy.com/google-alternatives/).
There you can find even more tools to help you to get your privacy back.