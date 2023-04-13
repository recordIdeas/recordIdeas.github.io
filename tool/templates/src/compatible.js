/*readAsBinaryString*/
if(typeof(FileReader.prototype.readAsBinaryString) !== "function") {
  FileReader.prototype.readAsBinaryString = function(fileData) {
    var binary = "";
    var pt = this;
    var reader = new FileReader();
    reader.onload = function() {
      var bytes = new Uint8Array(reader.result);
      for(var i=0; i<bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      var obj = {};
      obj.target = {result: binary};
      pt.onload(obj);
    }
    reader.readAsArrayBuffer(fileData);
  }
}


/*forEach*/
Array.prototype.forEach = Array.prototype.forEach || function (callback) {
  var isArray = Object.prototype.toString.call(this) == '[object Array]';
  if(isArray){
      for(var key in this){
          if(key != 'forEach'){
              callback.call(this[key],key,this[key],this);
          }
      }
  }else{
      throw TypeError;
  }
};

NodeList.prototype.forEach = NodeList.prototype.forEach || Array.prototype.forEach;


/*includes*/
String.prototype.includes = String.prototype.includes || function(search, start) {
  'use strict';
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > this.length) {
    return false;
  } else {
    return this.indexOf(search, start) !== -1;
  }
};

Array.prototype.includes = Array.prototype.includes || String.prototype.includes;


/*find*/
Array.prototype.find = Array.prototype.find || function(predicate) {
  'use strict';
  if (this == null) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate must be a function');
  }
  var list = Object(this);
  var length = list.length >>> 0;
  var thisArg = arguments[1];
  var value;

  for (var i = 0; i < length; i++) {
    value = list[i];
    if (predicate.call(thisArg, value, i, list)) {
      return value;
    }
  }
  return undefined;
};


/*startsWith*/
String.prototype.startsWith = String.prototype.startsWith || function(search, pos) {
  pos = !pos || pos < 0 ? 0 : +pos;
  return this.substring(pos, pos + search.length) === search;
};


/*endsWith*/
String.prototype.endsWith = String.prototype.endsWith || function(search, this_len) {
  if (this_len === undefined || this_len > this.length) {
      this_len = this.length;
  }
  return this.substring(this_len - search.length, this_len) === search;
};

(function (arr) {
arr.forEach(function (item) {
  if (item.hasOwnProperty('append')) {
    return;
  }
  Object.defineProperty(item, 'append', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function append() {
      var argArr = Array.prototype.slice.call(arguments),
        docFrag = document.createDocumentFragment();

      argArr.forEach(function (argItem) {
        var isNode = argItem instanceof Node;
        docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
      });

      this.appendChild(docFrag);
    }
  });
});
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);
