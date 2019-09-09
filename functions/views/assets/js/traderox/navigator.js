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
    $('.nav li.active').removeClass('active');
    $(this).parent().addClass('active');
    animateDashboard("dashboard.html",$(this).parent())
    $('.navbar-brand').html('Dashboard');
});

$("#myProfile").on("click", function () {
    $('.nav li.active').removeClass('active');
    $(this).parent().addClass('active');
    $('.content').load("myProfile.html");
    $('.navbar-brand').html('My Profile');

});

$("#exchanges").on("click", function () {
    $('.nav li.active').removeClass('active');
    $(this).parent().addClass('active');
    animateDashboard("exchanges.html")
    $('.navbar-brand').html('Exchanges');
    getExchanges();
});


$('.light-badge').click(function() {
    $('body').addClass('white-content');
  });

  $('.dark-badge').click(function() {
    $('body').removeClass('white-content');
  });