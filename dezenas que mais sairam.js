db.resultados_total_por_concurso.aggregate([{$unwind: "$dezenas"},{$skip: ""}
{$group:{
        _id: "$dezenas",
        quantidade: {$sum: 1},
    }
},
{$sort:{quantidade: -1}}
])

