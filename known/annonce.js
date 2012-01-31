var Command = require('../command')
var AnnonceCommand = Command.spawn({
	name: 'annonce',
	description: "Offre un service d'annonce",
	run: function(args) {
		if(args.length >= 2) {
			Common.addAnnounce(this.client.nick(), args.join(' '))
			Common.broadcast(this.client.id, "Avis à la population. Je te transmets une annonce de " + this.client.nick() + " :\n" + args.join(' '))
		} else {
			Command.run.call(this, args) // super.run(args)
		}
	},
	help: function() {
		this.say("Pour faire une annonce : annonce Blabla blabla")
		this.say("Pour lire les dernières annonces : annonce list")
	},
	list: function() {
		var last = Common.lastAnnounces()
		var me = this
		last.forEach(function(announce) {
			me.say("" + announce.from + ", le " + announce.date.toString("dddd dd MMMM") + " : " + announce.message)
		})
	}
})

module.exports = AnnonceCommand