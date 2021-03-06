const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// test pour la champ Age
testNumber=(feild)=>{
  
  var n=feild.trim()
if(!n){
  return "age is required "
}
if(n<=0)
{
  return " The age must be positive "
}
if(n>100)
{
  return " The age must be less than  101 "
}
return ""
}

// test pour la champ date de naissance 
testDate=(feild)=>{
  var d=feild.trim()
  if(!d){
    return "DATE is required "
  }
  var now =Date.now();
  var dt=new Date(d);
  if(dt>now)
  {
    return " please entre a valid date " 
  }

    return ""

  }
// test pour la champ nom
  testText=(feild)=>{
  var t=feild.trim()
    if(!t) {return ""}
    if(!isNaN(t))
    {
      return "the name must not contain a number " 
    }
  
      return ""
  
    }

    //endPoint pour obtenir les données du fichier test.json
app.get('/testFile', (req, res) => {
 var contents=fs.readFileSync("../test.json");
 var jsonContent =JSON.parse(contents);
 res.json(jsonContent);
});


    //endPoint pour envoyer et tester la validiter de donner de formulaire 
app.post('/data', (req, res) => {
var {textfield1,numberfield1,datefield1} =req.body;
if(testNumber(numberfield1)){
  var err ={"Error":testNumber(numberfield1)}
  res.status(201).json(err);
  
}

if(testDate(datefield1)){
  var err ={"Error":testDate(datefield1)}
  res.status(201).json(err);
  
}
if(testText(textfield1)){
  var err ={"Error":testText(textfield1)}
  res.status(201).json(err);
  
}

res.send("ok");

});




app.listen(port, () => {console.log(`Listening on port ${port}`)

});