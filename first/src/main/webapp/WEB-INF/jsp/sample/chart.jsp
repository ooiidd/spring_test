<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!-- Jquery -->
<link rel="stylesheet" type="text/css" href="<c:url value='/css/jquery/jquery.datetimepicker.css'/>"/>
<script src="<c:url value='/js/jquery/jquery.js'/>"></script>
<script src="<c:url value='/js/jquery/jquery.datetimepicker.full.min.js'/>"></script>

<script src="<c:url value='/common/common.js'/>"></script>

<!-- HighChart -->

<title>Chart</title>
</head>
<body>
	<div>
		<input id="startTime" type="text">
		<input id="endTime" type="text">
		<input type="button" id="btn">
	</div>
	<div id="chart_div">
		
	</div>
	<script type="text/javascript">
	jQuery('#startTime').datetimepicker();
	jQuery('#endTime').datetimepicker();
		$(document).ready(function(){
			$('#btn').on("click",function(e){
				fn_drawchart();
			});
		});
		function fn_drawchart(){
			var comAjax = new ComAjax();
			comAjax.setUrl("<c:url value='/chart/drawchart.do'/>");
			comAjax.setCallback("fn_chartCallback");
			
			var d = $('#startTime').datetimepicker('getValue');
			var temp = new Date();
			temp.setTime(d.getTime()-(d.getTimezoneOffset()*60*1000));
			comAjax.addParam("startTime",temp.toISOString().slice(0,19).replace('T',' '));
			
			var d = $('#endTime').datetimepicker('getValue');
			var temp = new Date();
			temp.setTime(d.getTime()-(d.getTimezoneOffset()*60*1000));
			comAjax.addParam("endTime",temp.toISOString().slice(0,19).replace('T',' '));
			
			comAjax.ajax();
		}
		function fn_chartCallback(data){
			console.log(JSON.stringify(data));
		}
	</script>
</body>
</html>