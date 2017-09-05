/* jshint -W003 */
/* jshint -W098 */
/* jshint -W100 */
/* jshint -W061 */
/* global d_pid: true, 
          d_product_name: true,
          excape: true,
          TrimPath: true,
          cover: true,
          popup: true,
          d_show_vip_urs: true,
          update_html: true,
          inc_search: true,
          HTMLDecode: true,
          escape: true,
          WdatePicker: true 
*/
function go_login_page(){
    if(window.location.pathname.indexOf('/login.html') === 0 || window.location.pathname.indexOf('/error.html') === 0){
        window.location = '/login.html';
        return;
    }

    window.location = '/login.html?' + window.location.pathname;
    return;
}

var login_status_pat = '{if set_notice}<a style="font-weight:bold;" href="javascript:void(0);" onclick="showNoticePopup()">系统公告</a> | {/if}{if !login_urs} \
                <a href="javascript:go_login_page();" onclick="login();">登录客服</a> | <a href="/myquestions.html">我的提单</a> | <a href="mymessages.html">短消息</a> \
            {else} \
                ${login_urs} | <a href="/myquestions.html">我的提单{if reply_que != 0}(<em>${reply_que}</em>){/if}</a> | <a href="/mymessages.html">短消息{if new_msg != 0}(<em>${new_msg}</em>){/if}</a> | <a href="/cgi-bin/csa/csa_logout.py?refer=/" onclick="logout();">退出</a> \
            {/if}';

var subinfo_pat = '{if gm_notice }<span class="tipTitle">GM提醒</span>&nbsp;{for notify in gm_notify}${gm_notice[notify]}&raquo;&nbsp;&nbsp;{/for}{/if}';

function log_gm_notice(urs, type, clicked){
	$.get("/cgi-bin/csa/make_log.py", {
			"log_type": "gm_notice_log",
			"log_str": "[" + d_product_name + "] " + "[" + urs + "]" + "[" + type + "]" + "[" + clicked + "]"
			}, function(return_html){});
}

function clear_cookie(){
    $.cookie("login_urs", "");
    $.cookie("login_id", "");
    $.cookie("reply_que", "");
    $.cookie("new_msg", "");
    $.cookie("reset_urs", 1);
    $.cookie("recent_op", "");
}

function logout(){
    clear_cookie();
}

function login(){
    clear_cookie();
}

function render_login_status(login_data){
	var global_notice = ['server_notice'];

	var login_urs = login_data['login_urs'];
	if(login_urs.indexOf('@') != -1){
		login_urs = login_urs.substr(0, login_urs.indexOf('@'));
	}
	if(login_urs.length > 8){
		login_urs = login_urs.substr(0, 8) + '...';
	}
	var temp_data = {};
	temp_data['set_notice'] = window.CSA_SET_SUBMIT_NOTICE;
	for(var ele in login_data){
		temp_data[ele] = login_data[ele];
	}
	temp_data['login_urs'] = login_urs;
	$("#login_status").html(login_status_pat.process(temp_data));

	var show_notice = false;
	var gm_notify = $.cookie('gm_notify');
	if (gm_notify && gm_notify != "[]"){    // check [] for old value compatibility
		gm_notify = gm_notify.split(",");
	}else{
		gm_notify = [];
	}
	for (i in gm_notify){
		if ($.inArray(gm_notify[i], global_notice) >= 0){
			show_notice = true;
		}
	}
	if(show_notice || login_data['login_urs']){
		show_notice = true;
	}
	if(show_notice && window.GM_NOTICE){
		var tmp = [];
		for (i in gm_notify){
			if (gm_notify[i] in window.GM_NOTICE){
				tmp.push(gm_notify[i]);
			}
		}
		gm_notify = tmp;
		if (!gm_notify){
			show_notice = false;
		}
	}
	if(show_notice && $('#subinfo') && window.GM_NOTICE){
		temp_data = {
			'gm_notice': window.GM_NOTICE,
			'gm_notify': gm_notify
		};
		if(temp_data['gm_notify'] && temp_data['gm_notify'].length > 0){
		$("#subinfo").html(subinfo_pat.process(temp_data));
		$("#subinfo .withTip").hover(function(){
			$(this).find('.navTip').show();
		}, function(){
			$(this).find('.navTip').hide();
		});
		if($.cookie('log_notice')){
			var notice = $('#subinfo .withTip a').map(function(){return $(this).text();}).get().join(',');
			log_gm_notice(login_data['login_urs'], notice, 0);
			$.cookie('log_notice', '');
		}
		$("#subinfo .withTip a").click(function(){
			log_gm_notice(login_data['login_urs'], $(this).text(), 1);
			return true;
		});
	}
    }
    if($('#logon_panel')){
        if(login_data.login_urs){
            $('#not_login_panel').css('display', 'none');
            $('#logon_panel').css('display', 'block');
        }
        $('#logon_panel_username').html('帐号：' + login_data.login_urs);
        $('#logon_panel_userid').html('用户编号：' + login_data.login_id);
        if(parseInt(login_data.reply_que)){
            $('#logon_panel_questions').html('我的客服提单(' + login_data.reply_que + '条)');
            $('#logon_panel_new_questions').css('display', '');
        }
        else{
            $('#logon_panel_questions').html('我的客服提单');
            $('#logon_panel_new_questions').css('display', 'none');
        }
        if(parseInt(login_data.new_msg)){
            $('#logon_panel_messages').html('我的短消息(' + login_data.new_msg + '条)');
            $('#logon_panel_new_messages').css('display', '');
        }
        else{
            $('#logon_panel_messages').html('我的短消息');
            $('#logon_panel_new_messages').css('display', 'none');
        }
    }
}

