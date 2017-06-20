
module.exports = (function(){
/**
 *
 * function to escape JS
 * @input complete string to scape
 *
 */
 function escapeJavascript (input) {
 	var escape = ''

 	var i = 0

 	//for every word in the string iterate and try to escape the words
 	for (i = 0; i < input.length; i++) {
 		escape = escape + javascriptEscapeCode(input.charAt(i), false)
 	}

 	return escape
 }

/**
 *
 * Replace any especial char into a good string representation
 *
 * @original is the char to validate
 */
 function javascriptEscapeCode(original)
 {
 	var thecharchar=original.charAt(0);
 	switch(thecharchar) {
 		case '\r': return "\\r"; break;
			case '\n': return "\\n"; break; //newline
			case '\v': return "\\v"; break; 
			case '\'': return "\\'"; break;
			case '"': return "\\\""; break;
			case '\&': return "\\&"; break;
			case '\\': return "\\\\"; break;
			case '\t': return "\\t"; break;
			case '\b': return "\\b"; break;
			case '\f': return "\\f"; break;
			default:
			return original;
			break;
		}
	}

	/**
	 *
	 * Module publi properties
	 *
	 */
	return {
		escapeJavascript : function(input){
			return escapeJavascript(input);
		}
	}

})()