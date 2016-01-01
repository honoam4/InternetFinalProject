angular.module('BookStoreApp').controller('chatController',['$scope', 'chatSocket', 'nickName', '$log',
    function ($scope, chatSocket, nickName, $log) {

    var chatSocket = socketFactory();
        chatSocket.forward('broadcast');

    var messageFormatter = function(date, nick, message) {
        return date.toLocaleTimeString() + ' - ' +
            nick + ' - ' +
            message + '\n';
    };

    $scope.nickName = nickName;
    $scope.messageLog = 'Ready to chat!';

    $scope.sendMessage = function() {
        var match = $scope.message.match('^\/nick (.*)');

        if (angular.isDefined(match) &&
            angular.isArray(match) && match.length === 2) {
            var oldNick = nickName;
            nickName = match[1];
            $scope.message = '';
            $scope.messageLog = messageFormatter(new Date(),
                    nickName, 'nickname changed - from ' +
                    oldNick + ' to ' + nickName + '!') +
                $scope.messageLog;
            $scope.nickName = nickName;
        }

        $log.debug('sending message', $scope.message);
        chatSocket.emit('message', nickName, $scope.message);
        $log.debug('message sent', $scope.message);
        $scope.message = '';
    }
}]);
