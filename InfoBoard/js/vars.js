var weatherUpdateFreq = 10000;
var newsUpdateFreq = 30000;
var newsCounter = 0;
var weatherCounter = 0;
var rss2json = "https://api.rss2json.com/v1/api.json?rss_url=";
var bbcWeatherDerby = [
    "https://weather-broker-cdn.api.bbci.co.uk/en/forecast/rss/3day/2651347"
];
var newsSources = [
    "http://feeds.bbci.co.uk/news/uk/rss.xml?edition=uk",
    "http://feeds.bbci.co.uk/news/technology/rss.xml?edtion=uk",
    "http://feeds.bbci.co.uk/news/science_and_environment/rss.xml?edtion=uk",
    "http://feeds.bbci.co.uk/news/world/rss.xml?edtion=uk"
];
