db.clean_data.find()
db.clean_data.aggregate([
    {$unwind: "$dezenas"}])

//ganhadores de por numero
db.clean_data.aggregate([
    {$unwind: "$dezenas"},
    {$group:{_id: "$dezenas", ganhadores_sena:{$sum: "$qtd_ganhadores.sena"}}},
    {$sort: {ganhadores_sena: -1}}
])

db.clean_data.aggregate([
    {$unwind: "$dezenas"},
    {$project: {dezena: 1, mes : { $month: "$data"}}}
])

//ganhadores de por numero e mes
db.clean_data.aggregate([
    {$unwind: "$dezenas"},
    {$group:{_id: {dezena: "$dezenas", mes: { $month: "$data"}}, ganhadores_sena:{$sum: "$qtd_ganhadores.sena"}}},
    {$sort: {ganhadores_sena: -1}}
])

//numero por mes
var numero = 60;
var mes = 4;

db.clean_data.aggregate([
    {$match: {"dezenas": numero}},
    {$unwind: "$dezenas"},
    {$match: {"dezenas": {$ne: numero}}},
    {$group: {_id: {dezena: "$dezenas", mes: { $month: "$data"}}, quantidade:{$sum: 1}}},
    {$match: {"_id.mes": mes}},
    {$sort:  {quantidade: -1}}
])

//percentual por range
var numero = 10;
var mes = 4;
    
db.clean_data.aggregate([
    {$match: {"dezenas": numero}},
    {$unwind: "$dezenas"},
    {$project:{"dezenas": 1, mes: {$month: "$data"}, distancia: {$size: {$range:[0, "$dezenas", 2]}} }},
    {$match: {$and:[{"dezenas": {$ne: numero}}, {"mes": mes}]}},
    {$group: {_id: {distancia: "$distancia"}, quantidade:{$sum: 1}}},
    {$sort: {quantidade: -1}},
    {$project: {range: {$subtract: [ {$multiply: ["$_id.distancia", 2]}, 2]}, quantidade: 1}}
])
    
db.createCollection("produtos")
    
    db.produtos.insert({"nome": "OAB", coberturas: [{"nome": "chocolate"}]})
    db.produtos.find()
    
    


