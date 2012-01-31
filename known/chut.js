var ChutCommand = require('../command').spawn({
	name: 'chut',
	description: "Fais en sorte que je ne te dérange plus",
	execute: function() {
		var info = this.client.getInfo()
		if(info['silent'] === true) {
			this.say("Je suis déjà muet comme une tombe avec toi, fieu ! Qu'est-ce que tu veux de plus ?")
		} else {
			info['silent'] = true
			this.client.setInfo(info)
			this.say("D'accord, je retourne à mes fourneaux et je ne te dérange plus.")
		}
	},
	help: function() {
		this.say("Tu peux me faire taire, puis me refaire parler plus tard avec parle.")
	}
})

module.exports = ChutCommand