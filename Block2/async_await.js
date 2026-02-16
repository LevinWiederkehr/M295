async function simuliereVerzögerung(ms) {
 return new Promise(resolve => setTimeout(resolve, ms)); 
}

async function addiereNachVerzögerung(a, b, ms) {
    await simuliereVerzögerung(ms);
    return a + b;
}

addiereNachVerzögerung(3, 7, 2000).then(addierteZahl => {
  console.log(addierteZahl); 
});
addiereNachVerzögerung(10, 20, 3000).then(addierteZahl => {
  console.log(addierteZahl); 
});