function get_notify(pid){
	$.get("/cgi-bin/csa/guide_csa.py", {act:"get_notify", pid:pid}, function(return_html){});
}

function get_server_notice(pid, callback){
	$.getJSON("/cgi-bin/csa/guide_csa.py", {act:"get_server_notice", pid:pid}, function(data){
		callback(data);
	});
}

function set_login_status(no_render, use_cookie_only){
    $.cookie('pid', d_pid);
    var login_data;
    if (!$.cookie("login_urs") && !use_cookie_only){
        $.get("/cgi-bin/csa/guide_csa.py", {act:"login_status", pname:d_product_name}, function(return_html){
            eval("login_data=" + return_html);
            if (login_data && login_data.login_error_msg && !$.cookie('has_alert_login_error')) {
                alert(login_data.login_error_msg);
                $.cookie('has_alert_login_error', '1');
            }

            if (!login_data || !login_data.login_urs){
                login_data = {
                    "login_urs": "",
                    "login_id": "",
                    "reply_que": 0,
                    "new_msg": 0
                };
            }
            else{
                $.cookie("login_urs", login_data.login_urs);
                $.cookie("login_type", login_data.login_type);
                $.cookie("login_id", login_data.login_id);
                $.cookie("reply_que", login_data.reply_que);
                $.cookie("new_msg", login_data.new_msg);
                $.cookie("recent_msg", login_data.recent_msg);
            }
        if(!no_render){
            render_login_status(login_data);
            }
        });
    }
    else if(!no_render){
        login_data = {
            "login_urs": $.cookie("login_urs") || "",
            "login_type": $.cookie("login_type"),
            "login_id": $.cookie("login_id"),
            "reply_que": $.cookie("reply_que"),
            "new_msg": $.cookie("new_msg")
        };
        render_login_status(login_data);
    }
}

function set_validate_img_url(cn_flag)
{
    var img = document.getElementById("validate_img");
    if (img) {
        if (cn_flag){
            img.src = "/cgi-bin/csa/cn_create_validate_image.py?stamp=" + Math.random();
        }
        else{
            img.src = "/cgi-bin/csa/cv20.py?stamp=" + Math.random();
        }
    }
}

function login_submit(msg_div)
{
    var msg;
    if($('#service_terms').length>0 && !$('#service_terms').attr('checked')){
    msg = '请确认同意服务条款！';
    }
    else if($('#username').val().length < 1 || $('#username').val().length > 128)
    {
        msg = '请您输入正确的帐号！';
    }
    else if($('#password').val().length < 1 || $('#password').val().length > 128)
    {
        msg = '请您输入正确的密码！';
    }
    else if($('#validate_img_input').val().length < 1)
    {
        msg = '请您输入验证码！';
    }
    else{
        clear_cookie();
    $.cookie("show_popup", 1);
    $.cookie("log_notice", 1);
        return true;
    }

    if(msg_div && $('#'+msg_div)) {
        $('#'+msg_div).css('display', 'block');
        $('#'+msg_div).html('&nbsp;&nbsp;&nbsp;&nbsp;' + msg);
    }
    return false;
}

function login_submit_new(msg_div)
{
    var msg;
    if($('#service_terms').length>0 && !$('#service_terms').attr('checked')){
		msg = '请确认同意服务条款！';
    } else if($('#username').val().length < 1 || $('#username').val().length > 128){
        msg = '请您输入正确的帐号！';
    } else if($('#password').val().length < 1 || $('#password').val().length > 128){
        msg = '请您输入正确的密码！';
    } else{
        clear_cookie();
		$.cookie("show_popup", 1);
		$.cookie("log_notice", 1);
        return true;
    }

    if(msg_div && $('#'+msg_div)) {
        $('#'+msg_div).css('visibility', '');
        $('#'+msg_div).html('&nbsp;&nbsp;&nbsp;&nbsp;' + msg);
    }
    return false;
}

