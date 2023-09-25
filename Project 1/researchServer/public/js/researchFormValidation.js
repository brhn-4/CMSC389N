
//CALL FUNC ON SUBMIT
window.onsubmit = validateForm;

function validateForm(){
   
    var invalidMessage = '';

    //PHONE NUMBER
    var p1 = document.getElementById('phoneFirstPart').value;
    var p2 = document.getElementById('phoneSecondPart').value;
    var p3 = document.getElementById('phoneThirdPart').value;
    

    //CONDITION
    var HBP = document.getElementById('highBloodPressure').checked;
    var diabetes = document.getElementById('diabetes').checked;
    var glaucoma = document.getElementById('glaucoma').checked;
    var asthma = document.getElementById('asthma').checked;
    var none = document.getElementById('none').checked;
    //PERIOD
    var flag =  false;
    var ele = document.getElementsByName('period');

    //ID
    var id1 = document.getElementById('firstFourDigits').value;
    var id2 = document.getElementById('secondFourDigits').value;
  
    //CLEAN PHONE NUMBER
    if (phone(p1,p2,p3)){
        invalidMessage += 'Invalid phone number \n';
    } 

    //CLEAN CONDITIONS
    if((HBP==false && diabetes==false && glaucoma==false && asthma==false && none==false)){       
        invalidMessage += 'No conditions selected\n';
    }

    if (none){
        if(HBP || diabetes || glaucoma ||asthma){     
            invalidMessage += 'Invalid conditions selection\n';
        }
    }

    //CLEAN PERIOD
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked){
            flag = true;
        }
    }

    if(flag == false){
        invalidMessage += 'No time period selected\n'
    }

    //CLEAN IDS
    if(idCheck(id1,id2)){
        invalidMessage+= 'Invalid study id\n';
    }

    //DISPLAY ERRORS OTHERWISE PROMPT USER
    if(invalidMessage != ''){
        alert(invalidMessage);
        return false;
    }else{
        if (window.confirm('Do you want to submit the form data?')){
            return true;
        }else return false;
    }
}


function phone(p1,p2,p3){
    //alert(`${p1}\n${p2}\n${p3}\n`)
    if (String(parseInt(p1)) != p1 || (String(parseInt(p1)).length != 3)) {
        return true
    }
    if (String(parseInt(p2)) != p2 || (String(parseInt(p2)).length != 3)) {
        return true
    }
    if (String(parseInt(p3)) != p3 || (String(parseInt(p3)).length != 4)) {
        return true
    }
    return false;
}

function idCheck(id1,id2){
    if (id1.charAt(0) != 'A' || id2.charAt(0)!='B'){
        return true;
    }
    if(String(parseInt(id1.slice(1,4))) != id1.slice(1,4)){
        return true;
    }
    if(String(parseInt(id2.slice(1,4))) != id2.slice(1,4)){
        return true;
    }
    return false;
}




