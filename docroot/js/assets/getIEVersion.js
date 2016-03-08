define([ 'jquery' ], function ( $ ) {

    function getIEVersion(){
        var agent = navigator.userAgent;
        var reg = /MSIE\s?(\d+)(?:\.(\d+))?/i;
        var matches = agent.match(reg);
        if (matches != null) {
            return { major: matches[1], minor: matches[2] };
        }
        return { major: "-1", minor: "-1" };
    }

    var ie_version = getIEVersion();
    if( ie_version.major >= 8 ){
        $("html").addClass("gt-ie8 ie"+ie_version.major+" gt-ie"+ie_version.major);
    }

    var isIE11 = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);
    if(isIE11){
        $("html").addClass("ie11 gt-ie8");
    }

});