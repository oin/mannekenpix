Common = {
	events: require('events'),
	xmpp: require('./simpler-xmpp'),
	jsdom: require('jsdom'),
	levenshtein: require('levenshtein'),
	request: require('request'),
	jquery: require('jquery'),
	iconv: require('iconv'),
	contains: function(a, obj) {
	    var i = a.length
	    while (i--) {
	       if (a[i] === obj) {
	           return true
	       }
	    }
	    return false
	},
	users: [],
	lunches: [],
	start: function() {
		var self = this
		this.xmpp.on('online', function() {
			console.log('Connected.')
		})
		this.xmpp.on('chat', function(from, message) {
			// console.log(from + ' wrote: ' + message)
			self.client(from).receive(message)
		})
		this.xmpp.on('error', function(err) {
			console.error("ERROR: %s", err)
		})
		// this.xmpp.conn.on('stanza', function() {})
		
		this.xmpp.connect(this.xmppAccount)
	}
}

Object.defineProperty(Object.prototype, "spawn", {value: function (props) {
	var defs = {}, key
	for (key in props) {
		if (props.hasOwnProperty(key)) {
			defs[key] = {value: props[key], enumerable: true}
		}
	}
	return Object.create(this, defs)
}})

module.exports = Common