function subkind_show(kind_id){
    // must be a parent kind
    var kind = $('#tree_' + kind_id);
    var node = $('#ul_' + kind_id);
    if(node.css('display') == 'none'){
        kind.parent().addClass('on');
        node.show();
    }
    else{
        kind.parent().removeClass('on');
        node.hide();
    }
}

function show_egg_page(){
    var egg_input_div = $("#egg_input_div");
    egg_input_div.css('display', 'block');

    var flower_input_div = $("#flower_input_div");
    if(flower_input_div){
        flower_input_div.css('display', "none");
    }
}

function hide_egg_page(){
    var egg_input_div = $("#egg_input_div");
    egg_input_div.css('display', "none");

    var flower_input_div = $("#flower_input_div");
    if(flower_input_div){
        flower_input_div.css('display', "block");
    }
}

function kind_tree_click(kind_id){
    if(location.hash == '#' + kind_id){
        subkind_show(kind_id);
    }
    else{
        location.hash = '#' + kind_id;
    }
}

var paper_url = '';
function update_paper_html(url){
    main_content_src = url;
    $.get(url, {}, function(return_html){
        // Using simple regular expression operation instead of dom for speed.
        // get string of <div class="paper_real_content">.
        var exp = /<!--real_content begin-->((.|\n|\r)*)<!--real_content end-->/gi;
        var res = exp.exec(return_html);
        $('#content_page').empty();
        $('#content_page').append(res[1]);
    });
}

function load_paper(link){
	$('#content_page').html('<img style="margin-top:10px;" src="/images/ajax-loader.gif" alt="请稍候"/>');
	update_paper_html($(link).attr('href'));
	return false;
}

var last_highlight_kind = '';
function highlight_kind(kind_id){
    // must be a sub kind.
    if(last_highlight_kind && $('#tree_' + last_highlight_kind).html()){
        $('#tree_' + last_highlight_kind).removeClass('on');
    }
    $('#tree_' + kind_id).addClass('on');
    last_highlight_kind = kind_id;
}

var global_kind_id;
function select_kind(kind_id){
    var elem = $('#tree_' + kind_id);
    if(!elem || !elem.html()){
        return null;
    }
    if(elem.attr('ktype') == 'main'){
    elem.addClass('on');
        subkind_show(kind_id);
        set_question_navi_bar(kind_id);
    }
    else{
        //find parent kind.
        var pkind = elem.parent().parent().parent().find('h3');
    pkind.addClass('on');
        //if parent is folded, then unfold it.
        if (elem.parent().parent().css('display') == 'none'){
            subkind_show(pkind.attr('kid'));
    }
        set_question_navi_bar(pkind.attr('kid'), kind_id);
        highlight_kind(kind_id);
    }
    return elem;
}

var main_content_src = "";
var self_help_no_login = false;
var search_keyword = '';
function process(default_paperid){
    /*
       Check weather query string has:
       1. kind_id = xxx
       2. paper_id = xxx
       3. stypeid = xxx may search before subtype page
    */
    var kind_id = parseInt($.query.get('kind_id'));
    if(!isNaN(kind_id)){
        var elem = select_kind(kind_id);
        var elem_url = $('#tree_' + kind_id).attr('kurl');
        if(elem && elem.attr('kurl')){
            var submit_url_exp = /\/res\/i\/\d+\.html/gi;
            if(submit_url_exp.exec(elem.attr('kurl'))){
        clear_cookie();
        set_login_status(true);
                if(!$.cookie("login_urs")){
                    window.location = '/login.html?' + window.location.pathname + window.location.search;
                    return;
        }
            }
            update_paper_html(elem.attr('kurl'));
        }
        return;
    }

    var paper_id = parseInt($.query.get('paper_id'));
    if(!isNaN(paper_id)){
        update_paper_html('/res/guide/paper/' + d_product_name + '/' + paper_id + '.html');
        select_kind(global_kind_id);

    // set paper_history cookie
    var paper_str = $.cookie('paper_history');
    var paper_list = [];
    if(paper_str != null && paper_str !== ''){
        paper_list = $.parseJSON(paper_str);
    }
    if($.inArray(paper_id, paper_list) == -1){
        paper_list = paper_list.slice(-9);
        paper_list.push(paper_id);
        $.cookie('paper_history', '[' + paper_list.toString() + ']');
    }
        return;
    }

    var stypeid = parseInt($.query.get('stypeid'));
    if(!isNaN(stypeid)){
        var skip_search = $.query.get('skip_search');
    if(skip_search != 'true'){
            $.getJSON('/cgi-bin/csa/guide_csa.py', 
                {
            act: 'stype_info', 
            stypeid: stypeid
        }, 
        function(data){
            if(data.msg.enable_search == 1){
                search_keyword=data.msg.typename;
                    update_paper_html('/guide.html');
                    select_kind(global_kind_id);
                    }
            else{
                show_stype_page(stypeid);
            }
                return;
                }
        );
        return;
        }

        show_stype_page(stypeid);
    return;
    }

    if(default_paperid) {update_paper_html("/res/guide/paper/" + default_paperid + ".html");}
}

