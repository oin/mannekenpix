require('datejs')
require('./common')
Common.announceDatabase = require('dirty')('./data/announces.db')

Announce = {
	date: null,
	from: null,
	message: ""
}

Common.addAnnounce = function(from, message) {
	var announces = Common.announceDatabase.get("announces")
	if(typeof(announces) == 'undefined')
		announces = []
	var date = new Date().toString("dddd dd MMMM")
	announces.unshift(Announce.spawn({
		date: date,
		from: from,
		message: message
	}))
	return Common.announceDatabase.set("announces", announces)
}

Common.lastAnnounces = function() {
	var announces =  Common.announceDatabase.get("announces")
	var selected = []
	if(typeof(announces) == 'undefined')
		announces = []
	for(var i=0; i<10 && i<announces.length; i++)
		selected.push(announces[i])
	return selected
}