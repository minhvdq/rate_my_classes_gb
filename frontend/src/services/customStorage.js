const getItem = (key) => 
    {
        // getting the data from localStorage using the key
        let result=JSON.parse(window.localStorage.getItem(key));

        if(result)
        {
            /*
                if data expireTime is less then current time
                means item has expired,
                in this case removing the item using the key
                and return the null.
            */
            if(result.expireTime<=Date.now())
            {
                window.localStorage.removeItem(key);
                return null;
            }
            // else return the data.
            return result.data;
        }
        //if there is no data provided the key, return null.
        return null;
    }

const setItem = (key, val) => {
    let maxAge = 60*60*1000;
    let result = {data: val}

    if(maxAge){
    /*
    setting the expireTime currentTime + expiry Time 
    provided when method was called.
    */
        result.expireTime=Date.now()+maxAge;
    }
    window.localStorage.setItem(key,JSON.stringify(result));

}

export default {getItem, setItem}