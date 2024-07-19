
$(document).ready(function() {
    $(".includedHeader").load("header.html"); 
	const screenWidtht = window.screen.width;
    if(screenWidtht > 400){
        console.log("screenWidth > 400");
        $("#dummy-search-input-for-preact-render").show();
    } else {
        console.log("screenWidth < 400");
        $("#dummy-search-input-for-preact-render").hide();
    }
    $(window).scroll(function() {
        console.log(isDivVisible("search-header"));
        const screenWidth = window.screen.width;
       if (!isDivVisible("makeModelDivInner") && screenWidth > 946) {
            console.log('User has scrolled past the div');
            $("#makeModelDivInner").addClass("-fixed");
            $("#goBtn").addClass("goButton");        
        } else{
            console.log('User can see the div');
            $("#makeModelDivInner").removeClass("-fixed");
            $("#goBtn").removeClass("goButton");
        }   
        
        // Example usage
        console.log('Screen Width:', screenWidth);
    });
    
    
});

function isDivVisible(divId){
	try{		
	    var myDiv = $('#'+divId);
	    var rect = myDiv[0].getBoundingClientRect();
	    return rect.top < $(window).height() && rect.bottom >= 0;
	}  catch (ex) {}
	return false;
}
const divId = ['yearDiv', 'makeDiv', 'modelDiv'];
function showHideSearch(id){
    let cssClass = $("#"+id).attr('class');

    $.each(divId, function(index, value) {
        if (value === id) {
            return true; // Equivalent to 'continue' in jQuery each loop
        }
        $("#"+value).removeClass("-open");
        console.log(value);
    });
    if(cssClass.includes("-open")){
        $("#"+id).removeClass("-open");
    } else {
        $("#"+id).addClass("-open");
    }
}

function showVal(val, id){
    $("#"+id).html(val);
}

function fnValidateString(data){
	if(null === data || "null" === data || "" === data || "undefined" === data || undefined === data){
		return false;
	}else{
		return true;
	}
}

function fetchVin(){
        var vin =  $('#vinInput').val().trim();
		let year = fnValidateString($("#yearId").val())?$("#yearId").val():"!";
		let make = fnValidateString($("#makeId").val())?$("#makeId").val():"!";
		let model= fnValidateString($("#modelId").val())?$("#modelId").val():"!";
		let subModel= fnValidateString($("#subModelId").val())?$("#subModelId").val():"!";
        if (vin !== '') {
            var url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`;

            $.ajax({
                url: url,
                type: 'GET',
                async: false,
                success: function(response) {
                    console.log(response);
                    var data = response;
                    if (data.Results && data.Results.length > 0) {
			            make = data.Results.find(function(item) {return item.VariableId === 26;}).Value; // Example: Make
			            model = data.Results.find(function(item) {return item.VariableId === 28;}).Value; // Example: Model
			            year = data.Results.find(function(item) {return item.VariableId === 29;}).Value; // Example: Year
			
			            console.log('Make:', make);
			            console.log('Model:', model);
			            console.log('Year:', year);
			        } else {
			            console.error('No results found for the VIN:', vin);
			        }
                },
                error: function(xhr, status, error) {
                    console.log('Error:', status, error);
                    console.log('Error fetching VIN details. Please try again.');
                }
            });
        } else {
            console.log('Please enter a VIN.');
        }
	javascript:window.location.href='/shopping.html?make='+make+'&model='+model+'&year='+year+'&subModel='+subModel;
}

$(".after").click(function() {
    $(".after i").toggleClass("fa-chevron-up");
})

$(".after-garage").click(function() {
    $(".after-garage i").toggleClass("fa-chevron-up");
})
