fetch('https://website.innvikta.co.in/').then(r=>r.text()).then(t=>{
    const m=t.match(/src="\/_next\/image[^"]+"/g); 
    console.log(m ? m.slice(0, 3) : 'No matches');
});
