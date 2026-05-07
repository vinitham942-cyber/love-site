app.delete('/api/admin/messages/:id',auth,(req,res)=>{
  let msgs=read('data/messages.json');
  msgs=msgs.filter(m=>String(m.id)!==req.params.id);
  write('data/messageconst express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const USER_PIN = '85191619';
const ADMIN_PIN = '19161916';
const ADMIN_SESSION = 'love-admin-session';

function read(file){
  try{return JSON.parse(fs.readFileSync(path.join(__dirname,file),'utf8'));}
  catch{return [];}
}
function write(file,data){
  fs.writeFileSync(path.join(__dirname,file),JSON.stringify(data,null,2));
}

app.post('/api/auth',(req,res)=>{
  const {pin}=req.body;
  if(pin===USER_PIN) return res.json({role:'user'});
  if(pin===ADMIN_PIN) return res.json({role:'admin',session:ADMIN_SESSION});
  res.json({role:null});
});

app.post('/api/message',(req,res)=>{
  const msgs=read('data/messages.json');
  msgs.unshift({id:Date.now(),...req.body,created_at:new Date()});
  write('data/messages.json',msgs);
  res.json({ok:true});
});

app.get('/api/message',(req,res)=>{
  const msgs=read('data/messages.json');
  res.json(msgs[0]||{});
});

app.post('/api/quiz',(req,res)=>{
  const q=read('data/quiz.json');
  q.unshift({...req.body,created_at:new Date()});
  write('data/quiz.json',q);
  res.json({ok:true});
});

app.post('/api/track',(req,res)=>{
  const v=read('data/visits.json');
  v.unshift({...req.body,created_at:new Date()});
  write('data/visits.json',v);
  res.json({ok:true});
});

function auth(req,res,next){
  if(req.headers['x-session']!==ADMIN_SESSION) return res.json({error:'unauthorized'});
  next();
}

app.get('/api/admin/messages',auth,(req,res)=>res.json(read('data/messages.json')));
app.get('/api/admin/quiz-scores',auth,(req,res)=>res.json(read('data/quiz.json')));
app.get('/api/admin/stats',auth,(req,res)=>{
  const messages=read('data/messages.json');
  const quiz=read('data/quiz.json');
  const visits=read('data/visits.json');

  const avgScore = quiz.length ? Math.round(quiz.reduce((a,b)=>a+(b.score/b.total*100),0)/quiz.length) : 0;

  res.json({
    totalMessages: messages.length,
    totalVisits: visits.length,
    quizAttempts: quiz.length,
    avgScore
  });
});

s.json',msgs);
  res.json({ok:true});
});

app.listen(PORT,()=>console.log('running on '+PORT));