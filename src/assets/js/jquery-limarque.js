/*
 * jQuery liMarquee v 4.6
 *
 * Copyright 2013, Linnik Yura | LI MASS CODE | http://masscode.ru
 * http://masscode.ru/index.php/k2/item/44-limarquee
 * Free to use
 *
 * Last Update 20.11.2014
 */
(function ($) {
	var methods = {
		init: function (options) {
			var p = {
				direction: 'left', //Ð£ÐºÐ°Ð·Ñ‹Ð²Ð°ÐµÑ‚ Ð½Ð°Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¸Ðµ Ð´Ð²Ð¸Ð¶ÐµÐ½Ð¸Ñ ÑÐ¾Ð´ÐµÑ€Ð¶Ð¸Ð¼Ð¾Ð³Ð¾ ÐºÐ¾Ð½Ñ‚ÐµÐ¹Ð½ÐµÑ€Ð° (left | right | up | down)
				loop: -1, //Ð—Ð°Ð´Ð°ÐµÑ‚, ÑÐºÐ¾Ð»ÑŒÐºÐ¾ Ñ€Ð°Ð· Ð±ÑƒÐ´ÐµÑ‚ Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‡Ð¸Ð²Ð°Ñ‚ÑŒÑÑ ÑÐ¾Ð´ÐµÑ€Ð¶Ð¸Ð¼Ð¾Ðµ. "-1" Ð´Ð»Ñ Ð±ÐµÑÐºÐ¾Ð½ÐµÑ‡Ð½Ð¾Ð³Ð¾ Ð²Ð¾ÑÐ¿Ñ€Ð¾Ð¸Ð·Ð²ÐµÐ´ÐµÐ½Ð¸Ñ Ð´Ð²Ð¸Ð¶ÐµÐ½Ð¸Ñ
				scrolldelay: 0, //Ð’ÐµÐ»Ð¸Ñ‡Ð¸Ð½Ð° Ð·Ð°Ð´ÐµÑ€Ð¶ÐºÐ¸ Ð² Ð¼Ð¸Ð»Ð»Ð¸ÑÐµÐºÑƒÐ½Ð´Ð°Ñ… Ð¼ÐµÐ¶Ð´Ñƒ Ð´Ð²Ð¸Ð¶ÐµÐ½Ð¸ÑÐ¼Ð¸
				scrollamount: 50, //Ð¡ÐºÐ¾Ñ€Ð¾ÑÑ‚ÑŒ Ð´Ð²Ð¸Ð¶ÐµÐ½Ð¸Ñ ÐºÐ¾Ð½Ñ‚ÐµÐ½Ñ‚Ð° (px/sec)
				circular: true, //Ð•ÑÐ»Ð¸ "true" - ÑÑ‚Ñ€Ð¾ÐºÐ° Ð½ÐµÐ¿Ñ€ÐµÑ€Ñ‹Ð²Ð½Ð°Ñ 
				drag: true, //Ð•ÑÐ»Ð¸ "true" - Ð²ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¾ Ð¿ÐµÑ€ÐµÑ‚Ð°ÑÐºÐ¸Ð²Ð°Ð½Ð¸Ðµ ÑÑ‚Ñ€Ð¾ÐºÐ¸
				runshort: true, //Ð•ÑÐ»Ð¸ "true" - ÐºÐ¾Ñ€Ð¾Ñ‚ÐºÐ°Ñ ÑÑ‚Ñ€Ð¾ÐºÐ° Ñ‚Ð¾Ð¶Ðµ "Ð±ÐµÐ³Ð°ÐµÑ‚", "false" - ÑÑ‚Ð¾Ð¸Ñ‚ Ð½Ð° Ð¼ÐµÑÑ‚Ðµ
				hoverstop: true, //true - ÑÑ‚Ñ€Ð¾ÐºÐ° Ð¾ÑÑ‚Ð°Ð½Ð°Ð²Ð»Ð¸Ð²Ð°ÐµÑ‚ÑÑ Ð¿Ñ€Ð¸ Ð½Ð°Ð²ÐµÐ´ÐµÐ½Ð¸Ð¸ ÐºÑƒÑ€ÑÐ¾Ñ€Ð° Ð¼Ñ‹ÑˆÐ¸, false - ÑÑ‚Ñ€Ð¾ÐºÐ° Ð½Ðµ Ð¾ÑÑ‚Ð°Ð½Ð°Ð²Ð»Ð¸Ð²Ð°ÐµÑ‚ÑÑ
				inverthover: false, //false - ÑÑ‚Ð°Ð½Ð´Ð°Ñ€Ñ‚Ð½Ð¾Ðµ Ð¿Ð¾Ð²ÐµÐ´ÐµÐ½Ð¸Ðµ. Ð•ÑÐ»Ð¸ "true" - ÑÑ‚Ñ€Ð¾ÐºÐ° Ð½Ð°Ñ‡Ð¸Ð½Ð°ÐµÑ‚ Ð´Ð²Ð¸Ð¶ÐµÐ½Ð¸Ðµ Ñ‚Ð¾Ð»ÑŒÐºÐ¾ Ð¿Ñ€Ð¸ Ð½Ð°Ð²ÐµÐ´ÐµÐ½Ð¸Ð¸ ÐºÑƒÑ€ÑÐ¾Ñ€Ð°
				xml: false //ÐŸÑƒÑ‚ÑŒ Ðº xml Ñ„Ð°Ð¹Ð»Ñƒ Ñ Ð½ÑƒÐ¶Ð½Ñ‹Ð¼ Ñ‚ÐµÐºÑÑ‚Ð¾Ð¼
			};
			if (options) {
				$.extend(p, options);
			}

			return this.each(function () {
				var enterEvent = 'mouseenter';
				var leaveEvent = 'mouseleave';
				if(p.inverthover){
					enterEvent = 'mouseleave';
					leaveEvent = 'mouseenter';	
				}
				
								
				var
					loop = p.loop,
					strWrap = $(this).addClass('str_wrap').data({scrollamount:p.scrollamount}),
					fMove = false;
					
				
				
				var strWrapStyle = strWrap.attr('style'); 
				
				if(strWrapStyle){
					var wrapStyleArr = strWrapStyle.split(';');
					var startHeight = false;
					for(var i=0; i < wrapStyleArr.length; i++){
						var str = $.trim(wrapStyleArr[i]);					
						var tested =  str.search(/^height/g);
						if(tested != -1){
							startHeight = parseFloat(strWrap.css('height'));
						}
					}
				}

				var code = function () {
					
					strWrap.off('mouseleave');
					strWrap.off('mouseenter');
					strWrap.off('mousemove');
					strWrap.off('mousedown');
					strWrap.off('mouseup');

					
					if(!$('.str_move',strWrap).length){
						strWrap.wrapInner($('<div>').addClass('str_move'));
					}
					
					var
					strMove = $('.str_move', strWrap).addClass('str_origin'),
					strMoveClone = strMove.clone().removeClass('str_origin').addClass('str_move_clone'),
					time = 0;

					if (!p.hoverstop) {
						strWrap.addClass('noStop');
					}

					var circCloneHor = function(){
						strMoveClone.clone().css({
							left:'100%',
							right:'auto',							
							width: strMove.width()
						}).appendTo(strMove);
						strMoveClone.css({
							right: '100%',
							left:'auto',
							width: strMove.width()
						}).appendTo(strMove);
					}
					
					var circCloneVert = function(){
						strMoveClone.clone().css({
							top: '100%',
							bottom:'auto',
							height: strMove.height()
						}).appendTo(strMove);
						strMoveClone.css({
							bottom: '100%',
							top:'auto',
							height:strMove.height()
						}).appendTo(strMove);
					}
					
					
					
					if (p.direction == 'left') {
						strWrap.height(strMove.outerHeight())
						if (strMove.width() > strWrap.width()) {
							var leftPos = -strMove.width();
							
							if (p.circular) {
								
								if (!p.xml) {
									circCloneHor()
									leftPos = -(strMove.width() + (strMove.width() - strWrap.width()));
								}
							}
							if (p.xml) {
								strMove.css({
									left:strWrap.width()	
								})
							}
							var
							strMoveLeft = strWrap.width(),
								k1 = 0,
								timeFunc1 = function () {
									var
									fullS = Math.abs(leftPos),
										time = (fullS / strWrap.data('scrollamount')) * 1000;
									if (parseFloat(strMove.css('left')) != 0) {
										fullS = (fullS + strWrap.width());
										time = (fullS - (strWrap.width() - parseFloat(strMove.css('left')))) / strWrap.data('scrollamount') * 1000;
									}
									return time;
								},
								moveFuncId1 = false,
								moveFunc1 = function () {
									if (loop != 0) {
										strMove.stop(true).animate({
											left: leftPos
										}, timeFunc1(), 'linear', function () {
											$(this).css({
												left: strWrap.width()
											});
											if (loop == -1) {
												moveFuncId1 = setTimeout(moveFunc1, p.scrolldelay);
											} else {
												loop--;
												moveFuncId1 = setTimeout(moveFunc1, p.scrolldelay);
											}
										});
									}
								};
								strWrap.data({
									moveId: moveFuncId1	,
									moveF : moveFunc1
								})
								if(!p.inverthover){
									moveFunc1();
								}
							
							if (p.hoverstop) {
								strWrap.on(enterEvent, function () {
									$(this).addClass('str_active');
									clearTimeout(moveFuncId1);
									strMove.stop(true);
								}).on(leaveEvent, function () {
									$(this).removeClass('str_active');
									$(this).off('mousemove');
									moveFunc1();
								});

								if (p.drag) {
									strWrap.on('mousedown', function (e) {
										if(p.inverthover){
											strMove.stop(true);
										}
										//drag
										var dragLeft;
										var dir = 1;
										var newX;
										var oldX = e.clientX;
										//drag
										
										strMoveLeft = strMove.position().left;
										k1 = strMoveLeft - (e.clientX - strWrap.offset().left);
										
										
										
										$(this).on('mousemove', function (e) {
											fMove = true;
											
											//drag
											newX = e.clientX;
											if(newX > oldX){
												dir = 1
											}else{
												dir = -1
											}
											oldX = newX	
											dragLeft = k1 + (e.clientX - strWrap.offset().left);
											
											if (!p.circular) {
												if(dragLeft < -strMove.width() && dir < 0){
													dragLeft = strWrap.width();
													strMoveLeft = strMove.position().left;
													k1 = strMoveLeft - (e.clientX - strWrap.offset().left);
												}
												if(dragLeft > strWrap.width() && dir > 0){
													dragLeft = -strMove.width();
													strMoveLeft = strMove.position().left;
													k1 = strMoveLeft - (e.clientX - strWrap.offset().left);
												}
											}else{
												if(dragLeft < -strMove.width() && dir < 0){
													dragLeft = 0;
													strMoveLeft = strMove.position().left;
													k1 = strMoveLeft - (e.clientX - strWrap.offset().left);
												}
												if(dragLeft > 0 && dir > 0){
													dragLeft = -strMove.width();
													strMoveLeft = strMove.position().left;
													k1 = strMoveLeft - (e.clientX - strWrap.offset().left);
												}
	
											}
											
											
											strMove.stop(true).css({
												left: dragLeft
											});
											//drag
											
										
											
										}).on('mouseup', function () {
											$(this).off('mousemove');
											if(p.inverthover){
												strMove.trigger('mouseenter')
											}
											setTimeout(function () {                             
												fMove = false
											}, 50)
											
										});
										return false;
									})
									.on('click', function () {
										if (fMove) {
											return false
										}
									});
								} else {
									strWrap.addClass('no_drag');
								};
							}
						} else {
							if (p.runshort) {
								strMove.css({
									left: strWrap.width()
								});
								var
								strMoveLeft = strWrap.width(),
									k1 = 0,
									timeFunc = function () {
										time = (strMove.width() + strMove.position().left) / strWrap.data('scrollamount') * 1000;
										return time;
									};
								var moveFunc = function () {
									var leftPos = -strMove.width();
									strMove.animate({
										left: leftPos
									}, timeFunc(), 'linear', function () {
										$(this).css({
											left: strWrap.width()
										});
										if (loop == -1) {
											setTimeout(moveFunc, p.scrolldelay);
										} else {
											loop--;
											setTimeout(moveFunc, p.scrolldelay);
										}
									});
								};
								strWrap.data({
									moveF : moveFunc
								})
								if(!p.inverthover){
									moveFunc();
								}
								if (p.hoverstop) {
									strWrap.on(enterEvent, function () {
										$(this).addClass('str_active');
										strMove.stop(true);
									}).on(leaveEvent, function () {
										$(this).removeClass('str_active');
										$(this).off('mousemove');
										moveFunc();
									});

									if (p.drag) {
										strWrap.on('mousedown', function (e) {
											if(p.inverthover){
												strMove.stop(true);
											}
											
											//drag
											var dragLeft;
											var dir = 1;
											var newX;
											var oldX = e.clientX;
											//drag
											
											strMoveLeft = strMove.position().left;
											k1 = strMoveLeft - (e.clientX - strWrap.offset().left);
											$(this).on('mousemove', function (e) {
												fMove = true;
												
												
												//drag
												newX = e.clientX;
												if(newX > oldX){
													dir = 1
												}else{
													dir = -1
												}
												oldX = newX	
												dragLeft = k1 + (e.clientX - strWrap.offset().left);
												
												if(dragLeft < -strMove.width() && dir < 0){
													dragLeft = strWrap.width();
													strMoveLeft = strMove.position().left;
													k1 = strMoveLeft - (e.clientX - strWrap.offset().left);
												}
												if(dragLeft > strWrap.width() && dir > 0){
													dragLeft = -strMove.width();
													strMoveLeft = strMove.position().left;
													k1 = strMoveLeft - (e.clientX - strWrap.offset().left);
												}
												
												
												strMove.stop(true).css({
													left: dragLeft
												});
												
												
												
											}).on('mouseup', function () {
												if(p.inverthover){
													strMove.trigger('mouseenter')
												}
												$(this).off('mousemove');
												setTimeout(function () {                             
													fMove = false
												}, 50)
											});
											return false;
										})
										.on('click', function () {
											if (fMove) {
												return false
											}
										});
									} else {
										strWrap.addClass('no_drag');
									};
								}
							} else {
								strWrap.addClass('str_static');
							}
						};
					};
					if (p.direction == 'right') {
						strWrap.height(strMove.outerHeight())
						strWrap.addClass('str_right');
						strMove.css({
							left: -strMove.width(),
							right: 'auto'
						})
						
						if (strMove.width() > strWrap.width()) {
							var leftPos = strWrap.width();
							strMove.css({
								left: 0
							})
							if (p.circular) {
								if (!p.xml) {
									circCloneHor()
									//ÐžÐ¿Ñ€ÐµÐ´ÐµÐ»ÑÐµÐ¼ ÐºÑ€Ð°Ð¹Ð½ÑŽÑŽ Ñ‚Ð¾Ñ‡ÐºÑƒ
									leftPos = strMove.width();
								}
							}
							
							var
							k2 = 0;
							timeFunc = function () {
								var
								fullS = strWrap.width(), //ÐºÑ€Ð°Ð¹Ð½ÑÑ Ñ‚Ð¾Ñ‡ÐºÐ°
									time = (fullS / strWrap.data('scrollamount')) * 1000; //Ð²Ñ€ÐµÐ¼Ñ
								if (parseFloat(strMove.css('left')) != 0) {
									fullS = (strMove.width() + strWrap.width());
									time = (fullS - (strMove.width() + parseFloat(strMove.css('left')))) / strWrap.data('scrollamount') * 1000;
								}
								return time;
							};
							var moveFunc = function () {

								if (loop != 0) {
									strMove.animate({
										left: leftPos
									}, timeFunc(), 'linear', function () {
										$(this).css({
											left: -strMove.width()
										});
										if (loop == -1) {
											setTimeout(moveFunc, p.scrolldelay);
										} else {
											loop--;
											setTimeout(moveFunc, p.scrolldelay);
										};
									});
								};
							};
							strWrap.data({
								moveF : moveFunc
							})
					
							if(!p.inverthover){
								moveFunc();
							}
							if (p.hoverstop) {
								strWrap.on(enterEvent, function () {
									$(this).addClass('str_active');
									strMove.stop(true);
								}).on(leaveEvent, function () {
									$(this).removeClass('str_active');
									$(this).off('mousemove');
									moveFunc();
								});

								if (p.drag) {
									
									strWrap.on('mousedown', function (e) {
										if(p.inverthover){
											strMove.stop(true);
										}
										
										
										//drag
										var dragLeft;
										var dir = 1;
										var newX;
										var oldX = e.clientX;
										//drag
										
										strMoveLeft = strMove.position().left;
										k2 = strMoveLeft - (e.clientX - strWrap.offset().left);
										$(this).on('mousemove', function (e) {
											
											fMove = true;
											
											//drag
											newX = e.clientX;
											if(newX > oldX){
												dir = 1
											}else{
												dir = -1
											}
											oldX = newX	
											dragLeft = k2 + (e.clientX - strWrap.offset().left);


											if (!p.circular) {

												if(dragLeft < -strMove.width() && dir < 0){
													dragLeft = strWrap.width();
													strMoveLeft = strMove.position().left;
													k2 = strMoveLeft - (e.clientX - strWrap.offset().left);
												}
												if(dragLeft > strWrap.width() && dir > 0){
													dragLeft = -strMove.width();
													strMoveLeft = strMove.position().left;
													k2 = strMoveLeft - (e.clientX - strWrap.offset().left);
												}
											}else{
												if(dragLeft < -strMove.width() && dir < 0){
													dragLeft = 0;
													strMoveLeft = strMove.position().left;
													k2 = strMoveLeft - (e.clientX - strWrap.offset().left);
												}
												if(dragLeft > 0 && dir > 0){
													dragLeft = -strMove.width();
													strMoveLeft = strMove.position().left;
													k2 = strMoveLeft - (e.clientX - strWrap.offset().left);
												}
	
											}
											
											strMove.stop(true).css({
												left: dragLeft
											});
											

										}).on('mouseup', function () {
											if(p.inverthover){
												strMove.trigger('mouseenter')
											}
											$(this).off('mousemove');
											setTimeout(function () {                             
												fMove = false
											}, 50)
										});
										return false;
									})
									.on('click', function () {
										if (fMove) {
											return false
										}
									});
								} else {
									strWrap.addClass('no_drag');
								};
							}
						} else {
														
							if (p.runshort) {
								
								var k2 = 0;
								var timeFunc = function () {
									time = (strWrap.width() - strMove.position().left) / strWrap.data('scrollamount') * 1000;
									return time;
								};
								var moveFunc = function () {
									var leftPos = strWrap.width();
									strMove.animate({
										left: leftPos
									}, timeFunc(), 'linear', function () {
										$(this).css({
											left: -strMove.width()
										});
										if (loop == -1) {
											setTimeout(moveFunc, p.scrolldelay);
										} else {
											loop--;
											setTimeout(moveFunc, p.scrolldelay);
										};
									});
								};

								strWrap.data({
									moveF : moveFunc
								})

								if(!p.inverthover){
									moveFunc();
								}
								if (p.hoverstop) {
									strWrap.on(enterEvent, function () {
										$(this).addClass('str_active');
										strMove.stop(true);
									}).on(leaveEvent, function () {
										$(this).removeClass('str_active');
										$(this).off('mousemove');
										moveFunc();
									});

									if (p.drag) {
										strWrap.on('mousedown', function (e) {
											if(p.inverthover){
												strMove.stop(true);
											}
											
											//drag
											var dragLeft;
											var dir = 1;
											var newX;
											var oldX = e.clientX;
											//drag
											
											strMoveLeft = strMove.position().left;
											k2 = strMoveLeft - (e.clientX - strWrap.offset().left);
											$(this).on('mousemove', function (e) {
												fMove = true;
												
												
												
												//drag
												newX = e.clientX;
												if(newX > oldX){
													dir = 1
												}else{
													dir = -1
												}
												oldX = newX	
												dragLeft = k2 + (e.clientX - strWrap.offset().left);
												
												if(dragLeft < -strMove.width() && dir < 0){
													dragLeft = strWrap.width();
													strMoveLeft = strMove.position().left;
													k2 = strMoveLeft - (e.clientX - strWrap.offset().left);
												}
												if(dragLeft > strWrap.width() && dir > 0){
													dragLeft = -strMove.width();
													strMoveLeft = strMove.position().left;
													k2 = strMoveLeft - (e.clientX - strWrap.offset().left);
												}

												strMove.stop(true).css({
													left:dragLeft
												});
												
											}).on('mouseup', function () {
												if(p.inverthover){
													strMove.trigger('mouseenter')
												}
												$(this).off('mousemove');
												setTimeout(function () {                             
													fMove = false
												}, 50)
											});
											return false;
										})
										.on('click', function () {
											if (fMove) {
												return false
											}
										});
									} else {
										strWrap.addClass('no_drag');
									};
								}
							} else {
								strWrap.addClass('str_static');
							}
						};
					};
					if (p.direction == 'up') {
						strWrap.addClass('str_vertical');
						
						if (strMove.height() > strWrap.height()) {
							var topPos = -strMove.height();
							if (p.circular) {
								if (!p.xml) {
									circCloneVert();									
									topPos = -(strMove.height() + (strMove.height() - strWrap.height()));
								}
							}
							if (p.xml) {
								strMove.css({
									top:strWrap.height()	
								})
							}
							var
							k2 = 0;
							timeFunc = function () {
								var
								fullS = Math.abs(topPos),
									time = (fullS / strWrap.data('scrollamount')) * 1000;
								if (parseFloat(strMove.css('top')) != 0) {
									fullS = (fullS + strWrap.height());
									time = (fullS - (strWrap.height() - parseFloat(strMove.css('top')))) / strWrap.data('scrollamount') * 1000;
								}
								
								return time;
							};
							var moveFunc = function () {
								if (loop != 0) {
									strMove.animate({
										top: topPos
									}, timeFunc(), 'linear', function () {
										$(this).css({
											top: strWrap.height()
										});
										if (loop == -1) {
											setTimeout(moveFunc, p.scrolldelay);
										} else {
											loop--;
											setTimeout(moveFunc, p.scrolldelay);
										};
									});
								};
							};
							
							strWrap.data({
								moveF : moveFunc
							})
							
							if(!p.inverthover){
								moveFunc();
							}
							if (p.hoverstop) {
								strWrap.on(enterEvent, function () {
									$(this).addClass('str_active');
									strMove.stop(true);
								}).on(leaveEvent, function () {
									$(this).removeClass('str_active');
									$(this).off('mousemove');
									moveFunc();
								});

								if (p.drag) {
									strWrap.on('mousedown', function (e) {
										if(p.inverthover){
											strMove.stop(true);
										}
										
										//drag
										var dragTop;
										var dir = 1;
										var newY;
										var oldY = e.clientY;
										//drag
										
										
										strMoveTop = strMove.position().top;
										k2 = strMoveTop - (e.clientY - strWrap.offset().top);
										$(this).on('mousemove', function (e) {
											
											fMove = true;

											//drag
											newY = e.clientY;
											if(newY > oldY){
												dir = 1
											}else{
												if(newY < oldY){
													dir = -1
												}
											}
											oldY = newY	
											dragTop = k2 + e.clientY - strWrap.offset().top;


											if (!p.circular){
												if(dragTop < -strMove.height() && dir < 0){
													dragTop = strWrap.height();
													strMoveTop = strMove.position().top;
													k2 = strMoveTop - (e.clientY - strWrap.offset().top);
												}
												if(dragTop > strWrap.height() && dir > 0){
													dragTop = -strMove.height();
													strMoveTop = strMove.position().top;
													k2 = strMoveTop - (e.clientY - strWrap.offset().top);
												}	
											}else{
												if(dragTop < -strMove.height() && dir < 0){
													dragTop = 0;
													strMoveTop = strMove.position().top;
													k2 = strMoveTop - (e.clientY - strWrap.offset().top);
												}
												if(dragTop > 0 && dir > 0){
													dragTop = -strMove.height();
													strMoveTop = strMove.position().top;
													k2 = strMoveTop - (e.clientY - strWrap.offset().top);
												}
											}


											strMove.stop(true).css({
												top: dragTop
											});
											//drag
											
											
											
											
											
											
											
											
											
											
											
											
										}).on('mouseup', function () {
											if(p.inverthover){
												strMove.trigger('mouseenter')
											}
											$(this).off('mousemove');
											setTimeout(function () {                             
												fMove = false
											}, 50)
										});
										return false;
									})
									.on('click', function () {
										if (fMove) {
											return false
										}
									});
								} else {
									strWrap.addClass('no_drag');
								};
							}
						} else {
							if (p.runshort) {
								strMove.css({
									top: strWrap.height()
								});
								var k2 = 0;
								var timeFunc = function () {
									
									time = (strMove.height() + strMove.position().top) / strWrap.data('scrollamount') * 1000;
									
									return time;
								};
								var moveFunc = function () {
									var topPos = -strMove.height();
									strMove.animate({
										top: topPos
									}, timeFunc(), 'linear', function () {
										$(this).css({
											top: strWrap.height()
										});
										if (loop == -1) {
											setTimeout(moveFunc, p.scrolldelay);
										} else {
											loop--;
											setTimeout(moveFunc, p.scrolldelay);
										};
									});
								};
								strWrap.data({
									moveF : moveFunc
								})
								if(!p.inverthover){
									moveFunc();
								}
								if (p.hoverstop) {
									strWrap.on(enterEvent, function () {
										$(this).addClass('str_active');
										strMove.stop(true);
									}).on(leaveEvent, function () {
										$(this).removeClass('str_active');
										$(this).off('mousemove');
										moveFunc();
									});

									if (p.drag) {
										strWrap.on('mousedown', function (e) {
											if(p.inverthover){
												strMove.stop(true);
											}
											
											//drag
											var dragTop;
											var dir = 1;
											var newY;
											var oldY = e.clientY;
											//drag
											
											strMoveTop = strMove.position().top;
											k2 = strMoveTop - (e.clientY - strWrap.offset().top);
											$(this).on('mousemove', function (e) {
												
												
												fMove = true;

												//drag
												newY = e.clientY;
												if(newY > oldY){
													dir = 1
												}else{
													if(newY < oldY){
														dir = -1
													}
												}
												oldY = newY	
												dragTop = k2 + e.clientY - strWrap.offset().top;
												
												if(dragTop < -strMove.height() && dir < 0){
													dragTop = strWrap.height();
													strMoveTop = strMove.position().top;
													k2 = strMoveTop - (e.clientY - strWrap.offset().top);
												}
												if(dragTop > strWrap.height() && dir > 0){
													dragTop = -strMove.height();
													strMoveTop = strMove.position().top;
													k2 = strMoveTop - (e.clientY - strWrap.offset().top);
												}	
												//*drag
												
												strMove.stop(true).css({
													top: dragTop
												});
												
												
											}).on('mouseup', function () {
												if(p.inverthover){
													strMove.trigger('mouseenter')
												}
												$(this).off('mousemove');
												setTimeout(function () {                             
													fMove = false
												}, 50)
											});
											return false;
										})
										.on('click', function () {
											if (fMove) {
												return false
											}
										});
									} else {
										strWrap.addClass('no_drag');
									};
								}
							} else {
								strWrap.addClass('str_static');
							}
						};
					};
					if (p.direction == 'down') {

						strWrap.addClass('str_vertical').addClass('str_down');
						strMove.css({
							top: -strMove.height(),
							bottom: 'auto'
						})
						if (strMove.height() > strWrap.height()) {
							var topPos = strWrap.height();
							if (p.circular) {
								if (!p.xml) {
									circCloneVert();									
									topPos = strMove.height();
								}
							}
							if (p.xml) {
								strMove.css({
									top:-strMove.height()
								})
							}
							var
							k2 = 0;
							timeFunc = function () {
								var
								fullS = strWrap.height(), //ÐºÑ€Ð°Ð¹Ð½ÑÑ Ñ‚Ð¾Ñ‡ÐºÐ°
									time = (fullS / strWrap.data('scrollamount')) * 1000; //Ð²Ñ€ÐµÐ¼Ñ

								if (parseFloat(strMove.css('top')) != 0) {
									fullS = (strMove.height() + strWrap.height());
									time = (fullS - (strMove.height() + parseFloat(strMove.css('top')))) / strWrap.data('scrollamount') * 1000;
								}
								return time;
							};
							var moveFunc = function () {

								if (loop != 0) {
									strMove.animate({
										top: topPos
									}, timeFunc(), 'linear', function () {
										$(this).css({
											top: -strMove.height()
										});
										if (loop == -1) {

											setTimeout(moveFunc, p.scrolldelay);
										} else {
											loop--;
											setTimeout(moveFunc, p.scrolldelay);
										};
									});
								};
							};
							strWrap.data({
								moveF : moveFunc
							})
							if(!p.inverthover){
								moveFunc();
							}
							if (p.hoverstop) {
								strWrap.on(enterEvent, function () {
									$(this).addClass('str_active');
									strMove.stop(true);
								}).on(leaveEvent, function () {
									$(this).removeClass('str_active');
									$(this).off('mousemove');
									moveFunc();
								});

								if (p.drag) {
									strWrap.on('mousedown', function (e) {
										if(p.inverthover){
											strMove.stop(true);
										}
										
										//drag
										var dragTop;
										var dir = 1;
										var newY;
										var oldY = e.clientY;
										//drag
										
										
										strMoveTop = strMove.position().top;
										k2 = strMoveTop - (e.clientY - strWrap.offset().top);
										$(this).on('mousemove', function (e) {
											
											fMove = true;
											
											//drag
											newY = e.clientY;
											if(newY > oldY){
												dir = 1
											}else{
												if(newY < oldY){
													dir = -1
												}
											}
											oldY = newY	
											dragTop = k2 + e.clientY - strWrap.offset().top;


											if (!p.circular){
												if(dragTop < -strMove.height() && dir < 0){
													dragTop = strWrap.height();
													strMoveTop = strMove.position().top;
													k2 = strMoveTop - (e.clientY - strWrap.offset().top);
												}
												if(dragTop > strWrap.height() && dir > 0){
													dragTop = -strMove.height();
													strMoveTop = strMove.position().top;
													k2 = strMoveTop - (e.clientY - strWrap.offset().top);
												}	
											}else{
												if(dragTop < -strMove.height() && dir < 0){
													dragTop = 0;
													strMoveTop = strMove.position().top;
													k2 = strMoveTop - (e.clientY - strWrap.offset().top);
												}
												if(dragTop > 0 && dir > 0){
													dragTop = -strMove.height();
													strMoveTop = strMove.position().top;
													k2 = strMoveTop - (e.clientY - strWrap.offset().top);
												}
											}


											strMove.stop(true).css({
												top: dragTop
											});
											//drag



										}).on('mouseup', function () {
											if(p.inverthover){
												strMove.trigger('mouseenter')
											}
											$(this).off('mousemove');
											setTimeout(function () {                             
												fMove = false
											}, 50)
										});
										return false;
									})
									.on('click', function () {
										if (fMove) {
											return false
										}
									});
								} else {
									strWrap.addClass('no_drag');
								};
							}
						} else {
							if (p.runshort) {
								var k2 = 0;
								var timeFunc = function () {
									time = (strWrap.height() - strMove.position().top) / strWrap.data('scrollamount') * 1000;
									return time;
								};
								var moveFunc = function () {
									var topPos = strWrap.height();
									strMove.animate({
										top: topPos
									}, timeFunc(), 'linear', function () {
										$(this).css({
											top: -strMove.height()
										});
										if (loop == -1) {
											setTimeout(moveFunc, p.scrolldelay);
										} else {
											loop--;
											setTimeout(moveFunc, p.scrolldelay);
										};
									});
								};
								strWrap.data({
									moveF : moveFunc
								})
								if(!p.inverthover){
									moveFunc();
								}
								if (p.hoverstop) {
									strWrap.on(enterEvent, function () {
										$(this).addClass('str_active');
										strMove.stop(true);
									}).on(leaveEvent, function () {
										$(this).removeClass('str_active');
										$(this).off('mousemove');
										moveFunc();
									});

									if (p.drag) {
										strWrap.on('mousedown', function (e) {
											if(p.inverthover){
												strMove.stop(true);
											}
											
											//drag
											var dragTop;
											var dir = 1;
											var newY;
											var oldY = e.clientY;
											//drag
											
											strMoveTop = strMove.position().top;
											k2 = strMoveTop - (e.clientY - strWrap.offset().top);
											$(this).on('mousemove', function (e) {
												fMove = true;

												//drag
												newY = e.clientY;
												if(newY > oldY){
													dir = 1
												}else{
													if(newY < oldY){
														dir = -1
													}
												}
												oldY = newY	
												dragTop = k2 + e.clientY - strWrap.offset().top;
	
	
												if(dragTop < -strMove.height() && dir < 0){
													dragTop = strWrap.height();
													strMoveTop = strMove.position().top;
													k2 = strMoveTop - (e.clientY - strWrap.offset().top);
												}
												if(dragTop > strWrap.height() && dir > 0){
													dragTop = -strMove.height();
													strMoveTop = strMove.position().top;
													k2 = strMoveTop - (e.clientY - strWrap.offset().top);
												}	
												//*drag
												
												strMove.stop(true).css({
													top: dragTop
												});
												
												
												
												
												
												
												
												
											}).on('mouseup', function () {
												if(p.inverthover){
													strMove.trigger('mouseenter')
												}
												$(this).off('mousemove');
												setTimeout(function () {                             
													fMove = false
												}, 50)
											})
											return false;
										})
										.on('click', function () {
											if (fMove) {
												return false
											}
										});
									} else {
										strWrap.addClass('no_drag');
									};
								}
							} else {
								strWrap.addClass('str_static');
							}
						};
					};
					
					
					
					
				}
				if (p.xml) {
					$.ajax({
						url: p.xml,
						dataType: "xml",
						success: function (xml) {
							var xmlTextEl = $(xml).find('text');
							var xmlTextLength = xmlTextEl.length;
							for(var i = 0; i < xmlTextLength; i++){
								var xmlElActive = xmlTextEl.eq(i);
								var xmlElContent = xmlElActive.text();
								var xmlItemEl = $('<span>').text(xmlElContent).appendTo(strWrap);
								
								if(p.direction == 'left' || p.direction == 'right'){
									xmlItemEl.css({display:'inline-block',textAlign:'right'});	
									if(i > 0){
										xmlItemEl.css({width:strWrap.width()+xmlItemEl.width()});	
									}
								}
								if(p.direction == 'down' || p.direction == 'up'){
									xmlItemEl.css({display:'block',textAlign:'left'});	
										if(i > 0){
											xmlItemEl.css({paddingTop:strWrap.height()});
										}
								}
								
							}
							code();
						}
					});
				} else {
					code();
				}
				strWrap.data({
					ini:code,
					startheight: startHeight	
				})
				
				
				
				
			});
		},
		update: function () {
			var el = $(this);
			var str_origin = $('.str_origin',el);
			var str_move_clone = $('.str_move_clone',el);
			str_origin.stop(true);
			str_move_clone.remove();
			el.data('ini')();
		},
		destroy: function () {
			
			var el = $(this);
			var elMove = $('.str_move',el);
			var startHeight = el.data('startheight');
			
			$('.str_move_clone',el).remove();
			el.off('mouseenter');
			el.off('mousedown');
			el.off('mouseup');
			el.off('mouseleave');
			el.off('mousemove');
			el.removeClass('noStop').removeClass('str_vertical').removeClass('str_active').removeClass('no_drag').removeClass('str_static').removeClass('str_right').removeClass('str_down');
			
			var elStyle = el.attr('style'); 
			if(elStyle){
				var styleArr = elStyle.split(';');
				for(var i=0; i < styleArr.length; i++){
					var str = $.trim(styleArr[i]);
					var tested =  str.search(/^height/g);
					if(tested != -1){
						styleArr[i] = '';	
					}
				}
				var newArr = styleArr.join(';');
				var newStyle =  newArr.replace(/;+/g,';')
			
				if(newStyle == ';'){
					el.removeAttr('style');	
				}else{
					el.attr('style',newStyle);	
				}
				
				if(startHeight){
					el.css({height:startHeight})	
				}
			}
			elMove.stop(true);

			if(elMove.length){
				var context = elMove.html();
				elMove.remove();
				el.html(context);
			}
	
		},
		pause: function(){	
			var el = $(this);
			var elMove = $('.str_move',el);
			elMove.stop(true);
		}, 
		play: function(){
			var el = $(this);
			$(this).off('mousemove');
			el.data('moveF')();	
		}
		
	};
	$.fn.liMarquee = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('ÐœÐµÑ‚Ð¾Ð´ ' + method + ' Ð² jQuery.liMarquee Ð½Ðµ ÑÑƒÑ‰ÐµÑÑ‚Ð²ÑƒÐµÑ‚');
		}
	};
})(jQuery);