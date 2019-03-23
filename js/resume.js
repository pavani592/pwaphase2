var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query){
  param=query[i].split("=");
  paramValue=parseInt(param[1]);
}
var request;
var idb=window.indexedDB ||window.mozIndexedDB ||window.msIndexedDB || window.webkitIndexedDB;
var open=idb.open("StoreData",1);
console.log("indexedDB is Created")
open.onupgradeneeded=function(event)
{
  var request=event.target.result;
  var storeDB=request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function(error){
  console.log("object store is not created,"+error);

}
open.onsuccess=function(event){
  request=event.target.result;
  var transaction=request.transaction("Formdata","readwrite");
var storeDB=transaction.objectStore("Formdata");
var info=storeDB.get(paramValue);
info.onsuccess=function(data){
console.log(data.target.result);
display(data.target.result);
skills(data.target.result)
}
}
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data)
{
var img=document.createElement("img") ;
img.src="images/girl.svg";
left.append(img);
var h3=document.createElement("h2");
h3.textContent=data.name;
left.append(h3);
var e=document.createElement("h3");
e.textContent=data.email;
left.append(e);
var ro=document.createElement("h3");
ro.textContent=data.role;
left.append(ro);
var m=document.createElement("h3");
m.textContent=data.mobile;
left.append(m);
var h2=document.createElement('h2');
h2.textContent="Education Qualifications"
right.append(h2);
var hr=document.createElement('hr');
hr.textContent=data.line;
right.append(hr);

var table=document.createElement('table');
table.border="1";
let row='';
row +="<th>"+"college/school"+"</th>"+"<th>"+"degree"+"</th>"+"<th>"+"Branch"+"</th>"+"<th>"+"marks"+"</th>"
for (i in data.education)
{
row +="<tr>"+"<td>"+data.education[i].college+"</td>"+
"<td>"+data.education[i].degree+"</td>"+
"<td>"+data.education[i].branch +"</td>"+
"<td>"+data.education[i].marks +"</td>"+
"</tr>";
}

table.innerHTML=row;
right.append(table);
}
function skills(data){
  var sk=document.createElement('h2')
  sk.textContent="Technical skills";
  right.append(sk);
  var hr=document.createElement('hr');
  right.append(hr);
  var h2=document.createElement('h2');

h2.textContent=data.skills;
right.append(h2);
}
