---
title: Privacy and Coherence
date: 2020-05-12
layout: post.njk
tags:
  - post
  - featured
  - privacy
  - foss
image: https://images.unsplash.com/photo-1580847097346-72d80f164702?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80
thanks:
  - name: Andrea
  - name: Ivan
    link: https://twitter.com/IvPashenko
  - name: Ivo
    link: https://ivoputzer.blog
  - name: Joe
    link: https://twitter.com/joebew42
  - name: Matteo
    link: https://twitter.com/matteo_pierro
  - name: NaN
    link: https://twitter.com/0xNaN
---

> **privacy matters, and coherence costs**

### Motivation

I tried to do a **self-examination**, **reflecting on what matters** to me about Privacy.

Being more aware of what you share while browsing the web comes with experience and can be seen as a journey.

*No tools* will help if you don't change your **approach and habits**.

My main **motivation** to be more privacy-aware was to be **more coherent** with my way of thinking regarding to ethical use of personal data shared with a third-party.

Meaning that I'm against hidden / unclear ways of exploiting one's personal data selling it to other companies, make a profit with it, analyzing/mining it in obscure ways etc.

Be it for **targeted advertising**, **online purchases and interests**, even **psychological manipulation** when it comes to public voting etc.

<h3 class="no-anchor">To me, privacy is about consciousness, possibility and choice</h3>

> Stop paying for X with your privacy.

**No conspiracy theories here. Just my thoughts.**

### Trade-offs

Trade-offs are also part of the deal.

E.g. I still use Twitter albeit the points below. Gmail for my historic personal email address from which I'm slowly migrating away.

Twitter mainly to connect with a certain group of people (tech enthusiasts, programmers, marketing and such).

Also to share and discuss ideas & thoughts, technical topics etc.

### Tools and mindset

**It's not only about the tools**.

To be more privacy-aware on the internet **I needed change some of my habits**.

Some temporary browsing sessions in incognito mode without shared cookies.

Reduced the number of extensions on my main browser.

Logging out of important and sensitive web services.

The list goes on.

---

Below you can find some topics I feel sensitive about, and for which I found some more privacy-aware and ethical alternatives.

**I'm not an expert. These are just my opinions. If you don't agree, that's fine.**

