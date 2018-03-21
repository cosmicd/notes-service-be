const config =require("./config-cosmicd.js");

module.exports= ()=>{
  return{
  ...config // see config-template.js 
  }
}