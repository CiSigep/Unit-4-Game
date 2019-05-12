window.onload = function () {
    document.querySelectorAll('.crystal').forEach(function(value){
        value.onclick = function() {alert(this.id + " has been clicked")};
    });
}