/*
 * jQuery addDot Plugin v1.0
 * 
 * Copyright 2012, DotDesign
 * Author: Nishant Joshi
 * Website: www.dotdesign.in
 * Email: info@dotdesign.in, dotdesign.in@gmail.com
 * 
 * Concept development started in January 2012
 *
 * v1.0.0 - 28th March 2012
 * First release
 *
 * v1.0.1 - 28th March 2012
 * Added feature to add button label instead of button icon. So user can add 
 * ("1, 2, 3...", "a, b, c...", "A, B, C...", "I, II, III...") instead of open hot spot icon.
 *
 * v1.0.2 - 5th April 2012
 * Functionality added to maintain z-index to avoid overlapping of hot spot labels.
 *
 * v1.0.3 - 12th April 2012
 * Added feature for open hot spot label direction. User can specify hot spot label open direction as either 
 * "Left to Right" or "Right to Left" horizontally 
 * and "Up" or "Down" vertically.
 *
 * v1.0.4 - 18th April 2012
 * Added feature for opening only one hot spot label at a time, previously opened hot spot will be hide.
 *
 * v1.0.5 - 2nd June 2012
 * Change HTML tag of Label Text from <p> to <div> so that user can add <hx>, <xl> etc tags in label.
 *
 * v1.0.6 - 6th June 2012
 * Fix the bug when user has specified width & height both. It was coming out of max allowed height.
 * Also hot spot box width is now calculated based on image width/height rather than container width/height. If user
 * wants it to set contaienr width/height as max allowed width/height just write...
 *
 * this.dotBoxWidth = this.$dotBox.outerWidth(true);
 * this.dotBoxHeight = this.$dotBox.outerHeight(true);
 */

