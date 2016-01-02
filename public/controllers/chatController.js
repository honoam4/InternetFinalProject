angular.module('BookStoreApp').controller('chatController',['$scope', '$log', 'chatSocket', 'messageFormatter',
    function ($scope, $log, chatSocket, messageFormatter) {

    var nickName = 'User';

    $scope.nickName = nickName;
    $scope.messageLog = 'Ready to chat!';

    $scope.sendMessage = function() {
        var match = $scope.message.match('^\/nick (.*)');

        // Replacing nick name
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
        else {
            // Sending the message to the server
            $log.debug('sending message', $scope.message);
            chatSocket.emit('message', nickName, $scope.message);
            $scope.messageLog = messageFormatter(new Date(),
                    nickName, $scope.message) +
                $scope.messageLog;
            $log.debug('message sent', $scope.message);
        }

        $scope.message = '';
    }

    // Receive message from the server
    chatSocket.on('message', function(msg){
        $scope.messageLog = 'Your message has been sent!\n\n'
                            + $scope.messageLog;
    });
}]);
