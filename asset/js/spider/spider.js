//自定义背景
$(function(){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	 
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	 
	context.fillStyle = "rgba(0, 0, 0, 0.08)";
	context.strokeStyle = "rgba(0, 0, 0, 0.05)";
	context.lineWidth = 0.5;

	// 存放所有圆的数组，这里用balls
	var balls = [];
	function createBall() {
	  // x坐标
	  var _x = Math.random() * canvas.width;
	  // y坐标
	  var _y = Math.random() * canvas.height;
	  // 半径 [0.01, 15.01]
	  var _r = Math.random() * 15 + 0.01;
	  // 水平速度 [±0.0, ±0.5]
	  var _vx = Math.random() * 0.5 * Math.pow( -1, Math.floor(Math.random() * 2 + 1) );
	  // 垂直速度 [±0.0, ±0.5]
	  var _vy = Math.random() * 0.5 * Math.pow( -1, Math.floor(Math.random() * 2 + 1) );
	  // 把每一个圆的信息存放到数组中
	  balls.push({
	    x: _x,
	    y: _y,
	    r: _r,
	    vx: _vx,
	    vy: _vy
	  });
	}

	// 圆的数量
	var num = 20;
	for(var i = 0; i < num; i++) {
	  createBall();
	}

	for(var k = 0; k < num; k++) {
	  context.save();
	  context.beginPath();
	  context.arc( balls[k].x, balls[k].y, balls[k].r, 0, Math.PI*2 );
	  context.fill();
	  context.restore();
	}

	for(var i = 0; i < num; i++) {
	  for(var j = i + 1; j < num; j++) {
	    if( distance( balls[i], balls[j] ) < 500 ) {
	      context.beginPath();
	      context.moveTo( balls[i].x, balls[i].y );
	      context.lineTo( balls[j].x, balls[j].y );
	      context.stroke();
	    }
	  }
	}

	function distance(point1, point2) {
  		return Math.sqrt( Math.pow( (point1.x - point2.x), 2 ) + Math.pow( (point1.y - point2.y), 2 ) );
	}

	for(var k = 0; k < num; k++) {
	  balls[k].x += balls[k].vx;
	  balls[k].y += balls[k].vy;
	 
	  if( balls[k].x - balls[k].r > canvas.width ) {
	    balls[k].x = 0 - balls[k].r;
	  }
	  if( balls[k].x + balls[k].r < 0 ) {
	    balls[k].x = canvas.width + balls[k].r;
	  }
	  if( balls[k].y - balls[k].r > canvas.height ) {
	    balls[k].y = 0 - balls[k].r;
	  }
	  if( balls[k].y + balls[k].r < 0 ) {
	    balls[k].y = canvas.height + balls[k].r;
	  }
	}

	(function loop(){
	  // render();
	  requestAnimationFrame(loop);
	})();

});