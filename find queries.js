db.resultados2.find({})
db.resultados2.find({}, {'Data Sorteio': 1, '1_Dezena': 1, '2_Dezena': 1})
db.resultados2.aggregate([{
    $project:{
         concurso: "$Concurso",
         data: "DAta Sorteio",
         dezenas: ["$1_Dezena", "$2_Dezena", "$3_Dezena", "$4_Dezena", "$5_Dezena", "$6_Dezena"],
         total:{$sum: ["$1_Dezena", "$2_Dezena", "$3_Dezena", "$4_Dezena", "$5_Dezena", "$6_Dezena"]}
        },

    }, 
    { $out: "resultados_total_por_concurso"}]
)
    

db.resultados_total_por_concurso.aggregate([{
        $group:{
            _id: "$total",
            count: {$sum: 1}
            }
    }, {$sort: {count: -1}}])


db.resultados_total_por_concurso.aggregate([{$unwind: "$dezenas"}])