function show_stype_page(stypeid){
    clear_cookie();
    set_login_status(true);
    if(!$.cookie("login_urs")){
        window.location = '/login.html?' + window.location.pathname + window.location.search;
        return;
    }
    else{
        update_paper_html('/res/i/' + stypeid + '.html');
        select_kind(global_kind_id);
    var title = $.query.get('title');
    if(title !== ''){
        $('#qtitle').val(decodeURIComponent(title));
        $('#qtitle').attr('readonly', true);
    }
    }
}


function set_question_navi_bar(lv1, lv2){
    $('#question_navi_bar').html('');
    if(lv1){
        $('#question_navi_bar').html('&nbsp;&gt;&nbsp;<a href="javascript:window.location=window.location.pathname+\'?kind_id='+lv1+'\'">' + $('#tree_'+lv1).attr('kname') + '</a>');
    }
    if(lv2){
        $('#question_navi_bar').append('&nbsp;&gt;&nbsp;<a href="javascript:window.location=window.location.pathname+\'?kind_id='+lv2+'\'">' +
                    $('#tree_'+lv2).attr('kname') + '</a>');
    }
}

var subselects = {};
function select_lv1(s1, s2){
    var s1_name = s1.name;
    if(!subselects[s1_name]){
        subselects[s1_name] = [];
        var raw_selects = document.getElementsByName(s2);
        for(var j = 0; j < raw_selects.length; j++){
            subselects[s1_name][j] = raw_selects[j];
    }
    }
    for(var i = 0; i < subselects[s1_name].length; i++){
        if(s1.selectedIndex == i){
            $(subselects[s1_name][i]).show();
            $(subselects[s1_name][i]).attr('name', s2);
        }
        else{
            $(subselects[s1_name][i]).hide();
            $(subselects[s1_name][i]).attr('name', '');
        }
    }
}

function new_time_to_second(obj){
    if (WdatePicker){
        new WdatePicker({el:obj, dateFmt:'yyyy-M-d HH:mm:ss'});
    }
}

function new_time_to_day(obj){
    if (WdatePicker){
        new WdatePicker({el:obj, dateFmt:'yyyy-M-d'});
    }
}

var g_time_internal = 5 * 60;

function display_info(showinfo)
{
    var info = $("#flow_egg_info");
    info.html(showinfo);
    info.show();

    var func = $("#flow_egg_func");
    func.hide();
}

function set_page_cookie(paper_id)
{
    var cookie_name = "c_feedback_" + paper_id;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    $.cookie(cookie_name, timestamp);
}

function check_cookie(paper_id)
{
    var cookie_name = "c_feedback_" + paper_id;
    var lasttime = $.cookie(cookie_name);
    if (lasttime)
    {
        var now = Date.parse(new Date());
        now = now / 1000;
        if ((now - lasttime) < g_time_internal)
        {
            display_info("谢谢您的反馈!");
        }
    }
}

function flower_page(e_value)
{
    $("#egg_input_div").hide();
    set_page_cookie($("#paper_id").val());

    display_info("正在提交...");
    $('#subform').ajaxSubmit({dataType:'json', 'success':function(data){
                $("#extra2").val('');
                $("#flower_input_div").hide();
                display_info("谢谢您的反馈!");
    }});
}

function egg_page(e_value)
{
    var extra = $("#extra").val();
    if (extra.length > 100){
        alert("您输入的内容超过了字数限制...#_#");
        return;
    }
    $("#egg_input_div").hide();
    set_page_cookie($("#paper_id").val());

    display_info("正在提交...");
    $('#subform').ajaxSubmit({dataType:'json', 'success':function(data){
                $("#extra").val('');
                $("#flower_input_div").hide();
                display_info("谢谢您的反馈!");
    }});
}
function evaluation_page()
{
    var i;
    var evaluation = document.getElementsByName("evaluation");
    var e_value = null;
    for (i=0; i<evaluation.length; i++){
        if (evaluation[i].checked) {e_value = evaluation[i].value;}
    }
    if (e_value == null){
        alert("请选择评价");
        return;
    }
    if (e_value == 1 || e_value == 3 || e_value == 6) {egg_page(e_value);}
    else {flower_page(e_value);}
}

function set_cookie(c_name, value, expiredays)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays==null) ? "" : ";expires="+exdate);
}

