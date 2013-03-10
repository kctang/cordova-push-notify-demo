require(['jquery'], function ($) {
    console.debug('Loaded [main-swipe]');

    // http://view.jquerymobile.com/1.3.0/docs/examples/panels/panel-swipe-open.php
    $(document).on("pageinit", "#home", function () {
        $(document).on("swipeleft swiperight", "#home", function (e) {
            // We check if there is no open panel on the page because otherwise
            // a swipe to close the left panel would also open the right panel (and v.v.).
            // We do this by checking the data that the framework stores on the page element (panel: open).
            if ($.mobile.activePage.jqmData("panel") !== "open") {
                if (e.type === "swipeleft") {
                    $("#right-panel").panel("open");
                } else if (e.type === "swiperight") {
                    $("#left-panel").panel("open");
                }
            }
        });
    });

});