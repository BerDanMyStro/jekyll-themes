/*
 *  Project: Lőrém Ípszűm
 *  Description: jQuery plugin for generating multibyte utf8 lorem ipsums (Lőrém Ípszűm)
 *  Author: István Solymosi
 *  License: GNUv3
 *	Website: http://pistika.hu/
 *
 *  Copyright (C) 2013 István Solymosi
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

;(function ($, window, document, undefined) {

	/* deliberately not using strange tabbing / whitespacing */

	"use strict";
	
	var pluginName = "looreem",
		defaults = {
			"isHTML": false,
			"hasFont": false,
			"genType": "w",
			"langSel": arrayHU,
			"wC":50,
			"pC":0,
			"sPP":0,
			"wPPS":0,
			"lC":0,
			"wPLI":0
			};

	function looreem(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
		}

	looreem.prototype = {
		init: function () {
			$(this.element).html(this.generateLooreem());
			},
			
		getRandomInt: function (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			
		capitaliseFirstLetter: function (string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
			},
			
		getRandomWord: function() {
			return this.options.langSel[this.getRandomInt(0,this.options.langSel.length-1)];
			},
			
		generatesentence: function(wps) {
		
			var tmpSen="", tmpWors=[], i, punctuations=this.getRandomInt(0,100);
			
			for(i=0; i<wps; i++) {
				tmpWors.push(this.getRandomWord());
				}
				
			tmpSen = tmpWors.join(" ");
			tmpSen = this.capitaliseFirstLetter(tmpSen);
			
			if(punctuations<=5) { tmpSen+="?"; }
			else if(punctuations>=90) { tmpSen+="!"; }
			else { tmpSen+="."; }
			
			return tmpSen;
			
			},
			
		generateLooreem: function() {
		
			var finalLorem="";
			
			if(this.options.genType==="w") {
				var pref=(this.options.isHTML) ? (this.options.hasFont) ? "\n<p style='font-family:"+this.options.hasFont+";'>" : "\n<p>" : "",
					suff=(this.options.isHTML) ? "</p>" : "";
					
				finalLorem+=pref+this.generatesentence(this.options.wC)+suff;				
				}
				
			else if(this.options.genType==="p") {
			
				var j,
					pref=(this.options.isHTML) ? (this.options.hasFont) ? "\n<p style='font-family:"+this.options.hasFont+";'>" : "\n<p>" : "",
					suff=(this.options.isHTML) ? "</p>" : "";

			
				for(j=0; j<this.options.pC; j++) {
				
						var i;
						finalLorem+=pref;
						
						for(i=0; i<this.options.sPP; i++) {
							finalLorem+=this.generatesentence(this.options.wPPS);
							if(i<this.options.sPP-1) finalLorem+=" ";
							}
						
						finalLorem+=suff;
					}
				}

			else if(this.options.genType==="l") {
			
				var pref=(this.options.isHTML) ? (this.options.hasFont) ? "\n<ul style='font-family:"+this.options.hasFont+";'>\n" : "\n<ul>\n" : "\n",
					suff=(this.options.isHTML) ? "</ul>\n" : "",
					pref2=(this.options.isHTML) ? "\t<li>" : "* ",
					suff2=(this.options.isHTML) ? "</li>\n" : "\n";
					
					finalLorem+=pref;
					
					var i;
					for(i=0; i<this.options.lC; i++) {
						finalLorem+=pref2;
						finalLorem+=this.generatesentence(this.options.wPLI);
						finalLorem+=suff2;
						}
					
					finalLorem+=suff;

				}
				
			return finalLorem;
				
			}
		};

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new looreem(this, options));
				}
			});
		};

})(jQuery, window, document);