# WORDPRESS-CHECK - NODEJS

Package that checks common information disclosure on wordpress websites :

- WordPress version
- Active theme and theme version
- User enumeration
- Directory indexing

## INSTALL

    yarn add wordpress-check
    // or
    npm install wordpress-check

## USAGE

    const wpCheck = require('wordpress-check');

    async function checkUrl(url) {
        const results = await wpCheck(url);
        console.log(results);
    }

    checkUrl("https://your-wordpress-website.com/");

### RESULTS

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
        "theme":{
            "name":"avada",
            "version":"5.5.2"
        },
        "directoryIndexing":[
            "wp-content/uploads/"
        ]
    }

### INFORMATIONS

I'm still working on this project, more features will come.
