

export default async function getSimulatorBack(aporteInicial,aporteMensal, taxaAA, prazoMeses,email) {
    const data = { 
        aporteInicial,
        aporteMensal,
        taxaAA,
        prazoMeses,
        email
    };

    const url = 'http://localhost:3000/teste';
    // const options = {
    //   method: 'POST',
    //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
    //   data: qs.stringify(data),
    //   url,
    // };
    const response = await fetch(url,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
    console.log(response);
  };