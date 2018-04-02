
var ctx = 0;
var radius = 0;


$(window).ready(function () {
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90
    drawClock();
    updateNewsFeed();
    updateWeather();
    setInterval(drawClock, 1000);
    setInterval(updateNewsFeed, newsUpdateFreq);
    setInterval(updateWeather, weatherUpdateFreq);
});


function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
    updateTime();
}


function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}


function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.25 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}


function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}


function updateTime() {
    moment.locale("en-gb");
    var curDay = moment().format('dddd');
    var curDate = moment().format('MMMM Do YYYY');
    var curTime = moment().format('H:mm:ss a');
    $("#curTime")[0].innerText = curDay + "\n" + curDate + "\n" + curTime;
}


function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}


function updateWeather(url) {
    $.ajax({
        type: 'GET',
        url: rss2json + bbcWeatherDerby[0],
        dataType: 'jsonp',
        success: (data) => {
            var weather = data.items[weatherCounter].title;
            weather = weather.replace(/\(.*?\)/g, "");
            weather = weather.replace(", ", "\n");
            $("#weather")[0].innerText = weather;
            weatherCounter = (weatherCounter + 1) % data.items.length;
        }
    });
}


function updateNewsFeed(url) {
    $.ajax({
        type: 'GET',
        url: rss2json + newsSources[newsCounter],
        dataType: 'jsonp',
        success: (data) => {
            $("#NewsSource")[0].innerText = data.feed.title;
            var newsID = "#news";
            $(newsID).empty();
            $.each(data.items, (index, item) => {
                $("<li/>", {
                    html: `${item.title}`
                }).appendTo(newsID);
            });
        }
    });
    newsCounter = (newsCounter + 1) % newsSources.length;
}
