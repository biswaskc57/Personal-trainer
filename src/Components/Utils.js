export async function get (url) {
   try  {
    const data = await fetch(url);
    const res = await data.json();
    return res;
   }
   catch(er){
       console.log(er)
   }
  };