function submit_question_form(){
    disable_submit_button();
    $('#input_form').ajaxSubmit({dataType:'text', 'success':function(data){
    data = data.replace(/&lt;/g, '<').replace(/&gt;/g, '>'); // IE may escape the html tag
    data = $.parseJSON(data);
        if(data.result == 'success'){
        $('#error_msg').hide();
        enable_submit_button();
        var template_data = {
            urs: $.cookie("login_urs"),
            pname: d_product_name
        };
        if (!commonPopup("commitPop", "commit_pop_template", template_data)){
            alert('问题提交成功！');
            window.location = '/myquestions.html';
        }
        }
        else{
        enable_submit_button();
        $('#error_msg_content').html(data.msg);
        $('#error_msg').show();
        }
    }});
}

function guide_paper_toogle_list(){
    // needs two class for fold and unfold background color and color
    $(".action2").each(function(){
        $(this).addClass("fold");
        $(this).addClass("foldcl");
        });
    $(".action2").toggle(
        function(){
            $(this).next(".action3").slideDown();
            $(this).removeClass("fold");
            $(this).removeClass("foldcl");
            $(this).addClass("unfold");
            $(this).addClass("unfoldcl");
        },
        function(){
            $(this).next(".action3").slideUp();
            $(this).removeClass("unfold");
            $(this).removeClass("unfoldcl");
            $(this).addClass("fold");
            $(this).addClass("foldcl");
        });

    $(".action2").mouseover(
        function(){
            if($(this).hasClass("foldcl") && $(this).hasClass("fold")){
                $(this).removeClass("foldcl");
                $(this).addClass("unfoldcl");
            }
        });

    $(".action2").mouseout(
        function() {
            if(($(this).hasClass("unfoldcl") && $(this).hasClass("fold"))){
                $(this).removeClass("unfoldcl");
                $(this).addClass("foldcl");
                $(this).css({cursor:"hand"});
            }
        });
    var sub = parseInt($.query.get('sub'));
    if(!isNaN(sub) && sub <= $(".action2").size() && sub > 0){
        var unfold_div = $(".action2:eq(" + (sub-1) + ")");
        unfold_div.css({cursor:"hand"});
        unfold_div.addClass("unfold");
        unfold_div.addClass("unfoldcl");
        unfold_div.next(".action3").show();
        unfold_div.toggle(
            function(){
                $(this).next(".action3").slideUp();
                $(this).removeClass("unfold");
                $(this).removeClass("unfoldcl");
                $(this).addClass("fold");
                $(this).addClass("foldcl");
            },
            function(){
                $(this).next(".action3").slideDown();
                $(this).removeClass("fold");
                $(this).removeClass("foldcl");
                $(this).addClass("unfold");
                $(this).addClass("unfoldcl");
            });
    }
}

function set_item_list_fold_actions(){
    $("#itemList li.fold .title_bar").each(function(){
        $(this).hover(function(){
            $(this).parent().addClass("hover");
        },function(){
            $(this).parent().removeClass("hover");
        }).toggle(function(){
            $(this).parent().removeClass("fold");
            $(this).parent().addClass("unfold");
        },function(){
            $(this).parent().removeClass("unfold");
            $(this).parent().addClass("fold");
        });
    });
}

function set_tree_unfold_event(){
    $(".leftmenu li ul li").parent().prev("h3").addClass("leftnavig");
    $(".leftnavig a").attr("href", "#");
    $(".leftnavig").click(function() {
        if ($(this).parent().hasClass("on")) {return;}
        if ($(this).next("ul").css("display") == "none"){
            $(this).next("ul").show();
            $(this).css({backgroundPosition:"0 -195px"});
        }
        else {
            $(this).next("ul").hide();
            $(this).css({backgroundPosition:"0 0", fontWeight:"normal"});
        }
    });
}

function disable_submit_button(){
    $("#input_form .btn2").attr("disabled",true);
}

function enable_submit_button(){
    $("#input_form .btn2").attr("disabled",false);
}

function send_sprite_eval(product_name, question, answer, solved){
    $.ajax({
        url: "/cgi-bin/csa/csa_sprite.py",
        data: {
            act: "evaluation",
            product_name: product_name,
            question: question,
            answer: answer,
            solved: solved
        },
        type: "POST", 
        success: function(data){
        }
    });
}

