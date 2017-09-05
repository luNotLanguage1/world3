/* jshint -W003 */
/* jshint -W098 */
/* jshint -W100 */
/* jshint -W061 */
/* global ActiveXObject: true, 
          XSLTProcessor: true
*/

var templates = {};

jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options = $.extend({}, options);
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

function update_html(target, templatename, data, callback, callbackdata){
    if (templates[templatename]){
        $("#"+target).html(templates[templatename].process(data));
        if (callback) {callback(callbackdata);}
    }
    else{
        $.get(templatename, {}, function(return_html){
            templates[templatename] = return_html;
            $("#"+target).html(return_html.process(data));
            if (callback) {callback(callbackdata);}
        });
    }
}

$.ajaxSetup({async:false});

function load_xml(text){
    if (window.DOMParser){
        var parser = new DOMParser();
        return parser.parseFromString(text,"text/xml");
    }
    else{// Internet Explorer
    var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
        xmlDoc.async = "false";
        xmlDoc.loadXML(text); 
        return xmlDoc;
    } 
}

function xml_to_html(xml, xslt, xslt_url){
    if(window.ActiveXObject){
        if (xslt_url){
            var new_xslt = new ActiveXObject("Msxml2.XSLTemplate");
            var xmlDoc = xml;
            var xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
            xslDoc.async = false;
            xslDoc.resolveExternals = false;
            xslDoc.load(xslt_url);
            new_xslt.stylesheet = xslDoc;
            var xslProc = new_xslt.createProcessor();
            xslProc.input = xmlDoc;
            xslProc.transform();
            return xslProc.output;
        }
        else{
            return xml.transformNode(xslt);
        }
    }
    else if (document.implementation && document.implementation.createDocument){
        try{
        var xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xslt);
        return xsltProcessor.transformToFragment(xml, document);
        }catch(e){
            alert(e);
        }
    }
}

function get_html_body(html){
    var body_re = new RegExp('<body.*?>((.|\n|\r)*)<\/body>', 'gi');
    var res = body_re.exec(html);
    return res ? res[1] : null;
}

function HTMLDecode(str){
    if(str.length === 0){
        return '';
    }
    var s = str.replace(/&amp;/g,      "&");
    s = s.replace(/&lt;/g,        "<");
    s = s.replace(/&gt;/g,        ">"); 
    s = s.replace(/&nbsp;/g,        " "); 
    s = s.replace(/&#39;/g,      "\'");  
    s = s.replace(/&quot;/g,      "\""); 
    return s;
}

function escapeHTML(str){
    return $('<div/>').text(str).html();
}

function request(paras)
{ 
    var i, j;
    var url = location.href; 
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
    var paraObj = {};
    for (i=0; j=paraString[i]; i++){ 
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
    } 
    var returnValue = paraObj[paras.toLowerCase()]; 
    if(typeof(returnValue)=="undefined"){ 
        return ""; 
    }else{ 
        return returnValue; 
    } 
}

function shuffle(arr){
    arr.sort(function(x, y){return Math.floor(Math.random()*3)-1;});
    return arr;
}

function split_list(arr, count){
    var lists = [];
    for(var begin=0; begin < arr.length; begin += count){
        lists.push(arr.slice(begin, begin + count));
    }
    return lists;
}

