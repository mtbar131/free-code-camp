function spinalCase(str) { 

    return str.split(/\s|_|(?=[A-Z])/).join('-').replace(/--/g, '-').toLowerCase();
	
}