(function($) {

    var AddDot = function(element, options){
		this.$dotBox = $(element);
        this.$dotBox.css('position','relative');
        this.$dotBox.attr('style','position:relative');
		
		this.dotBoxWidth = $('img',this.$dotBox).outerWidth(true);
		this.dotBoxHeight = $('img',this.$dotBox).outerHeight(true);
		
		//Find plug-in container children
        this.dotLen = this.$dotBox.children().length - 1;
		this.dotLen++;
		this.dotObjId = this.$dotBox.attr('id') + '_' + this.dotLen;
		this.$dotObj;
		this.$labelTxtObj;
		this.$showHideBtnObj;
		
		return this;
    };
	
	AddDot.prototype = {
        buildHotSpot: function(options) {
			//Defaults options		
			this.settings = $.extend({}, $.fn.addDot.defaults, options);
			var btnVal;
			
			var child = this.$dotBox;
			this.settings = $.extend({}, $.fn.addDot.defaults, options);
			
			if(this.settings.withinBoundary == true && this.settings.leftPos >= this.dotBoxWidth){
				this.settings.leftPos = this.dotBoxWidth - 150;
			}
			
			if(this.settings.withinBoundary == true && this.settings.topPos >= this.dotBoxHeight){
				this.settings.topPos = this.dotBoxHeight - 150;
			}
			
			if(this.settings.btnLabel != undefined){
				btnVal = this.settings.btnLabel;
			}else{
				btnVal = '';
			}
			
			child.append(
				$('<div class=defaultDot></div>').attr('id',this.dotObjId).css({ left:this.settings.leftPos, top:this.settings.topPos }).html("<div class=labelTxt>"+ this.settings.label +"</div><p class=showHideBtn>" + btnVal + "</p><p style='clear:both'></p>")
			);

			this.$dotObj = $('#'+this.dotObjId);
			this.$labelTxtObj = $('.labelTxt',this.$dotObj);
			this.$showHideBtnObj = $('.showHideBtn',this.$dotObj);
			this.btnHeight = this.$showHideBtnObj.outerHeight(true);
			
			// Maximum allowed height & width when dot is expanded
			this.maxAllowedWidth = this.dotBoxWidth - this.settings.leftPos - parseInt(this.$dotObj.css('margin-left'),10) - parseInt(this.$dotObj.css('margin-right'),10) -  parseInt(this.$dotObj.css('padding-left'),10) - parseInt(this.$dotObj.css('padding-right'),10) - parseInt(this.$dotObj.css('borderLeftWidth'),10) - parseInt(this.$dotObj.css('borderRightWidth'),10);

			this.maxAllowedHeight = this.dotBoxHeight - this.settings.topPos - parseInt(this.$dotObj.css('margin-top'),10) - parseInt(this.$dotObj.css('margin-bottom'),10) -  parseInt(this.$dotObj.css('padding-top'),10) - parseInt(this.$dotObj.css('padding-bottom'),10) - parseInt(this.$dotObj.css('borderTopWidth'),10) - parseInt(this.$dotObj.css('borderBottomWidth'),10);
			
			if(this.settings.boundaryPadding){
				this.maxAllowedWidth -= this.settings.boundaryPadding;
				this.maxAllowedHeight -= this.settings.boundaryPadding;
			}

			// Setting width of label field
			if(this.settings.width){
				this.$labelTxtObj.css('white-space','normal');
			}

			// Setting height of label field
			if(this.settings.height){
				this.$labelTxtObj.css('white-space','normal');
			}

			// Adding thumb image if defined
			if(this.settings.thumbImg != undefined){
				this.$labelTxtObj.prepend('<img src="'+this.settings.thumbImg+'"/>')
			}
			
			// Show on load & open/close functionality
			if(this.settings.showOnLoad){
				this.dotShowOnLoad(this);
			}else{
				this.dotHideOnLoad(this);
			}
			
        },
		hideDot: function() {
			var settings = this.settings;
			var $dotObj = this.$dotObj;
			var $labelTxtObj = this.$labelTxtObj;
			var $showHideBtnObj = this.$showHideBtnObj;
			var dotLeftPos;
			var dotTopPos;	
			var tmpLeftPos;
			var tmpTopPos;		
			
			var btnWidth = $showHideBtnObj.outerWidth(true);
			var dotExpandWidth = $labelTxtObj.outerWidth(true) + btnWidth + 'px';
			var btnHeight = ($labelTxtObj.outerHeight(true) > $showHideBtnObj.outerHeight(true)) ? $labelTxtObj.outerHeight(true) : $showHideBtnObj.outerHeight(true);
			
			if(settings.openDirectionH.toLowerCase()=='rtl'){
				tmpLeftPos = settings.leftPos;
				dotLeftPos = parseInt($dotObj.css('left'),10) + parseInt(dotExpandWidth,10) - $showHideBtnObj.width();
				if(dotLeftPos != tmpLeftPos){
					dotLeftPos = tmpLeftPos;
				}
			}else{
				dotLeftPos = parseInt($dotObj.css('left'),10);
			}
			
			if(settings.openDirectionV.toLowerCase()=='up'){
				tmpTopPos = settings.topPos;
				dotTopPos = parseInt($dotObj.css('top'),10) + parseInt(btnHeight,10) - $showHideBtnObj.height();
				if(dotTopPos != tmpTopPos){
					dotTopPos = tmpTopPos;
				}
			}else{
				dotTopPos = parseInt($dotObj.css('top'),10);
			}			
			
			if(settings.aniType.toLowerCase()=='slide'){

				$labelTxtObj.animate({ opacity: 0 }, settings.aniSpeed * 1000);
					
				$dotObj.addClass('animated').animate({ left:dotLeftPos, top:dotTopPos, width: $showHideBtnObj.width(), height:$showHideBtnObj.height() , opacity: 1 }, settings.aniSpeed * 1000, function() {
					$labelTxtObj.css('display','none');
					$dotObj.removeClass('animated').dequeue();
					$dotObj.removeClass('showonload');
					
					//Setting z-index to make hot spot on top
					$dotObj.css('zIndex',1);					
				});
				
			}else{
				$labelTxtObj.hide();
				$dotObj.css({ left:dotLeftPos, top:dotTopPos, width: $showHideBtnObj.width(), height:$showHideBtnObj.height()});
			}

			$showHideBtnObj.removeClass('hideBtn')
		},
		showDot: function() {
			var settings = this.settings;
			var $dotObj = this.$dotObj;
			var $labelTxtObj = this.$labelTxtObj;
			var $showHideBtnObj = this.$showHideBtnObj;
			var dotLeftPos;
			var dotTopPos;
			
			var btnWidth = $showHideBtnObj.outerWidth(true);
			var dotExpandWidth = $labelTxtObj.outerWidth(true) + btnWidth + 'px';				
			var btnHeight = ($labelTxtObj.outerHeight(true) > $showHideBtnObj.outerHeight(true)) ? $labelTxtObj.outerHeight(true) : $showHideBtnObj.outerHeight(true);
			var $hotSpotContainer = $($dotObj).parent();
			
			//Setting z-index to make hot spot on top
			var highestZIndex = 0;   
			
			$('div',$hotSpotContainer).each(function() {
				
				var currentZIndex = parseInt($(this).css('zIndex'), 10);
				if(currentZIndex > highestZIndex) {
					highestZIndex = currentZIndex;
				}
				
				if(settings.showOnlyOne){
					if($('p:nth-child(2)',this).attr('class') == 'showHideBtn hideBtn'){
						
						if($(this).hasClass('rtl')){
							tmpLeftPos = parseInt($(this).css('left'),10);
							dotLeftPos = tmpLeftPos + parseInt($('.labelTxt',this).outerWidth(true),10);
						}
						
						if($(this).hasClass('up')){
							tmpTopPos = parseInt($(this).css('top'),10);
							dotTopPos = tmpTopPos + parseInt($('.labelTxt',this).outerHeight(true),10) - $showHideBtnObj.outerHeight(true);
						}
						
						if(settings.aniType=='slide'){
							$('.labelTxt',this).animate({ opacity: 0 }, settings.aniSpeed * 1000);
							$(this).animate({ left: dotLeftPos, top:dotTopPos, width: $showHideBtnObj.width(), height:$showHideBtnObj.height()},function(){$('.labelTxt',this).hide();});
						}else{
							$(this).css({ left: dotLeftPos, top:dotTopPos, width: $showHideBtnObj.width(), height:$showHideBtnObj.height()});
							$('.labelTxt',this).hide();
						}
						$('p:nth-child(2)',this).removeClass('hideBtn');
					}
				}
				
			});
			
			$dotObj.css('zIndex',highestZIndex + 1);
			
			if(settings.openDirectionH.toLowerCase()=='rtl'){
				dotLeftPos = settings.leftPos - parseInt(dotExpandWidth,10) + $showHideBtnObj.width();
				$dotObj.addClass('rtl');
			}else{
				dotLeftPos = settings.leftPos;
			}
			
			if(settings.openDirectionV.toLowerCase()=='up'){
				dotTopPos = settings.topPos - parseInt(btnHeight,10) + $showHideBtnObj.width();
				$dotObj.addClass('up')
			}else{
				dotTopPos = settings.topPos;
			}
			
			if(settings.aniType.toLowerCase()=='slide'){
				if (!$dotObj.hasClass('animated')) {
					$labelTxtObj.css({display:'inline-block', opacity: 0});
					$labelTxtObj.dequeue().stop().animate({ opacity: 1 }, settings.aniSpeed * 1000);
					$dotObj.dequeue().stop().animate({left: dotLeftPos, top:dotTopPos, width: dotExpandWidth, opacity: 1, height:btnHeight}, settings.aniSpeed * 1000)					
				}
			}else{
				$labelTxtObj.show();										
				$dotObj.css({left: dotLeftPos, top:dotTopPos, width: dotExpandWidth, height:btnHeight}, settings.aniSpeed * 1000)
			}

			$showHideBtnObj.addClass('hideBtn')
		},
		setWidthHeight: function() {
			var settings = this.settings;
			var $dotObj = this.$dotObj;
			var $labelTxtObj = this.$labelTxtObj;
			var $showHideBtnObj = this.$showHideBtnObj;
			var maxAllowedWidth = this.maxAllowedWidth;
			var maxAllowedHeight = this.maxAllowedHeight;
			
			var btnWidth = $showHideBtnObj.outerWidth(true);
			var btnHeight = $showHideBtnObj.outerHeight(true);
			
			var dotExpandWidth = $labelTxtObj.outerWidth(true) + btnWidth + 'px';
			var dotExpandHeight = $labelTxtObj.outerHeight(true) + btnHeight + 'px';
			
			btnHeight = ($labelTxtObj.outerHeight(true) > $showHideBtnObj.outerHeight(true)) ? $labelTxtObj.outerHeight(true) : $showHideBtnObj.outerHeight(true);
			
			var txtHPaddingVal = parseInt($labelTxtObj.css('padding-left'),10) + parseInt($labelTxtObj.css('padding-right'),10) + parseInt($labelTxtObj.css('margin-left'),10) + parseInt($labelTxtObj.css('margin-right'),10) + parseInt($labelTxtObj.css('borderLeftWidth'),10) + parseInt($labelTxtObj.css('borderRightWidth'),10) + $showHideBtnObj.width();
			
			var txtVPaddingVal = parseInt($labelTxtObj.css('padding-top'),10) + parseInt($labelTxtObj.css('padding-bottom'),10) + parseInt($labelTxtObj.css('margin-top'),10) + parseInt($labelTxtObj.css('margin-bottom'),10) + parseInt($labelTxtObj.css('borderTopWidth'),10) + parseInt($labelTxtObj.css('borderBottomWidth'),10);
			
			if(settings.width == undefined && settings.height == undefined){
				if(parseInt(dotExpandWidth,10) > maxAllowedWidth){
					$labelTxtObj.css('white-space','normal');
					$labelTxtObj.css('width',maxAllowedWidth - txtHPaddingVal);
					$dotObj.css('width',maxAllowedWidth);
				}else{
					$dotObj.css('width',dotExpandWidth);
				}

				dotExpandHeight = $labelTxtObj.outerHeight(true) + 'px';

				if(parseInt(dotExpandHeight,10) > maxAllowedHeight){
					$labelTxtObj.css('height',maxAllowedHeight - txtVPaddingVal);
					$dotObj.css('height',maxAllowedHeight);
				}else{
					$dotObj.css('height',dotExpandHeight);
				}

			}else if(settings.width > 0 && settings.height == undefined){
				if(settings.width > maxAllowedWidth){
					$labelTxtObj.css('white-space','normal');
					$labelTxtObj.css('width',maxAllowedWidth - txtHPaddingVal);
					$dotObj.css('width',maxAllowedWidth);
				}else{
					$labelTxtObj.css('width',settings.width - txtHPaddingVal);
					$dotObj.css('width',settings.width);
				}
				
				dotExpandHeight = $labelTxtObj.outerHeight(true) + 'px';
				
				if(settings.showOnLoad){
					if(settings.thumbImg != undefined){
						$('.labelTxt img').load(function(){
							dotExpandHeight = $labelTxtObj.outerHeight(true) + 'px';
							$dotObj.css('height',dotExpandHeight);

							if(parseInt(dotExpandHeight,10) > maxAllowedHeight){
								$labelTxtObj.css('height',maxAllowedHeight - txtVPaddingVal);
								$dotObj.css('height',maxAllowedHeight);
							}else{
								$dotObj.css('height',dotExpandHeight);
							}
						})
					}else{					
						if(parseInt(dotExpandHeight,10) > maxAllowedHeight){
							$labelTxtObj.css('height',maxAllowedHeight - txtVPaddingVal);
							$dotObj.css('height',maxAllowedHeight);
						}else{
							$dotObj.css('height',dotExpandHeight);
						}
					}
				}else{
					if(parseInt(dotExpandHeight,10) > maxAllowedHeight){
						$labelTxtObj.css('height',maxAllowedHeight - txtVPaddingVal)
					}
				}
			}else if(settings.width == undefined && settings.height > 0){
				if(parseInt(dotExpandWidth,10) > maxAllowedWidth){
					$labelTxtObj.css('white-space','normal');
					$labelTxtObj.css('width',maxAllowedWidth - txtHPaddingVal);
					$dotObj.css('width',maxAllowedWidth);
				}else{
					$labelTxtObj.css('white-space','nowrap');

					if($labelTxtObj.outerWidth(true) + btnWidth > parseInt(dotExpandWidth,10)){
						$labelTxtObj.css('white-space','normal');
						$labelTxtObj.css('width',maxAllowedWidth - txtHPaddingVal);
						$dotObj.css('width',maxAllowedWidth);
						$labelTxtObj.css('height',settings.height);													
					}else{
						$labelTxtObj.css('white-space','nowrap');
						$dotObj.css('width',$labelTxtObj.outerWidth(true) + btnWidth);
					}
				}

				if(settings.height > maxAllowedHeight){
					$labelTxtObj.css('height',maxAllowedHeight - txtVPaddingVal);
					$dotObj.css('height',maxAllowedHeight);
				}else{
					$dotObj.css('height',settings.height);
				}

			}else{					
				if(settings.width > maxAllowedWidth){
					$labelTxtObj.css('white-space','normal');
					$labelTxtObj.css('width',maxAllowedWidth - txtHPaddingVal);
					$dotObj.css('width',maxAllowedWidth);
				}else{
					$labelTxtObj.css('width',settings.width - txtHPaddingVal);
					$dotObj.css('width',settings.width);
				}
				
				if(settings.height > maxAllowedHeight){						
					
					$labelTxtObj.css('height',maxAllowedHeight - txtVPaddingVal)
					$dotObj.css('height',maxAllowedHeight);
				}else{
					$labelTxtObj.css('white-space','normal');
					$dotObj.css('height',settings.height);
					$labelTxtObj.css('height',settings.height);
				}					
			}

			if(settings.showOnLoad == false){
				$dotObj.css({'width':$showHideBtnObj.width(), 'height':$showHideBtnObj.height()});
			}else{
				btnWidth = $showHideBtnObj.outerWidth(true);
				dotExpandWidth = $labelTxtObj.outerWidth(true) + btnWidth + 'px';				
				btnHeight = ($labelTxtObj.outerHeight(true) > $showHideBtnObj.outerHeight(true)) ? $labelTxtObj.outerHeight(true) : $showHideBtnObj.outerHeight(true);
				
				if(settings.openDirectionH.toLowerCase()=='rtl'){
					$dotObj.css('left',parseInt($dotObj.css('left'),10) - parseInt(dotExpandWidth,10));			
				}
				
				if(settings.openDirectionV.toLowerCase()=='up'){
					$dotObj.css('top',parseInt($dotObj.css('top'),10) - parseInt(btnHeight,10));
				}
			}
		},
		dotShowOnLoad: function(that) {	
			var settings = this.settings;
			var $dotObj = this.$dotObj;
			var $labelTxtObj = this.$labelTxtObj;
			var $showHideBtnObj = this.$showHideBtnObj;
			
			$labelTxtObj.css('display','inline-block');
			$showHideBtnObj.addClass('hideBtn');

			this.setWidthHeight();

			if(settings.eventType.toLowerCase() == 'hover'){
				$dotObj.addClass('showonload');
				$dotObj.hover(function(){						
					var $this = $(this);
					if (!$this.hasClass('animated') && !$this.hasClass('showonload')){
						that.showDot()
					}
				}, function() {
					that.hideDot();						
				});

				$dotObj.delegate('.hideBtn', 'click', function() {
					that.hideDot();
				});
			}else if(settings.eventType.toLowerCase() == 'click'){
				$showHideBtnObj.click(function() {
					if($showHideBtnObj.attr('class') == 'showHideBtn')
						that.showDot();
					else
						that.hideDot();
				})
			}	
		},
		dotHideOnLoad: function(that) {
			var settings = this.settings;
			var $dotObj = this.$dotObj;
			var $labelTxtObj = this.$labelTxtObj;
			var $showHideBtnObj = this.$showHideBtnObj;
			
			$labelTxtObj.css('display','none');
			
			this.setWidthHeight();

			if(settings.eventType.toLowerCase() == 'hover'){
				$dotObj.hover(function(){
					if (!$(this).hasClass('animated')) {
						that.showDot();
					}
				}, function(){
					that.hideDot()						
				});

				$dotObj.delegate('.hideBtn', 'click', function() {
					that.hideDot();
				});
			}else if(settings.eventType.toLowerCase() == 'click'){
				$showHideBtnObj.click(function() {
					if($showHideBtnObj.attr('class') == 'showHideBtn')
						that.showDot();
					else
						that.hideDot();
				})
			}
		}
	}
	
	$.fn.addDot = function(options) {

        return this.each(function(key, value){
            var element = $(this);

			// Pass options to plugin constructor
            var addDot = new AddDot(this, options);
			addDot.buildHotSpot(options);
			
			// Store plugin object in this element's data
            element.data('addDot', addDot);
			
        });
	};

	//Default settings
	$.fn.addDot.defaults = {
		leftPos: 0,
		topPos: 0,
		label: 'Label Text',
		showOnLoad: false,
		showOnlyOne: false,
		aniSpeed: 1,
		aniType: 'none',
		boundaryPadding: 0,
		withinBoundary: false,
		eventType: 'click',
		openDirectionH: 'ltr',
		openDirectionV: 'down'
	};

	$.fn._reverse = [].reverse;

})(jQuery);