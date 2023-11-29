function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'templates/skills-member.html',
        scope: {
            skill: '='
        },
        controller: function($scope) {
            $scope.skill = $scope.skill;
        }
    };
}
