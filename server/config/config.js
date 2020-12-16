// =============== PUERTO ==================
process.env.PORT = process.env.PORT || 3000;

// =============== ENTORNO =================
process.env.NODE_ENV = process.env.NODE_ENV

// ============ BASE DE DATOS ==============
let urlDB
//if(process.env.NODE_ENV === 'dev'){
//    urlDB = 'mongodb://localhost:27017/cafe';
//} else{
    urlDB = 'mongodb+srv://fisi2020:fisi2020@basededatos3.pxwnm.gcp.mongodb.net/cafe?retryWrites=true&w=majority'
//}

process.env.URLDB = urlDB;