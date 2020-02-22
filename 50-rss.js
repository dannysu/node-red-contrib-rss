'use strict';

const RSS = require('rss');

module.exports = function(RED) {
    function RSSNode(config) {
        RED.nodes.createNode(this, config);

        const node = this;
        this.feedOptionRules = config.feedOptionRules;
        this.itemOptionRules = config.itemOptionRules;
        node.on('input', function(msg) {
            try {
                const items = msg.payload;

                // Construct feed options based on rules configured
                const feedOptions = {};
                for (let rule of node.feedOptionRules) {
                    if (rule.type === 'str') {
                        feedOptions[rule.name] = rule.value;
                    }
                    else if (rule.type === 'msg') {
                        feedOptions[rule.name] = RED.util.getMessageProperty(msg, rule.value);
                    }
                    else if (rule.type === 'flow') {
                        feedOptions[rule.name] = node.context().flow.get(rule.value);
                    }
                    else if (rule.type === 'global') {
                        feedOptions[rule.name] = node.context().global.get(rule.value);
                    }
                }

                const feed = new RSS(feedOptions);

                for (let item of items) {
                    const itemOptions = {};

                    // Construct item options based on rules configured
                    for (let rule of node.itemOptionRules) {
                        if (rule.type === 'str') {
                            itemOptions[rule.name] = rule.value;
                        }
                        else if (rule.type === 'item') {
                            const property = RED.util.getMessageProperty(item, rule.value);
                            if (property !== undefined) {
                                itemOptions[rule.name] = property;
                            }
                        }
                        else if (rule.type === 'flow') {
                            itemOptions[rule.name] = node.context().flow.get(rule.value);
                        }
                        else if (rule.type === 'global') {
                            itemOptions[rule.name] = node.context().global.get(rule.value);
                        }
                    }

                    feed.item(itemOptions);
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
