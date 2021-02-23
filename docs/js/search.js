var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
};

Date.prototype.Format = function(fmt)   
{ 
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

$(document).ready(function () {
	var q = getUrlParameter("q");
	$(".search-keyword").text(q);
	$.ajax({
		url: '../index.xml',
		dataType: "xml",
		success: function (data) {
			$(data).find("item").each(function () {
				var item = $(this);
				var title = item.find("title").text();
				if (title.toLowerCase().indexOf(q.toLowerCase()) >= 0) {
					var url = item.find("relLink").text();
					var pubDate = new Date(item.find("pubDate").text()); 
					var searchItem = `<li><span class="date">` + pubDate.Format("yyyy/MM/dd") + `</span>`;
					searchItem += `<a href="` + url + `" class=\"search-result-title\">` + title + `</a></li>`;
					$(".search-result-list").append(searchItem);
				}
			});
		}
	});
});