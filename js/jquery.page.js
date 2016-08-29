/**
@author 你猜猜看？
@function jquery 分页插件
@ 692690360@qq.com
@小胸弟别看了
@create 2016-5-13
**/
(function($){
	var ms = {
		init:function(obj,args){
			return (function(){
				args.pageCount = Math.ceil(args.totalMsg/args.pageSize);
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//填充html
		fillHtml:function(obj,args){
			return (function(){				 
				
				obj.empty();
				//上一页
				if(args.current > 1){
					obj.append('<a href="javascript:;" class="prevPage" id="btn_prevPage">上一页</a>');
				}else{
					obj.remove('.prevPage');
					obj.append('<span class="disabled">上一页</span>');
				}
				//中间页码
				if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
				}
				if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				var start = args.current -2,end = args.current+2;
				if((start > 1 && args.current < 4)||args.current == 1){
					end++;
				}
				if(args.current > args.pageCount-4 && args.current >= args.pageCount){
					start--;
				}
				for (;start <= end; start++) {
					if(start <= args.pageCount && start >= 1){
						if(start != args.current){
							obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
						}else{
							obj.append('<span class="current">'+ start +'</span>');
						}
					}
				}
				if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
				}
				//下一页
				if(args.current < args.pageCount){
					obj.append('<a href="javascript:;" class="nextPage" id="btn_nextPage" >下一页</a>');
				}else{
					obj.remove('.nextPage');
					obj.append('<span class="disabled">下一页</span>');
				}
				/*样式*/
				obj.css({padding:'0',textAlign: 'left',color: '#ccc;'});
				obj.find('a').css({display: 'inline-block',color:' #428bca',display:' inline-block',height:'25px',lineHeight: '25px',padding:'0 10px',border:'1px solid #ddd',	margin:'0 2px',borderRadius:'4px',verticalAlign:'middle'})
				obj.find('a').hover(function(){
					$(this).css({textDecoration: 'none',border:'1px solid #428bca'}).siblings('a').css({border:'1px solid #ddd'})
				},function(){
					$(this).css({border:'1px solid #ddd'})
				})	;
				obj.find('.current').css({display:'inline-block',height: '25px',lineHeight: '25px',padding: '0 10px',margin: '0 2px',color: '#fff',backgroundColor:'#428bca',border: '1px solid #428bca',borderRadius: '4px',verticalAlign: 'middle'});
				obj.find('.disabled').css({display:'inline-block',height: '25px',lineHeight: '25px',padding: '0 10px',margin: '0 2px',color: '#bfbfbf',backgroundColor: '#f2f2f2',border: '1px solid #bfbfbf',borderRadius: '4px',verticalAlign: 'middle'})
				
				
			})();
			
		},
		//绑定事件
		bindEvent:function(obj,args){
			return (function(){
				obj.off("click","a.tcdNumber");
				obj.off("click","a.prevPage");
				obj.off("click","a.nextPage");
				obj.on("click","a.tcdNumber",function(e){

					var current = parseInt($(this).text());
					ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current);
					}
				});
				//上一页
				obj.on("click","a.prevPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current-1);
					};
					if(typeof(args.prevback)=="function"){
					args.prevback(current-1);
					}
				});
				//下一页
				obj.on("click","a.nextPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current+1);
					}
					if(typeof(args.nextback)=="function"){
						args.nextback(current+1);
						}
				});
			})();
		}
	};

	$.fn.createPage = function(options){
		var args = $.extend({
			totalMsg:10,
			current : 1,
			pageSize:5,
			backFn : function(){}
			/*prevback : prevback,
			nextback : nextback*/
		},options);
		ms.init(this,args);
	}	
})(jQuery);
