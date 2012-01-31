var HelpCommand = require('../command').spawn({
	name: ['aide', '?', 'help'],
	description: "Demande-moi comment fonctionne quelque chose",
	execute: function() {
		var message = "Je suis Mannekenpix le Belge, cuisinier des Titans !\n"
		message += "Voici ce que je peux te préparer :\n"
		this.client.commands().forEach(function(cmd) {
			if(!cmd.hidden) {
				message += " * " + cmd.name + "\n"
				message += "     " + cmd.description + "\n"
			}
		})
		message += "Rajoute help après la commande pour en savoir plus."
		this.say(message)
	},
	help: function() {
		this.say("Tu vas arrêter, oui !? C'est excessivement énervant !")
	},
	aide: function() { this.help() }
})

module.exports = HelpCommand