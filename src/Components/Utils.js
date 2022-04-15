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

  export async function post (url, customer) {
    try  {
        const data = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(customer),
          })
        const res = await data.json();
        return res;
    }
    catch(er){
           console.log(er)
    }
  };