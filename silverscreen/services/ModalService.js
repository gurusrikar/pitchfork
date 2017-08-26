/**
 * Created by gurusrikar on 21/5/16.
 */
//silverScreenApp.factory('ModalService', function ($uibModal) {
silverScreenApp.factory('ModalService', function ($mdDialog) {

    function openLoginModal(ev, force) {
        console.log("Clicked openLoginModal");
        return $mdDialog.show({
            controller: 'LoginController',
            templateUrl: 'modals/modal-login.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: force !== true
        });
    }

    return {
        openLoginModal: openLoginModal
    };

});