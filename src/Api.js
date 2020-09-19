import $ from 'jquery';

const Api = {
    /************************* タグ関連 **************************/
    getTag: (_keyword, callback) => {
        let data = [
            {
            "tagname": _keyword
            }
        ];
        $.ajax({
            type: 'POST',
            url: '',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'JSON',
            success: function (json) {
                if (typeof callback !== 'undefined' && callback !== null) {
                    callback(JSON.parse(json.body).tag);
                } else {
                    return json.body;
                }
        },
            error: function(err) {
                console.log(err);
            }
        });
    },

    registTag : (tagname, callback) => {
        let data=[
            {
              "tagname": tagname
            }

          ];
        $.ajax({
            type: 'POST',
            url: '',
            contentType: 'application/json',
            dataType: 'JSON',
            data: JSON.stringify(data),
            success: function (json) {
                if (typeof callback !== 'undefined' && callback !== null) {
                    callback(JSON.parse(json.body).tag);
                 } else {
                     return json.body;
                 }
        },
            error: function(err) {
                console.log(err);
            }
        });
    },
    /************************* タグ関連 **************************/

    getEventMe: (userId, callback) => {
        let data = {
            "member_id": userId
        };
        $.ajax({
            type: 'POST',
            url: '',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'JSON',
            success: function (json) {
                if (typeof callback !== 'undefined' && callback !== null) {
                    callback("user_event",json.body.event_info);
                } else {
                    return json.body;
                }
        },
            error: function(err) {
                console.log(err);
            }
        });
    },

    getEventFriend: (userId, callback) => {
        let data = {
            "member_id": userId
        };
        $.ajax({
            type: 'POST',
            url: '',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'JSON',
            success: function (json) {
                if (typeof callback !== 'undefined' && callback !== null) {
                    callback("friend_event",json.body.event_info);
                } else {
                    return json.body;
                }
        },
            error: function(err) {
                console.log(err);
            }
        });
    },

    getEventLimitAll: (userId, limit_date, callback) => {
        let data = {
            "member_id": userId,
            "limit_date" : limit_date
        };
        $.ajax({
            type: 'POST',
            url: '',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'JSON',
            success: function (json) {
                if (typeof callback !== 'undefined' && callback !== null) {
                    callback("event_list",json.body.event_info);
                } else {
                    return json.body;
                }
        },
            error: function(err) {
                console.log(err);
            }
        });
    },

    eventCreate : (event_info, callback) => {
        let data= event_info;
        $.ajax({
            type: 'POST',
            url: '',
            contentType: 'application/json',
            dataType: 'JSON',
            data: JSON.stringify(data),
            success: function (json) {
                callback('');
        },
            error: function(err) {
                console.log(err);
            }
        });
    },

    getShopList: (callback) => {
        let data = {
        };
        $.ajax({
            type: 'POST',
            url: '',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'JSON',
            success: function (json) {
                if (typeof callback !== 'undefined' && callback !== null) {
                    callback(JSON.parse(json.body));
                } else {
                    return json.body;
                }
        },
            error: function(err) {
                console.log(err);
            }
        });
    },

    getEventInfo: (event_idd, callback) => {
        let data = {
            event_id : event_idd
        };
        $.ajax({
            type: 'POST',
            url: '',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'JSON',
            success: function (json) {
                if (typeof callback !== 'undefined' && callback !== null) {
                    callback(json.body);
                } else {
                    return json.body;
                }
        },
            error: function(err) {
                console.log(err);
            }
        });
    },
    
    setNiceEntry : (event_id, member_id, member_name, callback) => {
        let data= [
            {
                event_id : event_id,
                member_id : member_id,
                member_name : member_name
            }
        ];
        $.ajax({
            type: 'POST',
            url: '',
            contentType: 'application/json',
            dataType: 'JSON',
            data: JSON.stringify(data),
            success: function (json) {
                callback(json.body);
        },
            error: function(err) {
                console.log(err);
            }
        });
    },

    enterEvent : (dataa, callback) => {
        //[{event_id,member_id,member_name}]
        let data= dataa;
        $.ajax({
            type: 'POST',
            url: '',
            contentType: 'application/json',
            dataType: 'JSON',
            data: JSON.stringify(data),
            success: function (json) {
                callback();
        },
            error: function(err) {
                console.log(err);
            }
        });
    },

    getFriendList: (member_id, callback) => {
        let data = {
            member_id : member_id
        };
        $.ajax({
            type: 'POST',
            url: '',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'JSON',
            success: function (json) {
                if (typeof callback !== 'undefined' && callback !== null) {
                    callback(json.body.friend_info);
                } else {
                    return json.body;
                }
        },
            error: function(err) {
                console.log(err);
            }
        });
    },

    getSearchEvent: (member_idd, searchh, limit_datee, callback) => {
        let data = {
            member_id : member_idd,
            search : searchh,
            limit_date : limit_datee
        };
        $.ajax({
            type: 'POST',
            url: '',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'JSON',
            success: function (json) {
                if (typeof callback !== 'undefined' && callback !== null) {
                    callback(json.body.event_info);
                } else {
                    return json.body;
                }
        },
            error: function(err) {
                console.log(err);
            }
        });
    },
}

export default Api;