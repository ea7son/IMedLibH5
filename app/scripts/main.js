
var app=app||{};

(function($){
	if(!$)
		return;
	//cookie
	function getCookie(c_name)
	{
		if (document.cookie.length>0)
		{
			var c_start=document.cookie.indexOf(c_name + "=")
			if (c_start!=-1)
			{ 
				c_start=c_start + c_name.length+1 
				var c_end=document.cookie.indexOf(";",c_start)
				if (c_end==-1) c_end=document.cookie.length
					return unescape(document.cookie.substring(c_start,c_end))
			} 
		}
		return ""
	}
	function setCookie(c_name,value,expiredays, path, domain, secure)
	{
		var exdate=new Date()
		exdate.setDate(exdate.getDate()+expiredays)
		document.cookie=c_name+ "=" +escape(value)+
		((path==null)? "" :";path="+path)+
		((domain==null)?"":";domain="+domain)+
		((secure==null)?"":";secure="+secure)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
	}
	/* cookie **********************************************/
	app.cookie=app.cookie||{};

	app.cookie.set=function (key,value,expiredays){
		return setCookie(key,value,expiredays);
	};
	app.cookie.get=function(key){
		return getCookie(key);
	};
	/* config  **********************************************/
	app.config=app.config||{};
	app.config={
		wait:60,
		userdomain:'http://42.121.121.87:8002/',
		resourcedomain:'http://42.121.121.87:8003/'
	};
	/* user **********************************************/
	app.user=app.user||{};
	//手机号是否已注册
	app.user.mobileIsExist=function(mobile){
		return JSON.parse($.ajax({
			url: app.config.userdomain+'User/ExistMobile',
			dataType: 'json',
			data: {mobile:mobile},
			async:false,
			cache:false
		}).responseText).code==0;
	};
	//用户名是否已占用
	app.user.userNameIsExist=function(username){
		return JSON.parse($.ajax({
			url: app.config.userdomain+'User/ExistUserName/',
			dataType: 'json',
			data: {username:username},
			async:false,
			cache:false
		}).responseText).code==0;
	};
	//设置昵称
	app.user.setNickName=function(userid,token,nickname){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'User/NickName/',
			dataType:'json',
			type:'POST',
			async:false,
			cache:false,
			data:{
				key:userid,
				token:token,
				nickname:nickname
			}
		}).responseText).code==0;
	};
	//设置用户名
	app.user.setUserName=function(userid,token,username){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'User/UserName',
			type:'POST',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key:userid,
				token:token,
				UserName:username
			}
		}).responseText).code==0;
	};
	app.user.getUserInfo=function(userid,token){
		var data=JSON.parse($.ajax({
			url: app.config.userdomain+'User/Get/',
			dataType: 'json',
			data: {key: userid,token:encodeURI(token)},
			async:false,
			cache:false
		}).responseText);
		if(data.code==0&&data.get.length>0){
			return data.get;
		}
		return '';
	};
	//status 1待申请2失败3成功
	app.user.getUserRoles=function(userid,token){
		return JSON.parse($.ajax({
			url: app.config.userdomain+'Userrole/List/',
			dataType: 'json',
			data: {key: userid,token:token},
			async:false,
			cache:false
		}).responseText);
	};

	app.user.getRoles=function(){
		return JSON.parse($.ajax({
			url: app.config.userdomain+'Role/List/?offset=1&limit=100',
			dataType: 'json',
			async:false,
			cache:false
		}).responseText);
	};

	app.user.applyRole=function(userid,token,title,remark){
		return JSON.parse($.ajax({
			url: app.config.userdomain+'Group/Add/',
			type: 'POST',
			dataType: 'json',
			data: {
				key: userid,
				token:token,
				title:title,
				remark:remark
			},
			async:false,
			cache:false
		}).responseText);
	};
	app.user.teamIsExist=function(userid,token,gid,title){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Team/Get/',
			data:{
				Gid:gid,
				title:title,
				key:userid,
				token:token},
			dataType:'json',
			async:false,
			cache:false
			}).responseText);
	};
	app.user.createTeam=function(userid,token,gid,title){
		return JSON.parse(
			$.ajax({
				url:app.config.userdomain+'Team/Add',
				type:'POST',
				dataType:'json',
				async:false,
				cache:false,
				data:{
					key:userid,
					token:token,
					gid:gid,
					title:title
				}
			}).responseText);
	};
	app.user.editTeam=function(userid,token,tid,gid,title){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Team/Put',
			type:'POST',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key: userid,
				token:token,
				tid:tid,
				gid:gid,
				title:title
			}
		}).responseText);
	};
	app.user.removeTeam=function(userid,token,tid,gid){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Team/del',
			type:'json',
			async:false,
			cache:false,
			dataType:'json',
			type:'POST',
			data:{
				key: userid,
				token:token,
				tid:tid,
				gid:gid
			}
		}).responseText);
	};

	app.user.applyUserGroup=function(userid,token,tid,gid){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Usergroup/Apply/',
			type:'POST',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key: userid,
				token:token,
				tid:tid,
				gid:gid
			}
		}).responseText);
	};
	app.user.getUserGroupList=function(userid,token){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Usergroup/ListU',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key:userid,
				token:token
			}
		}).responseText);
	};

	app.user.getGroupUserList=function(userid,token){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Usergroup/ListG/',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key:userid,
				token:token,
				gid:gid
			}
		}).responseText);
	};

	app.user.removeUserGroup=function(userid,token,usergroupid,gid){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Usergroup/Del/',
			type:'POST',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key:userid,
				token:token,
				gid:gid,
				id:usergroupid
			}
		}).responseText);
	};
	
	//flag 1设置管理员0取消
	app.user.setAdmin=function(userid,token,gid,id,flag){
		return JSON.parse($.ajax({
			url:app.config.userdomain+'Usergroup/Admin/',
			type:'POST',
			dataType:'json',
			async:false,
			cache:false,
			data:{
				key:userid,
				token:token,
				id:id,
				gid:gid,
				admin:flag
			}
		}).responseText);
	};
	/* resource **********************************************/
	app.resource=app.resource||{};
	app.resource.list=function(){
		return JSON.parse($.ajax({
			url:app.config.resourcedomain+'Class/List/',
			dataType:'json',
			async:false,
			cache:false
		}).responseText);
	};
})(jQuery);
