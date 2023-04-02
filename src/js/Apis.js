
const dataTurno = async (setFarma, setIsLoading) => {
    fetch('https://midas.minsal.cl/farmacia_v2/WS/getLocales.php')
      .then(response => response.json())
      .then(data => {
        setFarma(data);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  };
  
  export default dataTurno;