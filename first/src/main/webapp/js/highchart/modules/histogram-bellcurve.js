/*
  Highcharts JS v6.1.1 (2018-06-27)

 (c) 2010-2017 Highsoft AS
 Author: Sebastian Domas

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?module.exports=d:d(Highcharts)})(function(d){var u=function(a){var d=a.each,f=a.Series,h=a.addEvent;return{init:function(){f.prototype.init.apply(this,arguments);this.initialised=!1;this.baseSeries=null;this.eventRemovers=[];this.addEvents()},setDerivedData:a.noop,setBaseSeries:function(){var k=this.chart,a=this.options.baseSeries;this.baseSeries=a&&(k.series[a]||k.get(a))||null},addEvents:function(){var a=this,e;e=h(this.chart,"afterLinkSeries",
function(){a.setBaseSeries();a.baseSeries&&!a.initialised&&(a.setDerivedData(),a.addBaseSeriesEvents(),a.initialised=!0)});this.eventRemovers.push(e)},addBaseSeriesEvents:function(){var a=this,e,d;e=h(a.baseSeries,"updatedData",function(){a.setDerivedData()});d=h(a.baseSeries,"destroy",function(){a.baseSeries=null;a.initialised=!1});a.eventRemovers.push(e,d)},destroy:function(){d(this.eventRemovers,function(a){a()});f.prototype.destroy.apply(this,arguments)}}}(d);(function(a,d){function f(a){return function(b){return Math.floor(b/
a)*a}}function h(a){return a}var k=a.each,e=a.objectEach,g=a.seriesType,m=a.correctFloat,n=a.isNumber,p=a.arrayMax,q=a.arrayMin;a=a.merge;var c={"square-root":function(a){return Math.round(Math.sqrt(a.options.data.length))},sturges:function(a){return Math.ceil(Math.log(a.options.data.length)*Math.LOG2E)},rice:function(a){return Math.ceil(2*Math.pow(a.options.data.length,1/3))}};g("histogram","column",{binsNumber:"square-root",binWidth:void 0,pointPadding:0,groupPadding:0,grouping:!1,pointPlacement:"between",
tooltip:{headerFormat:"",pointFormat:'\x3cspan style\x3d"font-size:10px"\x3e{point.x} - {point.x2}\x3c/span\x3e\x3cbr/\x3e\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name} \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e'}},a(d,{setDerivedData:function(){var a=this.derivedData(this.baseSeries.yData,this.binsNumber(),this.options.binWidth);this.setData(a,!1)},derivedData:function(a,l,c){var b=p(a),d=q(a),t={},g=[],r;r=(c=this.binWidth=n(c)?c:(b-d)/l)?f(c):h;for(l=r(d);l<=b;l=m(l+
(c||1)))t[m(r(l))]=0;k(a,function(a){a=m(r(a));t[a]++});e(t,function(a,b){g.push({x:Number(b),y:a,x2:m(Number(b)+c)})});g.sort(function(a,b){return a.x-b.x});return g},binsNumber:function(){var a=this.options.binsNumber,q=c[a]||"function"===typeof a&&a;return Math.ceil(q&&q(this.baseSeries)||(n(a)?a:c["square-root"](this.baseSeries)))}}))})(d,u);(function(a,d){function f(a){var c=a.length;a=p(a,function(a,c){return a+c},0);return 0<c&&a/c}function h(a,c){var b=a.length;c=m(c)?c:f(a);a=p(a,function(a,
b){b-=c;return a+b*b},0);return 1<b&&Math.sqrt(a/(b-1))}function k(a,c,b){a-=c;return Math.exp(-(a*a)/(2*b*b))/(b*Math.sqrt(2*Math.PI))}var e=a.seriesType,g=a.correctFloat,m=a.isNumber,n=a.merge,p=a.reduce;e("bellcurve","areaspline",{intervals:3,pointsInInterval:3,marker:{enabled:!1}},n(d,{setMean:function(){this.mean=g(f(this.baseSeries.yData))},setStandardDeviation:function(){this.standardDeviation=g(h(this.baseSeries.yData,this.mean))},setDerivedData:function(){1<this.baseSeries.yData.length&&
(this.setMean(),this.setStandardDeviation(),this.setData(this.derivedData(this.mean,this.standardDeviation),!1))},derivedData:function(a,c){var b=this.options.intervals,d=this.options.pointsInInterval,e=a-b*c,b=b*d*2+1,d=c/d,g=[],f;for(f=0;f<b;f++)g.push([e,k(e,a,c)]),e+=d;return g}}))})(d,u)});
