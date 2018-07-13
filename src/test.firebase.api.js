var proxy = 'https://cryptic-headland-94862.herokuapp.com/'; // for Cross Origin Request


// LOGIN - required to do user's personal things
$('#submit').on('click', () => {
    var username = $('#username').val(); // tel number
    var password = $('#password').val(); // id card
    $.ajax({
        url: proxy + 'https://us-central1-rnkm2018-house-ad25ge.cloudfunctions.net/login',
        method: 'POST',
        data: {
            username: username,
            password: password
        },
        success: function (res) {
            if (typeof res !== 'object') // not sure if res will be automatically parsed to JSON or not (I think it will)
                res = JSON.parse(res);
            res1 = {
                "success": true,
                "message": "OK",
                "token": "$2b$08$SvNr3DXmrTfmxoqXyJiR7u0CQMzEnUgL/L.BwcqwIPcFHnPNbNmX2",
                "expire": "Wed, 11 Jul 2018 17:40:02 GMT"
            } // OK --> use token for movePerson or other
            res2 = {
                "success": false,
                "message": "wrong credentials"
            } // user/password error
        },
    });

});
// movePerson between house
$.ajax({
    url: proxy + 'https://us-central1-rnkm2018-house-ad25ge.cloudfunctions.net/movePerson',
    method: 'POST',
    data: {
        house: event.data.house, // house name to move to
        username: user, // username (tel number)
        token: token, // token (from login, expires after 5 mins, I can remove the timeout)
    },
    success: function (res) {
        // manage response here
        // some examples
        res1 = {
            "success": false,
            "message": "full house"
        } // house full
        res2 = {
            "success": false,
            "message": "invalid house"
        } // trying to specify invalid house
        res3 = {
            "success": false,
            "message": "wrong credentials"
        } // token expired or wrong token/username
        res4 = {
            "success": true,
            "message": "OK"
        } // OK
    },
});

// confirm house and sent to DTNl
$.ajax({
    url: proxy + 'https://us-central1-rnkm2018-house-ad25ge.cloudfunctions.net/confirmHouse',
    method: 'POST',
    data: {
        username: user,
        token: token
    },
    success: function (res) {
        // res.success === true --> OK
        // else  not locked you house
    },

});

// get user's info from DTNL & firebase
$.ajax({
    url: proxy + 'https://us-central1-rnkm2018-house-ad25ge.cloudfunctions.net/getPersonInfo',
    method: 'POST',
    data: {
        username: user,
        token: token
    },
    success: function (res) {
        res1 = {
            "success": false,
            "message": "wrong credentials"
        }
        res2 = {
            "success": true,
            "message": "OK",
            "data": {
                "_id": "5b45d9ad22607ae04bdf2459",
                "dynamic/RCU_required": "no",
                "dynamic/congenital_disease": "091-919-1011",
                "dynamic/disorders": "-",
                "dynamic/drugAllergy": "-",
                "dynamic/emergency_tel": "091-919-1011",
                "dynamic/emergency_tel_relation": "091-919-1011",
                "dynamic/facebook": "091-919-1011",
                "dynamic/faculty": "เภสัชศาสตร์ - Faculty of Pharmaceutical Sciences",
                "dynamic/foodAllergies": "-",
                "dynamic/fullname": "ก กด",
                "dynamic/lineID": "091-919-1011",
                "dynamic/nameprefix": "นาย - Mr.",
                "dynamic/nationalID_URL": "1273617233333",
                "dynamic/nickname": "กด กด",
                "dynamic/regularDrug": "-",
                "dynamic/religion": "d",
                "dynamic/tel": "091-919-1011",
                "head/house1": "บ้านคิดส์ - Kids",
                "head/house2": "บ้านจัดสัน - Jadson",
                "head/house3": "บ้านดัง - Dung",
                "hidden/groupID": "JJGZ1DG8GEEYXBB1CD",
                "hidden/imageURL": "https://firebasestorage.googleapis.com/v0/b/rnkm-cu102.appspot.com/o/image%2Ff9u2e3qm343ed.jpeg?alt=media&token=a908c30d-36e8-4d4f-a887-14e64d07e935",
                "house": "baanjo",
                "is_confirmed": 0
            } // last two field (house, is_confirmed is data from firebase, house = realtime house (the latest data))
            // final house = house in DTNL; not updated until firebase submits to DTNL
        }
    }
});

// LOGOUT - just invalidate token
$.ajax({
    url: proxy + 'https://us-central1-rnkm2018-house-ad25ge.cloudfunctions.net/logout',
    method: 'POST',
    data: {
        username: user,
        token: token
    },
    success: function (res) {
        $('#msg').html(res.message);
        window.location.href = ('login.html');
    },

});
