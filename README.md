node-red-contrib-rss
====================

A <a href="http://nodered.org" target="_new">Node-RED</a> node to convert items to a RSS feed

Install
-------

Run the following command in your Node-RED user directory - typically `~/.node-red`

        npm i node-red-contrib-rss

Usage
-----

Uses the [*rss*][1] npm module to construct the RSS feed. You can use any options accepted by the *rss* module.

Expects the incoming `msg.payload` to be an array of objects.

The rules for Feed Options and Item Options determine where the node grabs data from to fill in the options passed to the *rss* module.

  [1]: https://www.npmjs.com/package/rss
