Common.clientDatabase = require('dirty')('./data/people.db')

var State = {
	client: null,
	cmds: [],
	commands: function() { return this.cmds },
	init: function(c) {
		this.client = c
		this.cmds = this.cmds.map(function(x) { return x.spawn({ client: c }) })
	}
}

ForeignState = State.spawn({
	cmds: [require('./foreign/coucou')]
})

KnownState = State.spawn({
	cmds: [require('./known/chut'), require('./known/parle'), require('./known/issue'), require('./known/miam'), require('./known/repo'), require('./known/annonce')]
})

var Client = {
	id: null,
	state: null,
	cmds: [require('./general/help'), require('./general/frite'), require('./general/rmrfslash')],
	activeCommand: null,
	init: function(i) {
		this.id = i
		var self = this
		this.cmds = this.cmds.map(function(x) { return x.spawn({ client: self }) })
		if(this.isForeign()) {
			this.state = ForeignState.spawn()
			console.log("Here comes a new challenger : " + this.id)
			this.send("Je crois que nous ne nous sommes pas présentés. Dis-moi coucou")
		} else
			this.state = KnownState.spawn()
		this.state.init(this)
	},
	commands: function() {
		var c = []
		c = c.concat(this.cmds)
		if(typeof(this.state) != 'undefined')
			c = c.concat(this.state.commands())
		return c
	},
	send: function(message) {
		// console.log("To " + this.id + ": " + message);
		Common.xmpp.send(this.id, message)
	},
	receive: function(message) {
		var args = message.split(' ')
		var self = this
		if(args.length > 0) {
			if(this.activeCommand == null || !this.activeCommand.run(args)) {
				var ok = false
				self.commands().forEach(function(command) {
					if(!ok && command.matches(args[0])) {
						if(command.run(args.splice(1)))
							ok = true
					}
				})
			}
		}
	},
	getInfo: function() {
		var x = Common.clientDatabase.get(this.id)
		if(typeof(x) == 'undefined')
			return {}
		return x
	},
	setInfo: function(info) {
		return Common.clientDatabase.set(this.id, info)
	},
	isForeign: function() {
		if(typeof(this.getInfo()) != 'undefined')
			return typeof(this.getInfo()['nick']) == 'undefined' || this.getInfo()['nick'] == null
		return true
	},
	nick: function() {
		if(!this.isForeign()) return this.getInfo()['nick']
		return null
	}
}

Common.client = function(user) {
	if(typeof(Common.users[user]) == 'undefined') {
		var client = Client.spawn()
		client.init(user)
		Common.users[user] = client
	}
	return Common.users[user]
}

Common.broadcast = function(from, msg) {
	Common.clientDatabase.forEach(function(id, user) {
		if(id != from && user['silent'] != true) {
			// We've got the right to send messages to him/her !
			Common.xmpp.probe(id, function(state) {
				if(state == Common.xmpp.STATUS.ONLINE) {
					Common.xmpp.send(id, msg)
				}
			})
		}
	})
}