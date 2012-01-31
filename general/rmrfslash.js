var RmRfSlashCommand = require('../command').spawn({
	name: 'rm',
	description: "Oh, mais c'est une fonction bien secrète, vois-tu !",
	hidden: true,
	run: function(args) {
		if(args.join(' ') === '-rf /')
			this.say("removed directory: /usr/local/bin")
			this.say("removed directory: /usr/local/share")
			this.say("removed directory: /usr/local/lib")
			this.say("removed directory: /usr/bin")
			this.say("removed directory: /usr/share")
			this.say("removed directory: /usr/include")
			this.say("removed directory: /bin")
			this.say("-bash: rm: command not found")
	}
})

module.exports = RmRfSlashCommand