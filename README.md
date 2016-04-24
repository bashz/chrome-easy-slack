# Easy Slack
Easy Slack is a google chrome extension, offering an easy usage of slack while 
browsing, the main purpose is to have a fast access to respond messages on slack
without losing focus on your browser.

# Status
__State__ : Early POC

__Version__ : 0.0.1

__Google Chrome apps link__ : none

__Details__ : The extension is still at early developement stage, many features
are ignored for now, prioritising the functional aspect. The main goal is to
allow easy responding message, more usefull features will be added when the main
goal is fully achieved.

## Deploying
#### From Google Chrome apps
To be added
#### From source
Download the [source](https://github.com/bashz/chrome-easy-slack/archive/master.zip)

On google chrom Install [Chrome Apps & Extensions Developer Tool](https://chrome.google.com/webstore/detail/chrome-apps-extensions-de/ohmmkhmmmpcnpikjeljgnaoabkaalbgc)

Access the [extension's menu](chrome://extensions/) choose pakaged extesion and browser to the downloaded source.

You might see a monochromatic slack incon on your browser menu (actions).
## Configuration
For now the extion uses slack token, later to be changed to oAtuh stategies.

So you would like to set your token to use the extension, proceed by accessing
the options of the extension [extension's menu](chrome://extensions/) and input
your token.

Restart your browser so the config can take effect.

## Developement & Contribution
Clone the repository from github:

```
git clone https://github.com/bashz/chrome-easy-slack.git
```

see [Deploying](#Deploying) and [Configuration](#Configuration) to start and test.

It is best to respect some architectural convientions as below:
/js is entended for content scripts.
/option is entended for users settings of the extension.

Feel free to fork & develop your own addition to the extension, and please consider
requesting pulls from me.

The extension is at a very early stage now, so please take a look at the [issues](https://github.com/bashz/chrome-easy-slack/issues)
you might find listed issues sharing same interest with your developement, contrbutions
are much apreciated.