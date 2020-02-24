$(document).ready(function () {
    animateDashboard("dashboard.html")
});

$("#dashboard").on("click", function () {
    $('.nav li.active').removeClass('active');
    $(this).parent().addClass('active');
    $.when(
        $.get("dashboard.html", function (data) {
            $('.content').html(data);
        })
    ).done(function () {
        demo.initDashboardPageCharts();
        $('.navbar-brand').html('Dashboard');
    });
});

$("#dataBank").on("click", function () {
    $('.nav li.active').removeClass('active');
    $(this).parent().addClass('active');
    $.when(
        $.get("dataBank.html", function (data) {
            $('.content').html(data);
        })
    ).done(function () {
        $('.navbar-brand').html('Data Bank');
        fillDatabank()
    });
});

$("#myProfile").on("click", function () {
    $('.nav li.active').removeClass('active');
    $(this).parent().addClass('active');
    $.when(
        $.get("myProfile.html", function (data) {
            $('.content').html(data);
        })
    ).done(function () {
        $('.navbar-brand').html('My Profile');
    });
});

$("#lalaland").on("click", function () {
    $('.nav li.active').removeClass('active');
    $(this).parent().addClass('active');
    $.when(
        $.get("lalaland.html", function (data) {
            $('.content').html(data);
        })
    ).done(function () {
        $('.navbar-brand').html('Lalaland');
    });
});

$('.light-badge').click(function () {
    $('body').addClass('white-content');
});

$('.dark-badge').click(function () {
    $('body').removeClass('white-content');
});