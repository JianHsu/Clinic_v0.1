$(document).ready(function(){
	$.get('/users/api/getlist', function(data, err){
		if (err)
			console.log(err);
		
		var table = $('#table');

		table.append(
			"<tr><td>ID</td>"+
				"<td>Name</td>"+
				"<td>CountryCode</td>"+
				"<td>District</td>"+
				"<td>Population</td></tr>"
			);
		

		$.each(data, function(index, item){                     
                     table.append(
                      "<tr><td>" + item.ID + "</td>" +
                          "<td>" + item.Name + "</td>" +
                          "<td>" + item.CountryCode + "</td>" +
                          "<td>" + item.District + "</td>"+
                          "<td>" + item.Population + "</td></tr>"
                     )
        });
                 
		
	});
})