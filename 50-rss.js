'use strict';

const RSS = require('rss');

module.exports = function(RED) {
    function RSSNode(config) {
        RED.nodes.createNode(this, config);

        const node = this;
        node.on('input', function(msg) {
            try {
                const feed = new RSS(msg.payload.feedOptions);

                for (let item of msg.payload.items) {
                    feed.item(item.itemOptions);
                }

                // Overwrite the payload but otherwise keep the message intact
                msg.payload = feed.xml();
                node.send(msg);
            }
            catch (ex) {
                console.log(ex);
            }
        });
    }

    RED.nodes.registerType('rss', RSSNode);
};
