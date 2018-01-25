var registerChange

var selectOrder = []

window.onload = function(){
    var data = "A1,B1,C1" + "\n" 
    + "A1,B1,C2" + "\n" 
    + "A1,B1,C3" + "\n"
    + "A1,B2,C4" + "\n" 
    + "A1,B2,C5" + "\n" 
    + "A1,B3,C6" + "\n" 
    + "A2,B4,C7" + "\n" 
    + "A2,B5,C8" + "\n" 
    + "A2,B5,C9" + "\n" 
    + "A3,B6,C10";


    function parseString(string){
        mainObject = string.split("\n")
        return mainObject
    }

    var array = parseString(data)

    function getColumnTypes(obj, columnNr){
        var elements = []

        obj.forEach(function(item){
             row = item.split(",");
            columnEl = row[columnNr]

            if (elements.length == 0){
                elements.push(columnEl)
            }

            function itExists(){
                var val = false

                elements.forEach(function(el){
                    if(el == columnEl){
                        val = true
                        return
                    }
                })

                return val
            }

            if(!itExists()){
                elements.push(columnEl)
            }
        })
        return elements;
    };

    function putValuesInSelects(array){
        var typeA = getColumnTypes(array, 0)
        var typeB = getColumnTypes(array, 1)
        var typeC = getColumnTypes(array, 2)

        var selectA = document.getElementById('a-select')
        var innerHtmlA = '<option value="0">Toate</option>';

        typeA.forEach(function(item){
            innerHtmlA += '<option value="'+item+'">'+ item + '</option>';

        })

        selectA.innerHTML = innerHtmlA;

        var selectB = document.getElementById('b-select')
         var innerHtmlB = '<option value="0">Toate</option>';

        typeB.forEach(function(item){
            innerHtmlB += '<option value="'+item+'">'+ item + '</option>';

        })

        selectB.innerHTML = innerHtmlB;

        var selectC = document.getElementById('c-select')
         var innerHtmlC = '<option value="0">Toate</option>';

        typeC.forEach(function(item){
            innerHtmlC += '<option value="'+item+'">'+ item + '</option>';

        })

        selectC.innerHTML = innerHtmlC;
    }

    function updateSelects(filtered, currentValues){


        var currentIndex = {

        }

        console.log('current values are', currentValues)

        var selects = document.getElementsByClassName("select-type");
        
        for(var i= 0; i < selects.length; i++){
           var select = selects[i]
           console.log(select)
            for(j = 0; j < select.length ; j++){
                console.log(select[j].value)
                if(select[j].value == currentValues[i]){
                    console.log('matches, values is ', currentValues[i])
                    currentIndex[i] = j
                }
            }

        }

        console.log('current index is', currentIndex);
        //putValuesInSelects(array);

        for(var x = 0; x < selects.length; x++){
            selects[x].selectedIndex = currentIndex[x]
        }
        
        var typeA = getColumnTypes(array, 0)
        var typeB = getColumnTypes(array, 1)
        var typeC = getColumnTypes(array, 2)
        console.log(typeA)
        
        
    }

    //place the initial Values in selects
    putValuesInSelects(array);

    function putValuesInTable(elements){

        var table = document.getElementById('table-data');

        var innerHtml = '';

        elements.forEach(function(element){
            row = element.split(",")
           innerHtml += '<tr><td>' + row[0] +'</td><td>'+row[1]+'</td><td>'+row[2]+'</td></tr>' ;
        });

        table.innerHTML = innerHtml

    }

    putValuesInTable(array);

    registerChange = function(x){
        var input = {
            'a': document.getElementById('a-select').value,
            'b': document.getElementById('b-select').value,
            'c': document.getElementById('c-select').value,
        }
        

        var filtered = filterData(array, input)
        putValuesInTable(filtered);
        
        selectOrder.push(x)
        console.log('select order is', selectOrder)
        
        //putValuesInSelects(filtered)
        //updateSelects(array, input);
    }

    function filterData(arr, input){
        var filtered = arr

        for(var key in input){
            var keyOrder
            if(key == 'a'){
                keyOrder = 0
            } else if (key =='b'){
                keyOrder = 1
            } else if (key == 'c'){
                keyOrder = 2
            }


            if(input[key] != 0){
                filtered = filtered.filter(function(element){
                    var row = element.split(",");
                    if(row[keyOrder] == input[key]){
                        return element
                    }
                })
            }
        }

        console.log('filtered data is', filtered)
        return filtered;

    }

}





