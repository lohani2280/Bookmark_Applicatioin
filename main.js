document.getElementById('myForm').addEventListener('submit',savebookmark);

function savebookmark(e) {
	var site_name = document.getElementById('siteName').value;
	var site_url = document.getElementById('siteUrl').value;
	var bookmarkId = chance.guid();

	if(!validateForm(site_name,site_url)){
		return false;
	}

	var bookmark = {
		id: bookmarkId,
		name: site_name,
		url: site_url
	}

	if(localStorage.getItem('bookmarks') == null){
		var bookmarks = [];
		bookmarks.push(bookmark);
		// bookmarks is actually a JSON array.We need to save it as string. So we wrap it in a function called JSON.stringify
		// JSON.stringify() will turn a JSON into string
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));		
	}
	else{
		// localStorage.getItem('bookmarks') returns a string. JSON.parse() will turn a string into JSON.
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	// clear the form after it is submitted
	document.getElementById('myForm').reset(); 
	fetchBookmark();
	// prevents the form from submitting
	e.preventDefault();	

}

function deleteBookmark(url) {
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	for(var i=0 ; i<bookmarks.length ; i++){
		if(bookmarks[i].url == url){
			bookmarks.splice(i,1);
		}
	}
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	fetchBookmark();

}

function fetchBookmark(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	var bookmarklist = document.getElementById('bookmarklist');
	bookmarklist.innerHTML = '';
	for (var i=0; i<bookmarks.length; i++){
		var id = bookmarks[i].id;
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
	

		bookmarklist.innerHTML += '<div class="jumbotron">' + 
						'<h6> BookmarkID: ' + id + '</h6>'+
						'<p><span class="label label-info">' + status + '</span></p>' +
						'<h3>' + name + '</h3>' +
						'<p><span class="glyphicon glyphicon-time"></span>' + url + '</p>' +
						'<a href="'+url+'" class="btn btn-default" target="_blank">Visit</a>' +
						'<a href="#" onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger">Delete</a>' +
						'</div>';	
		}			
}

function validateForm(site_name,site_url) {
	if(!site_name || !site_url){
		alert('Please fill in the form');
		return false;
	}

	// What is the best regular expression to check if a string is a valid URL? 
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!site_url.match(regex)) {
 		alert("Please use a valid url");
 		return false;
	} 
	return true;
}