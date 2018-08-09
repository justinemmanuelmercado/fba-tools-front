const service = function service($http, $location) {

    const verifyAccess = (token) => {
        return $http.get("https://api.amazon.com/auth/o2/tokeninfo?access_token=" + encodeURIComponent(token))
        .then((result) => {
            if (result) {
               return result;
            }
        })
        .catch((err) => {
            console.log(err); 
        });
    };

    const getProfileDetails = (token) => {
        var aws_access_token = $location.search().access_token;
        console.log(aws_access_token);
        var verifyToken = verifyAccess(token);
        verifyToken.then((access_details) => {
             $http.defaults.headers.common.Authorization = "bearer " + token;
             return $http.get("https://api.amazon.com/user/profile")
             .then((profile_details) => {
                console.log("Profile Details: ",profile_details);
             });
        });
    };

    return {
        verifyAccess,
        getProfileDetails
    };
};

service.$inject = ['$http', '$location'];

module.exports = service;
