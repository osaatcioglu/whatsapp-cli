
# whatsapp-cli

A simple CLI for WhatsApp to send a message right from the terminal. It is using Chrome's Puppeteer. So, it doesn't use any official/non-official APIs from WhatsApp, just a very basic automation script that runs in the background. 

# Why

You can use it to automate some regular messages to the loved ones, friends or colleagues. 

Such as, save this in a batch file and let your SO know that you are coming home late with a simple command execution. 

<pre><code>
whatsapp-cli "Handsome Prince" "Love! The FE guys blew it again! I need to work late. Save me some dinner! xoxo"
</code></pre>

Personally, it was fun to try something new. :)

# Installation

<pre><code>
npm install whatsapp-cli -g
</code></pre>

# Known Issues

* Sometimes the message is not sent due to delays in loading or typing the message. I added some timeouts to mitigate this.
* First time login page might appear in the background or the page that sends the automated message might appear in the foreground. I couldn't find a way to control it. Also, WhatsApp App doesn't support headless mode. So, I couldn't just have a CLI as I was hoping for it. 
* Puppeteer downloads a custom version Chromium as part of its package. Puppeteer has a way to configure the location of the Chrome. But, I found this a bit more convenient with the cost of some 70mb.

# Developers 

<pre><code>
npm src/index.js "Contact" "Message"
</code></pre>

It is quite basic CLI for sure. Any ideas that don't violate WhatsApp's ToS are welcome!

# License

MIT