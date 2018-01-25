//global scope
var registerChange

//we push the letter of the select that is being used in this array
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

    //split the string into rows
    function parseString(string){
        mainObject = string.split("\n")
        return mainObject
    }
    
    var array = parseString(data)

    //return the types of elements for each row
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

    //put into each select its correspoding values
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
    
    //place the initial Values in selects
    putValuesInSelects(array);

    function updateSelects(filtered, currentValues){
        
        var currentIndex = {
            0: document.getElementById('a-select').selectedIndex,
            1: document.getElementById('b-select').selectedIndex,
            2: document.getElementById('c-select').selectedIndex,
        }

        var selects = document.getElementsByClassName("select-type");

        console.log('current index is', currentIndex);

       
        
        //get the types from the original array
        var typeA = getColumnTypes(array, 0)
        var typeB = getColumnTypes(array, 1)
        var typeC = getColumnTypes(array, 2)
        
        //get the types from the filtered array
        var filteredTypeA = getColumnTypes(filtered, 0)
        var filteredTypeB = getColumnTypes(filtered, 1)
        var filteredTypeC = getColumnTypes(filtered, 2)
        
        //console.log('typeA is ', typeA);
        //console.log('filtered', filtered);
        //console.log('filteredTypeA is ', filteredTypeA);
        
        
        var selectA = document.getElementById('a-select')
        var selectB = document.getElementById('b-select')
        var selectC = document.getElementById('c-select')
        
        var innerHtmlA = '<option value="0">Toate</option>';
        var innerHtmlB = '<option value="0">Toate</option>';
        var innerHtmlC = '<option value="0">Toate</option>';
        
        if(selectOrder[0] == 'a'){
            typeA.forEach(function(item){
                innerHtmlA += '<option value="'+item+'">'+ item + '</option>';
            })  
        } else {
            innerHtmlA = '<option value="0" class="">Toate</option>';
           
            typeA.forEach(function(item){
                var shouldBeVisible = filteredTypeA.indexOf(item) > -1;
                var className = "";
                if(shouldBeVisible){
                    className = "db"
                } else {
                    className = "dn"
                }
                innerHtmlA += '<option value="'+item+'" class="' + className +'">'+ item + '</option>';
            }) 
        }
        
        if(selectOrder[0] == 'b'){
            
             typeB.forEach(function(item){
                innerHtmlB += '<option value="'+item+'">'+ item + '</option>';
            })  
             
        } else if(selectOrder.indexOf('b') > -1 ){
                  
            console.log('b select is used');
            innerHtmlB = selectB.innerHTML;
                  
        }else {
            innerHtmlB = '<option value="0">Toate</option>';
            
            typeB.forEach(function(item){
                var shouldBeVisible = filteredTypeB.indexOf(item) > -1;
                var className = "";
                if(shouldBeVisible){
                    className = "db"
                } else {
                    className = "dn"
                }
                
                innerHtmlB += '<option value="'+item+'" class="' + className +'">'+ item + '</option>';
            });
        }
        
        if(selectOrder[0] == 'c'){
            typeC.forEach(function(item){
                innerHtmlC += '<option value="'+item+'">'+ item + '</option>';
            })  
        } else if (selectOrder.indexOf('c') > -1){
            
            innerHtmlC = selectC.innerHTML;
            
            } else {
            innerHtmlC = '<option value="0">Toate</option>';
            filteredTypeC.forEach(function(item){
                innerHtmlC += '<option value="'+item+'">'+ item + '</option>';
            }) 
        }
        
        selectA.innerHTML = innerHtmlA;
        selectB.innerHTML = innerHtmlB;
        selectC.innerHTML = innerHtmlC;
        
        
        for(var x = 0; x < selects.length; x++){
            selects[x].selectedIndex = currentIndex[x];
        }
        
    }
    
    //puts the values from the given array into the table
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

    //registers the inputs after a change and calls the required function in order to update data
    registerChange = function(x){
        var input = {
            'a': document.getElementById('a-select').value,
            'b': document.getElementById('b-select').value,
            'c': document.getElementById('c-select').value,
        }
        

        var filtered = filterData(array, input)
        putValuesInTable(filtered);
        
        //keep track of the select's order
        selectOrder.push(x)
        console.log('select order is', selectOrder)
        
        //putValuesInSelects(filtered)
        updateSelects(filtered, input);
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

       
        return filtered;

    }

}





