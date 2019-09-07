function animateDashboard(page){
    $.when(
        $.get(page, function(data) {
            $('.content').html(data);
        })
    ).done(function() {
        demo.initDashboardPageCharts();

        
    });
}

$(document).ready(function () {
    animateDashboard("dashboard.html")
});

$("#dashboard").on("click", function amor() {
    animateDashboard("dashboard.html")
});

$("#myProfile").on("click", function () {
    $('.content').load("myProfile.html");
});

$("#exchanges").on("click", function () {
    animateDashboard("exchanges.html")
});


