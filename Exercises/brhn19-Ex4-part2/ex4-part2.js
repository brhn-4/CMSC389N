// =========================================
// DO NOT MODIFY This code block
const url =
  "http://api.nobelprize.org/v1/prize.json";

const winners = [];
console.log("Starting fetch");
fetch(url)
  .then(resp => resp.json())
  .then(data => winners.push(...data.prizes));
// =========================================

// The following line displays the winner data in console for you.
console.log(winners);

/*
Your task is to complete the functions described below according to the
description given in comments.
*/

/*
(1) Display the list of 2021 winners. 

Output: An array of strings where each contains the category and the winner
names in the following format:

<category> : <firstname 1> <surname 1> / <firstname 2> <surname 2> / ...

- The first letter of the category should be capitalized. 
- If surname does not exist, use just firstname.
- If there is no winner for a category, use 'Not Awarded' as the winner name.
- The output should be sorted by category in ascending order
*/
/* OH QUESTIONS
  1. print to screen
  2. styl in task 3
  

*/
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function winner2021() {
  task1 = winners.filter(winner => (winner.year === '2021'));
  task1 = task1.sort(function(w1,w2){ if(w1.category < w2.category) { return -1; } else{return 1;};}); 

  var ret = task1.map((elem,id,task1)=>{ 
    var str = '';
    var cat = capitalizeFirstLetter(elem.category)
    str = str + `${cat} :`;

    elem.laureates.forEach(w=>{
      if(w.surname){
        str = str + ` ${w.firstname} ${w.surname} /`;
      }
      else{
        str = str + ` ${w.firstname} /`;
      }   
    });

    str = str.slice(0,-1);
    return str;
  });
 
  
  convertToHTML(ret);
}

/*

(2) Display the list of all Nobel peace winners, sorted by year, in an ascending
order.

Output: An array of strings where each contains the year and the winner names in
the following format:

<year> : <firstname 1> <surname 1> / <firstname 2> <surname 2> / ...

- If surname does not exist, use just firstname.
- If there is no winner for a year, use 'Not Awarded' as the winner name part
- 'Not Awarded' must be displayed in bold
- 2021 winner(s) must be displayed in blue, bold font.
- The output should be sorted by award year in ascending order



*/
function peaceWinners() {

 
  task2 = winners.sort(function(w1,w2){return w1.year-w2.year})
  task2 = task2.filter(winner=>winner.category == 'peace')
  const ret = []
   
  task2.forEach(collection=>{

    var str = `${collection.year} :`;
    if(collection.laureates){
      collection.laureates.forEach(winner=>{
        if(collection.year == 2021){
          if(winner.surname){
            str = str + `<strong> ${winner.firstname} ${winner.surname}</strong> /`;}
          else{
            str = str + ` <strong>${winner.firstname}</strong> /`;
          }
        }
        else{
          if(winner.surname){
            str = str + ` ${winner.firstname} ${winner.surname} /`;}
          else{
            str = str + ` ${winner.firstname} /`;
          }
        }
 
      });
      str = str.slice(0,-1);
          ret.push(str);
    }
    else{
      str=str + '<b> Not Awarded</b>';
      ret.push(str);
    }     
  });
  convertToHTML(ret)
}

/*
(3) Display the total number of all Nobel Chemistry winners and also display the
counts of the years in which only one laureate was awarded, two laureates were
awarded, and three laureates were awarded. 

Output: Just an integer, followed by the 1-laureate, 2-laureate, and
3-laureate count)

For example, if only one laureates for 60 years, two laureates for 23 year, and
three laureates for 28 years, then, the output should be: 

190 (60, 23, 28)

- Consider a group as a winner.
- Display the output as underlined and 3 times bigger than the font of the body
  font size.
- Note that the prize was not awarded for some years. 
*/
function countChemistryWinners() {
  task3 = winners.filter(winner => (winner.category === 'chemistry'));
  task3 = task3.filter(winner => (winner.laureates));
  console.log(task3);
  
  var found = [];
  var total = 0;
  var one = 0;
  var two = 0;
  var three = 0;

  task3.forEach(year=>{
    var cnt = year.laureates.reduce((acc,elem)=> { 
      if(!(found.includes(elem.id))){
        found.push(elem.id);
        acc=acc+1
      }
      else{
        acc = acc +1;
      }
      return acc;
    },0);

    if(cnt == 1){    
      one = one +1;
    }
    if(cnt == 2){
      two = two +1;
    }
    if(cnt == 3){
      three = three+1
    }
    total = total + (cnt)
  });
  
  var ret = [`<p id = task3>${total} (${one}, ${two}, ${three})</p>`];
  convertToHTML(ret)
}

/* 
(4) Display the names of the winner(s) who won the prize 2 or more times

Output: An array of strings where each contains the winner name, category, and
year in the following format:

<firstname 1> <surname 1> (<category> <year>)

Note that same id is used in the data for each distinct laureate
*/
function multiTimeWinner() {
  var task4 = winners.filter(winner => winner.laureates);
  var found = new Map();
  var ret =[];

 
  task4.forEach(entry =>{
    str = ` (${entry.category}, ${entry.year})`;

    entry.laureates.forEach(ele =>{
      if(found.has(ele.id)){
        if(found.get(ele.id)[0]===3){
          if(ele.surname){
            ret.push(`${ele.firstname} ${ele.surname}` + str)
          }else{ 
            ret.push(`${ele.firstname}` + str)
          }
        }
        else if(found.get(ele.id)[0] === 1){
          var oldTag = found.get(ele.id)[1];
          found.set(ele.id,[3,str])

          if(ele.surname){
            ret.push(`${ele.firstname} ${ele.surname}` + oldTag)
            ret.push(`${ele.firstname} ${ele.surname}` + str)
            
          }else{
            ret.push(`${ele.firstname}` + oldTag)
            ret.push(`${ele.firstname}` + str)
          }
        }
        
      }else{
        found.set(ele.id,[1,str])
      } 
    })
  });
  convertToHTML(ret)
  
}

  /* 6. Sum up the number of times each political party held the presidency 

         const result6 = presidents.reduce((acc,pres) => {acc[pres.party] = acc[pres.party]? acc[pres.party]+1:1; return acc},{});
         */



// Utility function that takes an array of strings and converts into arrays into
// separate HTML list elements. (Hint: Use this to generate a series of list
// items from an array.)
function convertToHTML(query) {
  const results = query.map(e => `<li>${e}</li>`).join("");
  laureateList.innerHTML = results;
}



// A javascript reference to the unordered list with classname list. 
// (Hint: Use this!)
const laureateList = document.querySelector(".list");