function is_sprite_default_answer(answer, product_name){
    if (!product_name){
        return answer.indexOf("[默认答案]") >= 0;
    }
    if (product_name == "xyq"){
        return answer.indexOf("[默认答案]") >= 0;
    }
    if (product_name == "tx2"){
        return answer.indexOf("无法给您答案") >= 0;
    }
    if (product_name == "zhxf"){
        return answer.indexOf("[默认答案]") >= 0 || answer.indexOf("[默认回复]") >= 0;
    }
    if (product_name == "mibao"){
        return answer.indexOf("[默认答案]") >= 0;
    }
    if (product_name == "xy2"){
        return answer.indexOf("暂时无法给您答案") >= 0;
    }
    if (product_name == "wh"){
        return answer.indexOf("[默认回答]") >= 0;
    }
    if (product_name == "lj"){
        return answer.indexOf("&lt;默认回复&gt;") >= 0 || answer.indexOf("暂时无法给您答案") >= 0;
    }
    if (product_name == "dt2"){
        return answer.indexOf("&lt;默认回复&gt;") >= 0;
    }
    else{
        return answer.indexOf("[默认答案]") >= 0 || answer.indexOf("暂时无法给您答案") >= 0;
    }
}

function get_sprite_box_type(answer, product_name){
	if(product_name == 'xyq'){
		var match = answer.match(/^【(.*?)】/);
		if(match != null){
			return match[1];
		}
	}
	return null;
}


function get_sprite_question_prefix(product_name){
    var common_product_list = ["wh", "lj", "xy3", "x3"];
    if(product_name == "zh"){
        return 'kfzq ';
    }
    if ($.inArray(product_name, common_product_list) >= 0) {
        return 'KFZQ  ';
    }
    if ((typeof SPRITE_USE_KFZQ_PREFIX != "undefined") && SPRITE_USE_KFZQ_PREFIX) {
        return 'KFZQ ';
    }
    return '';
}

function is_sprite_overlong_question(question, product_name, max_length){
    if(max_length === undefined){
        max_length = 12;
    }
    return question.length > max_length;
}

function strip_sprite_default_answer(answer){
    if (answer.indexOf("[默认答案]") === 0) {return answer.substring("[默认答案]".length);}
    if (answer.indexOf("[默认回答]") === 0) {return answer.substring("[默认回答]".length);}
    if (answer.indexOf("<默认回复>") === 0) {return answer.substring("<默认回复>".length);}
    if (answer.indexOf("[默认回复]") === 0) {return answer.substring("[默认回复]".length);}
    if (answer.indexOf("&lt;默认回复&gt;") === 0) {return answer.substring("&lt;默认回复&gt;".length);}
    return answer;
}

/* 以下弹窗Javascript */
function commonPopup(popup_id, popup_template, data){
    var template;
    try{
        template = TrimPath.parseDOMTemplate(popup_template);
    }catch(err){
        return false;
    }
    $("body").append($(template.process(data)));
    var mypopup = $("#" + popup_id);
    cover.css("height",$(document).height());
    mypopup.css("left",($(window).width()-mypopup.width())/2);
    mypopup.css("top",($(window).height()-mypopup.height())/2+$(window).scrollTop());

    cover.show();
    mypopup.show();

    return true;
}

function commonHidePopup(popup_id){
    var mypopup = $("#" + popup_id);
    cover.hide();
    mypopup.remove();
}

function setPopupContent(){
    $("#popup_unread_msg").html($.cookie("new_msg"));
    $("#popup_new_reply").html($.cookie("reply_que"));
    if ($.cookie("new_msg") == "0") {$("#popup_msg").hide();}
    if ($.cookie("reply_que") == "0") {$("#popup_reply").hide();}

    // 显示最近消息列表
    var recent_msg = $.parseJSON($.cookie("recent_msg"));
    var template = TrimPath.parseDOMTemplate("message_list_brief_template");
    $("#message_list_brief").html(template.process({"recent_msg": recent_msg}));
}

function setPopupStyle(){
    cover.css("height",$(document).height());
    popup.css("left",($(window).width()-popup.width())/2);
    popup.css("top",($(window).height()-popup.height())/2+$(window).scrollTop());
}

function showPopup(){
    setPopupContent();
    setPopupStyle();
    cover.show();
    popup.show();
    $.cookie("show_popup",""); //reset cookie
    //$.cookie("recent_msg", ""); // clear recent messages
}

function hidePopup(){
    cover.hide();
    popup.hide();
}

function setPopup(){
    var is_vip = false;
    if($.cookie("login_urs") && $.cookie("show_popup") && ($.cookie("reply_que")>0 || $.cookie("new_msg")>0)){
        if (d_show_vip_urs){
            is_vip = isVipUser($.cookie("login_urs"));
            if (is_vip) {update_html("vip_popup", "/download/vip_popup.html");}
        }
        showPopup();
    }
    else if($.cookie("login_urs") && $.cookie("show_popup")){
        if (d_show_vip_urs){
            is_vip = isVipUser($.cookie("login_urs"));
            if (is_vip){
                update_html("vip_popup", "/download/vip_popup.html");
                showPopup();
            }
        }
    }
}

