app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('dashboard.comments', {
            url: '/comments',
            templateUrl: '/dist/app/comments/partials/dashboard.comments.html',
            controller: 'commentsCtrl',
            data: {
                auth: true
            },
            resolve: {
                role: ['$q', 'Users', function ($q, Users) {
                    var defer = $q.defer();
                    Users.me(function(me){
                        if (me.admin || me.comments) {
                            defer.resolve(200);
                        } else {
                            defer.reject(403);
                        }
                    });

                    return defer.promise;
                }]
            }
        });
}]);