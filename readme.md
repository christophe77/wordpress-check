# WORDPRESS-CHECK - NODEJS

Package that checks common information disclosure on wordpress websites :

- WordPress version
- Active theme and theme version
- User enumeration
- Plugin enumeration
- Generator enumeration
- Directory indexing

## INSTALL

### Module

    yarn add wordpress-check
    // or
    npm install wordpress-check

### CLI

    npm install wordpress-check -g

## MODULE USAGE

    const wpCheck = require('wordpress-check');

    async function checkUrl(url) {
        const results = await wpCheck(url);
        console.log(results);
    }

    async function checkUrlAndSaveReport(url) {
        const results = await wpCheck(url, true);
        console.log(results);
        // file saved inside root path /reports
    }

    checkUrl("https://your-wordpress-website.com/");
    checkUrlAndSaveReport("https://your-wordpress-website.com/");

## CLI USAGE

    npx wpcheck https://your-wordpress-website.com/

## RESULTS

    {
        "version":[
            {"fromMeta":"5.2.15"},
            {"fromFeed":"5.2.15"}
        ],
        "users":[
            {"id":1,"name":"admin6969"},
            {"id":2,"name":"john"},
            {"id":3,"name":"ringo"},
            {"id":4,"name":"paul"}
        ],
        "themes":[
            {
                "name":"avada",
                "version":"5.5.2"
            }
        ],
        "plugins":[
            {
                "name":"plugin1",
                "version":"5.5.2"
            },
            {
                "name":"plugin2",
                "version":"5.5.2"
            }
        ],
        "generators": [
            "powered by layerslider 6.7.6",
            "powered by slider revolution 5.4.7.4"
        ],
        "directoryIndexing":[
            "wp-content/uploads/"
        ]
    }

### INFORMATIONS

I'm still working on this project, more features will come.