More research on Privacy can be found at [eff.org](https://www.eff.org/).

---

*A small premise: nobody is perfect. I may contradict myself even without noticing.*

I **try** to be *as coherent as possible*.

For feedback, additional alternatives, or simply a discussion: please let me know [@christian_fei](https://twitter.com/christian_fei) or contact me via [hey@cri.dev](mailto:hey@cri.dev)

## Table of contents

- [Email](#email)
- [Search engines](#search-engines)
- [Web browsers](#web-browsers)
- [Phone](#phone)
- [Operating system](#operating-system)
- [Socials](#socials)
- [Messaging](#messaging)
- [Website analytics](#website-analytics)
- [VPN](#vpn)
- [Discussion & KB](#discussion--kb)
- [Video](#video)
- [Video conferencing](#video-conferencing)
- [Maps](#maps)
- [Useful links](#useful-links)
- [Final words](#final-words)

<form
  action="https://buttondown.email/api/emails/embed-subscribe/christianfei"
  method="post"
  target="popupwindow"
  onsubmit="window.open('https://buttondown.email/christianfei', 'popupwindow')"
  class="embeddable-buttondown-form">
  <h3 style="margin-top: 0.3em;"><a href="/subscribe/">Subscribe to my newsletter</a></h3>
  <p>
    <b>Bi-weekly email</b> to stay up to date with #elixir #nodejs #agile #testing #refactoring #cleancode
  </p>
  <input type="email" name="email" id="bd-email" placeholder="your@email.com">
  <input type="hidden" value="1" name="embed"></input>
  <button type="submit">Subscribe</Button>
</form>

# Email

Gmail is probably the most widely used email service.

Move away from that.

Go with [ProtonMail](https://proton.go2cloud.org/aff_c?offer_id=15&aff_id=1721&source=blog) or [Fastmail](https://www.fastmail.com/)

I like ProtonMail because it allows you to manage your encryption keys, has a pretty simple UI, no fuzz and allows to send and receive secure and encrypted emails.

You can export the default ones, import your own encryption keys etc. All communication is secured with end-to-end encryption. No IP-logs are retained.

Their code is available on [GitHub](https://github.com/ProtonMail).

Ran a small poll on Twitter and these are [the results](https://twitter.com/christian_fei/status/1260108707616165888):

![poll-twitter-gmail.png](/assets/images/posts/poll-twitter-gmail.png)

### Temporary email

Need a temporary, disposable email?

I use [temp-mail.org](https://temp-mail.org/en/) from time to time. For SMS [temp-sms.org](https://temp-sms.org/).

# Search engines

Try [DuckDuckGo](https://duckduckgo.com/) next time, set it as your default search engine in your [Browser](#web-browsers).

I have to admit, google search has pretty accurate results, sometimes it's even scary.

But over time DuckDuckGo has improved a lot, and I'm using it daily with excellent results.

DuckDuckGo has an ethical privacy policy, of not collecting or sharing any of your personal information, no storing of your search history

# Web browsers

Use Firefox or Brave.

I personally use Firefox and [Brave](https://brave.com/chr311), it comes with

- "Privacy shields" to disable known trackers, scripts, cross-site cookies and trackers
- integrated HTTPS-everywhere
- built-in adblocker (see `brave://adblock/`)
- Tor functionality (if you feel so inclined)
- an integrated wallet (see `brave://wallet/`)
- Tip, earn and contribute to websites using [Brave Rewards](https://brave.com/chr311) using the Basic Attention Token

Recently I discovered [privacybadger.org](https://privacybadger.org/) by the [EFF](https://www.eff.org/) as a browser extension.

> Privacy Badger automatically learns to block invisible trackers. ([source](https://privacybadger.org/#How-is-Privacy-Badger-different-from-Disconnect%2c-Adblock-Plus%2c-Ghostery%2c-and-other-blocking-extensions))

To have a decent **DNS level blocking** of such known sites, I use a [Raspberry Pi with pi-hole](/posts/2020-05-03-Ad-blocking-with-Raspberry-Pi-and-Pi-hole/).

You can check how well your browser and add-ons protect you against online tracking techniques on [panopticlick.eff.org/](https://panopticlick.eff.org/).

# Phone

Use a Nokia 3310.

Kidding (actually, not so much).

Your phone usage and habits are probably the most difficult to change.

It might be the [greatest pain point](https://ssd.eff.org/en/module/problem-mobile-phones) of your privacy since it can be seen as an "extension" of yourself.
You probably have it with you most of the time too.

If you feel so inclined, you could try a [Librem 5](https://puri.sm/products/librem-5/) or a [PinePhone](https://www.pine64.org/pinephone/).

*These phones are even shipping in late May 2020!*

Do you remember the FirefoxOS Phone? I remember as I got one for free when Firefox was beta-testing it, and it felt really weird at the time.

With these novel approaches and businesses around privacy-oriented phones I think we are headed in the right direction.

I feel that manufacturers and the community behind are growing year after year.

# Operating system

Use Linux or a Unix-like system.

I think this is very personal and needs research on your part with what you feel comfortable.

Heard some not-so-nice things [about Ubuntu](https://www.reddit.com/r/privacy/comments/3z8fwz/ubuntu_bad_for_privacy/) too.

Personal recommendations:

- [tails.boum.org](https://tails.boum.org/) for one-off sessions from a USB stick
- bare [debian](https://www.debian.org/)

# Socials

Ditch FB, forever. "Delete" your account once and for all, stay in touch with your loved ones in other ways.

Mastodon could be an alternative, not necessarily for your relatives but for personal use and to connect with the community on a certain instance.

There are various ones I signed up for like unfiltered news sources and thematic instances of interest.

## Social buttons

Also here, don't use them.

Just link with an anchor tag to your profile, if you have a follow button or these sort of things on your webpage.

Twitter has the [Web Intents](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent) that can be used without JavaScript and external resources and cruft.

# Messaging

Try to avoid [Whatsapp](https://ssd.eff.org/en/module/how-use-whatsapp-ios) and Facebook Messenger if you can.

[Try signal](https://www.signal.org/).

Telegram could also be fine, if you enable secret chats, those are end-to-end encrypted. A [dear user on Reddit](https://www.reddit.com/r/privacytoolsIO/comments/gmwq6k/privacy_and_coherence/fr7yf47/) made some valid points regarding this.

So it's a difficult matter, right now I'm using Signal and Telegram. Let's see what the future holds.

A recent poll on Twitter, here [the results](https://twitter.com/christian_fei/status/1261585811335716864):

![poll-twitter-messaging.png](/assets/images/posts/poll-twitter-messaging.png)


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

# Maps

Use [openstreetmap.org](https://openstreetmap.org).

<form
  action="https://buttondown.email/api/emails/embed-subscribe/christianfei"
  method="post"
  target="popupwindow"
  onsubmit="window.open('https://buttondown.email/christianfei', 'popupwindow')"
  class="embeddable-buttondown-form">
  <h3 style="margin-top: 0.3em;"><a href="/subscribe/">Subscribe to my newsletter</a></h3>
  <p>
    <b>Bi-weekly email</b> to stay up to date with #elixir #nodejs #agile #testing #refactoring #cleancode
  </p>
  <input type="email" name="email" id="bd-email" placeholder="your@email.com">
  <input type="hidden" value="1" name="embed"></input>
  <button type="submit">Subscribe</Button>
</form>

# Useful links

[privacy.com](https://privacy.com/) is "a payments product that keeps your personal information private".
Probably going to look into it in the future.

[eff.org](https://www.eff.org/) is an extremely useful resource for learning more about privacy and much more.


A more exhaustive list of tools can be found at the [/r/degoogle subreddit](https://www.reddit.com/r/degoogle/comments/g1yu01/google_alternatives_huge_list_restore_your_privacy/), [restoreprivacy.com](https://restoreprivacy.com/google-alternatives/) and [privacytools.io](https://www.privacytools.io/).

# Final words

That's all from my side.

I try to be aware what I do and share with third-parties as much as possible, although it seems to be getting more difficult every day.

Let me know your opinion and feedback [@christian_fei](https://twitter.com/christian_fei).
