$(document).ready(function () {
	var postToc = $(".toc-article");
	if (postToc.length) {
		var leftPos = postToc.offset().left;
		var width = postToc.width()+30;
		if(leftPos>width){
			postToc.css({"margin-left":(0-width)})
		} else {
			postToc.css({"display":"none"})
		}
		
	}
})