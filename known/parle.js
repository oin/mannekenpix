var ParleCommand = require('../command').spawn({
	name: 'parle',
	description: "Laisse-moi te déranger quand j'en ai envie",
	execute: function() {
		var info = this.client.getInfo()
		if(info['silent'] === false) {
			this.say("Oui, ne t'inquiète pas, hein ! je te dérangerai dès que j'en aurai l'occasion.")
		} else {
			info['silent'] = false
			this.client.setInfo(info)
			this.say("Je suis toujours là pour papoter un brin.")
		}
	},
	help: function() {
		this.say("Si tu m'as dit chut car je parlais trop, me dire parle m'autorisera à te parler quand il le faut.")
	}
})

module.exports = ParleCommand