db.clean_data.find()

//dezenas que mais sairam
db.clean_data.aggregate([
    {$unwind: "$dezenas"},
    {$sort: {data: 1}},
    {$group: {_id: "$dezenas", count: {$sum: 1}}}
])

//dezenas que mais sairam por mes    
db.clean_data.aggregate([
    {$unwind: "$dezenas"},
    {$sort: {data: 1}},
    {$group: {_id: {dezena: "$dezenas", month: {$month: "$data"}}, count: {$sum: 1}}},
    {$sort: {count: -1}},
])

//armazendando resultado em variavel 
var count = db.clean_data.count();
print(count);

//





