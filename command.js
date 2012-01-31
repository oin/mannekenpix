var Command = {
	client: null,
	name: null,
	description: null,
	parent: null,
	hidden: false,
	say: function(x) { this.client.send(x) },
	attach: function() { this.client.activeCommand = this },
	detach: function() { this.client.activeCommand = null },
	matches: function(x) {
		if(typeof(this.name) == 'string') {
			return this.name == x.toLowerCase()
		} else
			return Common.contains(this.name, x.toLowerCase())
	},
	run: function(args) {
		if(args.length == 0)
			return this.execute()
		else {
			var remArgs = args.splice(1)
			if(typeof(this[args[0]]) == 'function')
				return this[args[0]](remArgs)
		}
		return false
	},
	execute: function() { return false },
	toString: function() { return this.name },
	init: function(c) {
		this.client = c
	}
}

module.exports = Command