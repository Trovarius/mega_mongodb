db.resultados2.find({})
// formting Date
db.resultados2.find().forEach(function(doc){
    if(doc["Data Sorteio"] != "")
    {
        doc.Data = new ISODate(doc["Data Sorteio"].split('/').reverse().join("-"));
        db.resultados2.save(doc);
    } else
    {
        doc.Data =null;
        db.resultados2.save(doc);
        }
    })


db.resultados2.aggregate([{$match: { Data: {$ne: null}}},
{$project: {
        _id: "$Concurso",
        data: "$Data",
        dezenas: ["$1_Dezena","$2_Dezena","$3_Dezena", "$4_Dezena", "$5_Dezena", "$6_Dezena"],
        qtd_ganhadores: {sena: '$Ganhadores_Sena', quina: '$Ganhadores_Quina', quadra: '$Ganhadores_Quadra'}
    }
},
{$sort: {data: 1}},
{$out: "clean_data"}
])

