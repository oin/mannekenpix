require('datejs')
require('./common')
Common.lunchDatabase = require('dirty')('./data/lunches.db')

Lunch = {
	date: null,
	initiator: null,
	message: "",
	menu: [],
	beurkers: [],
	sandwichers: [],
	goers: [],
	carters: []
}

Common.todaysLunch = function() {
	var x = Common.lunchDatabase.get(Date.today().toString("dddd dd MMMM"))
	if(typeof(x) == 'undefined')
		return Lunch.spawn({ date: Date.today().toString("dddd dd MMMM") })
	return x
}

// Buggy
Common.updateLunch = function(x) {
	return Common.lunchDatabase.set(Date.today().toString("dddd dd MMMM"), x)
}

Common.tellTodaysLunchMenu = function(cmd) {
	var lunch = Common.todaysLunch()
	if(lunch.menu.length == 0) {
		// Try to update the menu
		Common.request({uri: 'http://www.crous-lille.fr/admin-site/restauration_menu_print_w.php?ru=19&midi=1&soir=1&nb_w=10', encoding: 'binary'}, function(error, response, body) {
			if(!error && response.statusCode == 200) {
				body = new Buffer(body, 'binary')
				conv = new Common.iconv.Iconv('iso-8859-1', 'utf8')
				body = conv.convert(body).toString()
				var window = Common.jsdom.jsdom(body).createWindow()
				var $ = Common.jquery.create(window)

				var bestMenu = []
				var bestDistance = 1000
				var todayDate = Date.today().toString("dddd dd MMMM")
				$(".menu_ru_date").each(function() {
					var date = $(this).text().toLowerCase()
					var menu = []
					$(this).closest("tr").next().find("li").each(function() {
						menu.push($(this).text())
					})
					var distance = Common.levenshtein(date, todayDate)
					if(distance <= bestDistance) {
						bestMenu = menu
						bestDistance = distance
					}
				})
				lunch.menu = bestMenu
				Common.updateLunch(lunch)
				cmd.say("Au menu aujourd'hui...")
				cmd.say(bestMenu.join('\n'))
			}
		})
	} else {
		cmd.say("Au menu aujourd'hui...")
		cmd.say(lunch.menu.join('\n'))
	}
}