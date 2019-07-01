create a new checkin: post method url: localhost:3000/command/checkins

body:
{
	"passenger": [{
		"PassengerId": 5,
		"Name": "Tolga",
		"Surname": "piet",
		"Birthdate": "5-5-2019"
	}],
	"flight": [{
		"PlaneId": 5,
		"AirlineId": 5,
		"DepartureDate": "5-5-2019",
		"Delay": 5,
		"Destination": "Turkey"
	}],
	"checkedIn": 1,
	"checkedInDate": 1
}

retrieve all checkins: get method url: localhost:3000/query/checkins