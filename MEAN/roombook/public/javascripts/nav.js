$(document).ready(function() {
	$('ul.nav').find('li').each(function() {
		$(this).removeClass('active');
	})
	var url = window.location.pathname;
	$('ul.nav a[href="' + url + '"]').parent().addClass('active');
	if (url == "/room1") populateDates();
	else if (url == "/room2") populateDates();


});
Date.prototype.yyyymmdd = function() {
	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
	var dd = this.getDate().toString();
	return yyyy + "/" + (mm[1] ? mm : "0" + mm[0]) + "/" + (dd[1] ? dd : "0" + dd[0]); // padding
};


function selectCell(element) {
	if ($(element).attr('class').indexOf("success") > -1) {
		$(element).removeClass('success');
		$(element).text("");
	} else if ($(element).attr('class').indexOf("danger") == -1) {
		$(element).addClass("success");
		$(element).text(email);
	}
}
var pageDate;
var weekday = new Array(7);
var weekmap = {
	0: 1,
	1: 0,
	2: -1,
	3: -2,
	4: -3,
	5: -4,
	6: 2
};
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function populateDates() {
	var today = new Date();
	//if today is monday - then show current week
	//if today is saturday or sunday = then show next week
	//if today tuesday - friday get monday date
	//init columns with monday date, date +1, etc
	weekday[0] = "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	var n = today.getDay();
	var dayOfWeek = weekday[n];
	//console.log('day of Week: '+ dayOfWeek);
	//console.log('map value: '+ weekmap[n]);
	//get Monday
	thisWeek();

}

function nextWeek() {
	clearWeek();
	pageDate.setDate(pageDate.getDate() + 7);
	var copiedDate = new Date(pageDate);
	setHeader(copiedDate);
	getWeek();
}

function thisWeek() {
	clearWeek();
	pageDate = new Date();
	var n = pageDate.getDay();
	pageDate.setDate(pageDate.getDate() + weekmap[n]);
	var copiedDate = new Date(pageDate);
	setHeader(copiedDate);
	getWeek();
}

function previousWeek() {
	clearWeek();
	pageDate.setDate(pageDate.getDate() - 7);
	var copiedDate = new Date(pageDate);
	setHeader(copiedDate);
	getWeek();
}

function setHeader(d) {
	//setDateHeader(d);
	for (var i = 1; i <= 5; i++) {
		setDateHeader(d);
		d.setDate(d.getDate() + 1);

	}
}

function setDateHeader(date) {
	var mmm = months[date.getMonth()];
	var dayOfWeek = weekday[date.getDay()];
	//console.log(mmm + ' ' + date.getDate());
	$('#' + dayOfWeek).text(mmm + ' ' + date.getDate());

}
var timeslots = new Array();

function saveWeek() {
	timeslots = [];
	$('.success').each(function() {
		//console.log($(this).attr('day'));
		timeslots.push({
			dayOfWeek: $(this).attr('day'),
			user: username,
			timeSlot: $(this).attr('time'),
			email: email
		});
	});
	//console.log(timeslots);
	var weekObj = {
		startDate: pageDate.yyyymmdd(),
		roomid: roomid,
		slots: timeslots
	};


	$.ajax({
		url: '/update',
		type: 'POST',
		contentType: 'application/json',
		success: function() {

			showSuccess('Saved!');
		},
		data: JSON.stringify(weekObj)
	});
}

function showSuccess(message) {
	window.alert(message);
}
function clearWeek() {
	$('.danger').each(function() {
		$(this).removeClass('danger');
		$(this).text('');
	});
	$('.success').each(function() {
		$(this).removeClass('success');
		$(this).text('');
	});
}
function getWeek() {
	$.getJSON("/week", {
		startDate: pageDate.yyyymmdd(),
		"roomid":roomid
	}, function(result) {
		if ($.isEmptyObject(result)) {
			//console.log('empty');
		}
		else {
			for(var slot of result[0].slots) {
				
				var el = $('td[day='+ slot['dayOfWeek'] + '][time=' + slot['timeSlot'] + ']').first();
				if(slot['user']===username) el.addClass("success");
				else el.addClass("danger");
				el.text(slot['email']);
			}
		}	
	});
}