function isVipUser(urs){
    var is_vip = false;
    $.getJSON("/cgi-bin/csa/guide_csa.py",
        {
            act: "check_vip_urs",
            product: d_product_name,
            check_urs: urs
        },
        function(data){
            if (data["result"] != "success") {return;}
            is_vip = data["is_vip"];
        }
    );
    return is_vip;
}

// AskTips class
function AskTips(tips_id, target_id){
    this.shown = false;
    this.seleted = false;
    this.focus = false;
    this.tips_id = tips_id;
    this.target_id = target_id;
    this.cur_index = -1;
    this.count = 0;
    this.cur_ques = "";
    
    var _this = this;
    var init = function(){
        $("#" + target_id).focus(function(event){
            _this.target_focus = true;
        });
        $("#" + target_id).blur(function(event){
            _this.target_focus = false;
            setTimeout(function(){if (!_this.focus) {_this.hideTips();}}, 100);
        });

        $("#" + tips_id).hover(
            function(){
                _this.focus = true;
            },
            function(){
                _this.focus = false;
                if (!_this.target_focus) {_this.hideTips();}
            }
        );
    };
    init();
}

AskTips.prototype = {
    isFocus : function(){
        return this.focus;
    },
    isSeleted : function(){
        return this.seleted;
    },
    isShown : function(){
        return this.shown;
    },
    getData : function(ques){
        this.cur_ques = ques;
        this.reset();

        var res = inc_search(ques);
        if (res.length === 0){
            this.hideTips();
        }
        else{
            $("#" + this.tips_id + " ul").html("");
            for (var i in res){
                $("#" + this.tips_id + " ul").append("<li>" + res[i] + "</li>");
                this.count++;
            }
            // bind event
            var _this = this;
            $("#" + this.tips_id + " ul li").each(function(index){
                $(this).mouseover(function(){_this.hover(index);});
                $(this).mousemove(function(){_this.hover(index);});
                $(this).click(function(){_this.select(index);});
                _this.showTips();
            });
        }
    },
    down : function(){
        this.seleted = true;
        if (this.cur_index < 0){
            this.cur_index++;
        }
        else{
            $("#" + this.tips_id + " ul li").eq(this.cur_index).removeClass("on");
            this.cur_index = (this.cur_index + 1) % this.count;
        }
        $("#" + this.tips_id + " ul li").eq(this.cur_index).addClass("on");
        this.setScroll();
    },
    up : function(){
        this.seleted = true;
        if (this.cur_index < 0){
            this.cur_index = this.count - 1;
        }
        else{
            $("#" + this.tips_id + " ul li").eq(this.cur_index).removeClass("on");
            this.cur_index = (this.cur_index - 1 + this.count) % this.count;
        }
        $("#" + this.tips_id + " ul li").eq(this.cur_index).addClass("on");
        this.setScroll();
    },
    setScroll : function(){
        $("#" + this.tips_id)[0].scrollTop = (this.cur_index * $("#" + this.tips_id + " ul").height()/this.count);
    },
    hover : function(index){
        this.seleted = true;
        $("#" + this.tips_id + " ul li").eq(this.cur_index).removeClass("on");
        this.cur_index = index;
        $("#" + this.tips_id + " ul li").eq(this.cur_index).addClass("on");
    },
    select : function(index){
        if (index >= 0) {this.cur_index = index;}
        $("#" + this.target_id).val($("#" + this.tips_id + " ul li").eq(this.cur_index).html());
        this.hideTips();
    },
    hideTips : function(){
        this.shown = false;
        $("#" + this.tips_id).hide();
    },
    showTips : function(){
        this.shown = true;
        $("#" + this.tips_id).show();
    },
    reset : function(){
        this.cur_index = -1;
        this.count = 0;
        this.shown = false;
        this.seleted = false;
        this.focus = false;
        $("#" + this.tips_id)[0].scrollTop = 0;
        this.hideTips();
    }
};

function show_rate(rate){
    var result = '';
    for(var i=0; i < 5; i+=1){
        if(rate >= 1){
            result += '<span class="on" />';
            rate -= 2;
        }else{
            result += '<span />';
        }
    }
    return result;
}

function update_list_html(url){
    $.get(url, {}, function(return_html){
        var exp = /<!--real_content begin-->((.|\n|\r)*)<!--real_content end-->/gi;
        var res = exp.exec(return_html);
        $('#list_page').empty();
        $('#list_page').append(res[1]);
    });
}


function show_login(){
    alert("请登录专区后查询");
    window.location.href = "/login.html?" + window.location.pathname + window.location.search;
}

