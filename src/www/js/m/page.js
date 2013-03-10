require(['jquery', 'jskit', 'text!../t/page.html!strip'],
    function ($, jskit, html) {
        $('body').append(html);
        jskit.publish('onHtmlReady');
    }
);