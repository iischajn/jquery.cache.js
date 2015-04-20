(function($) {    
    function Cache(name){
        var localStorage = window.localStorage;
        var JSON = window.JSON;
        
        if(!localStorage || !JSON) {
            return false;
        }
        this.cache_key = name;
        this.database = JSON.parse(localStorage.getItem(this.cache_key)) || {};
    }

    $.extend(Cache.prototype, {
        database:{},
        item: function(key, data) {
            this.key = key;
            this.data = data;
            this.time = +new Date();
        },
        set: function(key, data){
            if(!this.cache_key){
                return false;
            }
            this.database[key] = new this.item(key, data);
            localStorage.setItem(this.cache_key, JSON.stringify(this.database));
        },
        get: function(key, maxAge) {
            var item = this.database[key],
                res = null,
                time;
            if(item) {
                res = item.data;
                time = item.time;
                if(maxAge && new Date() - time > maxAge) {
                    res = null;
                }
            }
            return res;
        }
    });

    $.cache = {};
    $.cache.instance = function(namespace){
        return new Cache(namespace);
    }
    
}(jQuery));