function check_input_and_set_tips(obj){
    $.ajaxSetup({async:true});
    if ($.inArray(obj.attr("type"), ["text", "textarea"]) >= 0){
        $.getJSON('/cgi-bin/csa/guide_csa.py',
            {
                act: 'check_input_field',
                stypeid: $('input[name="typeid"]').val(),
                name: obj.attr("name"),
                value: obj.val()
            },
            function(data){
                if(data["result"] != "success") {return;}
                if(!data["check_result"]){
                    if ($("#err_tips_" + obj.attr("name")).length > 0) {return;}
                    var pos=obj.offset();
                    setTimeout(function(){
                        var err_tips = $('<div class="userTip userTip-error" id="err_tips_' + obj.attr("name") + '"><div id="tiptext">输入有误</div><em></em></div>');
                        $("body").append(err_tips);
                        err_tips.show().css({"left":pos.left+266,"top":pos.top});
                    },120);
                }
        });
    }
}

function remark_check(obj){
    var remark = $(obj);
    var next = remark.next("span");
    if (!remark.attr("maxl") || !next.hasClass("textarea-words-tips")) {return;}
    var left_count = remark.attr("maxl") - remark.val().length;
    next.html(left_count);
}

function init_input_form(){
    $(".textarea-words-tips").each(function(index, ele){
        if ($(ele).prev("textarea").attr("name") != "remark") {$(ele).hide();}
    });
}

function set_tips_below(_obj){
    var parent_tr = _obj.parent().parent();
    var field_name = _obj.attr("usertip").substring('tip_container_'.length);
    var remark_pos = window["remark_pos_" + field_name];
    if (remark_pos == "1" && parent_tr.is("tr")){
        var user_tip = window['user_tip_' + field_name];
        var new_tr = $('<tr><td></td><td></td><td><div class="tip2"><i></i><p><span class="cRed"></span></p></div></td></tr>');
        new_tr.find("span").html(HTMLDecode(user_tip));
        parent_tr.after(new_tr);
    }
}

var mailList = ["163.com", "126.com", "yeah.net", "qq.com", "vip.qq.com", "sina.com", "hotmail.com"];


function init_sprite_hot(){
	var template = '{for list in hot_words} \
	<ul> \
		{for word in list} \
		<li><i>${parseInt(word_index) + 1}</i><a href="#">${word}</a></li> \
		{/for} \
	</ul> \
	{/for}';
	$('#js_hot').html(template.process({'hot_words': split_list(shuffle(HOT_QUESTIONS), 8)}));

	$('#js_key li a').click(function(){
		var question = $(this).text();
		reask(question);
		$.get("/cgi-bin/csa/make_log.py", {
			"log_type": "sprite_log",
			"log_str": "[" + d_product_name + "] " + "[key] " + "[" + question + "]"
		});

	});

	$('#js_hot li a').click(function(){
		var question = $(this).text();
		reask(question);
		$.get("/cgi-bin/csa/make_log.py", {
			"log_type": "sprite_log",
			"log_str": "[" + d_product_name + "] " + "[hot] " + "[" + question + "]"
		});

	});


	$('#fresh_hot').click(function(){
		$("#js_hot").animate({"left":-190},function(){
			$(this).css("left","0").children(":first").appendTo($(this));
		});
	});

	$('#fresh_key').click(function(){
		$("#js_key").animate({"left":-190},function(){
			$(this).css("left","0").children(":first").appendTo($(this));
		});
	});
}

function self_help_aclass_log_click(){
	$(".self_help_log_click").click(function(){
		self_help_log_click.call(this, this);
	});
}

function self_help_log_click(obj){
	// no log if no paper id
	if (!main_content_src) {
		return;
	}
	var re = /\/res\/guide\/paper\/[^\/]*\/(\d+).html/;
	var r = re.exec(main_content_src);
	var paper_id;
	if (r){
		paper_id = r[1];
	}else{
		paper_id = "";
		return
	}

	var href = $(obj).attr("href");

	$.get("/cgi-bin/csa/dispatch.py", {
		"type": "make_log",
		"action": "self_help_log_click",
		"href": href,
		"login_urs": $.cookie("login_urs"),
		"paper_id": paper_id
	});
}

function get_full_urs(){
	var login_urs = $.cookie("login_urs");
	if(!login_urs) return null;
	if(login_urs.indexOf('@') == -1){
		login_urs += '@163.com';
	}
	return login_urs;
}

function get_paper_id(main_content_src){
	var re = /\/res\/guide\/paper\/[^\/]*\/(\d+).html/;
	var r = re.exec(main_content_src);
	if (r){
		return r[1];
	}
	return "";
}

function show_qykf() {
   if ($.cookie('login_urs')) {
       ysf.config({'uid': $.cookie('login_urs')});
       ysf.open();
   } else {
       window.location.href = "/login.html?" + window.location.pathname + window.location.search;
   }
   return false;
}
