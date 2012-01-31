require('datejs')

var IssueCommand = require('../command').spawn({
	name: 'issue',
	description: "Un bug tracker collaboratif",
	help: function() {
		this.say("Tu peux entrer des bugs ou des problèmes sur un sujet précis (un tag), et signaler lorsqu'ils sont résolus.")
		this.say("Pour voir la liste des tags : issue list")
		this.say("Pour voir les derniers problèmes non résolus liés à un tag : issue list le_tag")
		this.say("Pour ajouter un problème sur un tag : issue add le_tag Blabla")
		this.say("Pour signaler un problème résolu : issue fix le_tag numéro (chaque problème a un numéro)")
	},
	list: function(args) {
		if(args.length > 0) {
			var tag = args[0].toLowerCase()
			var all = false
			if(args.length > 1 && args[1].toLowerCase() === 'all')
				all = true
			var issues = Common.issuesFor(tag)
			var me = this
			issues.forEach(function(issue) {
				if(issue.fixed && !all)
					return
				var line = issue.tag + " " + issue.id + " : " + issue.message + " (" + issue.by + ", le " + issue.date.toString("dddd dd MMMM yyyy") + ")"
				if(issue.fixed)
					line += " (résolu par " + issue.fixedBy + " le " + issue.fixedDate.toString("dddd dd MMMM yyyy") + ")"
				me.say(line)
			})
		} else {
			var tags = Common.issueTags()
			if(tags.length > 0)
				this.say("Voici les tags que je connais : " + Common.issueTags().join(', '))
			else
				this.say("Tout est rose dans mon monde.")
		}
	},
	add: function(args) {
		if(args.length >= 2) {
			var tag = args[0].toLowerCase()
			var message = args.splice(1).join(' ')
			var issue = Common.issue(tag, Common.nextIssueId(tag))
			issue.by = this.client.nick()
			issue.message = message
			Common.saveIssue(issue)
			this.say("C'est dans la boîte, fieu ! Ton ticket : " + issue.tag + " " + issue.id)
		}
	},
	fix: function(args) {
		if(args.length >= 2) {
			var tag = args[0].toLowerCase()
			var id = args[1]
			var issues = Common.issuesFor(tag)
			var remainingIssues = -1
			// Count remaining issues
			issues.forEach(function(issue) {
				if(!issue.fixed) remainingIssues++;
			})
			
			var me = this
			issues.forEach(function(issue) {
				if(issue.id == id) {
					issue.fixed = true
					issue.fixedBy = me.client.nick()
					issue.fixedDate = Date.today()
					Common.saveIssue(issue)
					if(remainingIssues)
						me.say("Plus que " + remainingIssues + " !")
				}
			})
		}
	}
})

module.exports = IssueCommand