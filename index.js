const cors = require("cors")
const express = require("express")
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({extended : true}))
const corsOptions = {
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200 
  };
  
  app.use(cors(corsOptions));
app.get("/",(req,res)=>{
    res.json({message : "Hello from ppt to pdf"})
})

app.post("/ppt2pdf", async (req, res) => {
    try {
      const { ppt } = req.body;
  
      const pdfBuffer = await libre.convertAsync(ppt, '.pdf', undefined);
  
      const pdfBase64 = pdfBuffer.toString('base64');
  
      res.status(200).json({
        pdf: pdfBase64,
        status: true,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        status: false,
      });
    }
  });
  


app.listen(8080, ()=>{
    console.log("Running Up The Hill At 8080 km/hr")
})