function NoticiasDAO(connection){
	this._connection=connection;
}
NoticiasDAO.prototype.getNoticias=function ( callback){
	this._connection.query('select * from noticias order by data_criacao desc',callback);
}

NoticiasDAO.prototype.getNoticiasPNome=function (nome,callback){
	let busca='select *, (SELECT COUNT(noticia)from noticias where autor= "'+nome.autor+'")AS C FROM noticias WHERE autor="'+nome.autor+'"ORDER by data_criacao desc';
	this._connection.query(busca,callback);
}
NoticiasDAO.prototype.getNoticiasPData=function (nome,callback){
	this._connection.query('select * from noticias  where data_noticia= ? order by data_criacao desc',nome.data_noticia,callback);
}
NoticiasDAO.prototype.getNoticiasPNomePData=function (nome,callback){
	let busca = 'select * from noticias where data_noticia= "'+nome.data_noticia+'"  && autor = "'+nome.autor+'"  order by data_criacao desc';
	this._connection.query(busca,callback);
}
NoticiasDAO.prototype.getCountPNome=function (nome,callback){
	let busca = 'SELECT COUNT(noticia) AS C FROM noticias WHERE autor="'+nome.autor+'"';
	this._connection.query(busca,callback);
}


NoticiasDAO.prototype.getNoticia=function (id_noticia,callback){
	console.log(typeof(id_noticia.id_noticia));
	this._connection.query('select * from noticias where id= '+id_noticia.id_noticia,callback);
}

NoticiasDAO.prototype.salvarNoticia=function (noticia, callback){
	this._connection.query('insert into noticias set ? ', noticia, callback);
}

NoticiasDAO.prototype.get5UltimasNoticias=function ( callback){
	this._connection.query('select * from noticias order by data_criacao desc limit 5 ', callback);
}

module.exports=function(){

	
	return NoticiasDAO;
}