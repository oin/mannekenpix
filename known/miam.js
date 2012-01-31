var MiamCommand = require('../command').spawn({
	name: 'miam',
	description: "Coordonne les repas exquis que je vous prépare !",
	execute: function() {
		Common.tellTodaysLunchMenu(this)
	},
	help: function() {
		this.say("Pour savoir ce qu'on mange : miam")
		this.say("Pour proposer le repas : miam miam [Blabla]")
		this.say("Pour dire qu'on ne vient pas : miam beurk")
		this.say("Pour dire qu'on va d'abord recharger sa carte : miam carte")
		this.say("Pour dire qu'on voudrait un sandwich : miam sandwich [Blabla]")
		this.say("Pour dire qu'on y va tout de suite : miam go [Blabla]")
	},
	miam: function(args) {
		var lunch = Common.todaysLunch()
		if(lunch.initiator) {
			this.say(lunch.initiator + " a déjà proposé le repas. Fieu, suis un peu !")
		} else {
			lunch.initiator = this.client.nick()
			lunch.message = args.join(' ')
			Common.updateLunch(lunch)
			Common.broadcast(this.client.id, lunch.initiator + " te propose d'aller te remplir la panse. " + lunch.message)
		}
	},
	beurk: function(args) {
		var lunch = Common.todaysLunch()
		var nick = this.client.nick()
		if(lunch.initiator) {
			if(Common.contains(lunch.beurkers, nick)) {
				this.say("Tu l'as déjà dit, fieu.")
			} else {
				Common.broadcast(this.client.id, nick + " ne viendra pas manger. " + args.join(' '))
				lunch.beurkers.push(nick)
				Common.updateLunch(lunch)
			}
		} else {
			this.say("Personne n'a proposé de manger aujourd'hui, fieu.")
		}
	},
	carte: function(args) {
		var lunch = Common.todaysLunch()
		var nick = this.client.nick()
		if(lunch.initiator) {
			if(Common.contains(lunch.carters, nick)) {
				this.say("Tu l'as déjà dit, fieu.")
			} else {
				Common.broadcast(this.client.id, nick + " veut partir un peu plus tôt pour recharger sa carte. " + args.join(' '))
				lunch.carters.push(nick)
				Common.updateLunch(lunch)
			}
		} else {
			this.say("Personne n'a proposé de manger aujourd'hui, fieu.")
		}
	},
	sandwich: function(args) {
		var lunch = Common.todaysLunch()
		var nick = this.client.nick()
		if(lunch.initiator) {
			if(Common.contains(lunch.sandwichers, nick)) {
				this.say("Tu l'as déjà dit, fieu.")
			} else {
				Common.broadcast(this.client.id, nick + " voudrait qu'on lui ramène un sandwich. " + args.join(' '))
				lunch.sandwichers.push(nick)
				Common.updateLunch(lunch)
			}
		} else {
			this.say("Personne n'a proposé de manger aujourd'hui, fieu.")
		}
	},
	go: function(args) {
		var lunch = Common.todaysLunch()
		var nick = this.client.nick()
		if(lunch.initiator) {
			if(Common.contains(lunch.goers, nick)) {
				this.say("Tu l'as déjà dit, fieu.")
			} else {
				Common.broadcast(this.client.id, nick + " va manger fissa. " + args.join(' '))
				lunch.goers.push(nick)
				Common.updateLunch(lunch)
			}
		} else {
			this.say("Personne n'a proposé de manger aujourd'hui, fieu.")
		}
	}
})

module.exports = MiamCommand