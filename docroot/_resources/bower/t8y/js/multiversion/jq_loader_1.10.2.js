define(['jquery_1.10.2'], function (jq) {
    var jq = jq || $;
    console.log('VERSION', jq().jquery);
    return jq.noConflict( true );
});