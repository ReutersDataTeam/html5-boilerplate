this["App"] = this["App"] || {};
this["App"]["Views"] = this["App"]["Views"] || {};

this["App"]["Views"]["sample"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<p>This is a sample template that outputs the variable x: '+
( x )+
'</p>';
}
return __p;
};